import React, { useState, useEffect, useMemo } from 'react';
import useStore from '../../store/useStore';
import { Sparkles, Flame, Check } from 'lucide-react';

const ITEMS_PER_PAGE = 8; // Slightly fewer for modal view
const SLIDE_DURATION = 8000;

export default function TVPreviewModal() {
    const { products = [], categories = [], campaigns = [], showcaseImages = [] } = useStore();
    const [currentMenuPage, setCurrentMenuPage] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);

    // 1. Pagination Logic
    const paginatedMenu = useMemo(() => {
        const availableProducts = products.filter(p => p.available);
        const chunks = [];
        for (let i = 0; i < availableProducts.length; i += ITEMS_PER_PAGE) {
            chunks.push(availableProducts.slice(i, i + ITEMS_PER_PAGE));
        }
        return chunks;
    }, [products]);

    // 2. Auto-Pagination Timer
    useEffect(() => {
        if (paginatedMenu.length <= 1) {
            setProgress(0);
            return;
        }
        const intervalTime = 50;
        const increment = (intervalTime / SLIDE_DURATION) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setCurrentMenuPage((p) => (p + 1) % paginatedMenu.length);
                    return 0;
                }
                return prev + increment;
            });
        }, intervalTime);
        return () => clearInterval(timer);
    }, [paginatedMenu.length]);

    // 3. Showcase Logic
    useEffect(() => {
        if (showcaseImages.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [showcaseImages.length]);

    // 4. Campaign Logic
    const [activeCampaign, setActiveCampaign] = useState(null);
    useEffect(() => {
        const checkCampaigns = () => {
            const now = new Date();
            const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            const active = campaigns.find(c => c.active && c.startHour <= currentTimeStr && c.endHour >= currentTimeStr);
            setActiveCampaign(active || null);
        };
        checkCampaigns();
    }, [campaigns]);

    const currentPageItems = paginatedMenu[currentMenuPage] || [];

    return (
        <div className="w-full h-full bg-[#FDFBF7] flex overflow-hidden rounded-2xl shadow-xl border border-slate-200 font-sans relative">
            
            {/* Left Section (70%) */}
            <div className="w-[70%] h-full flex flex-col relative border-r border-slate-200/50">
                
                {/* Header */}
                <div className="p-10 pb-4 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-transparent">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tighter">MENÜ PLAZMA</h2>
                            <div className="h-1 w-16 bg-amber-500 mt-2 rounded-full shadow-sm"></div>
                        </div>
                        {activeCampaign && (
                            <div className="bg-amber-500 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest animate-pulse">
                                %{activeCampaign.discountPercent} İNDİRİM GÜNÜ
                            </div>
                        )}
                    </div>
                </div>

                {/* List Container */}
                <div className="flex-1 p-10 py-6">
                    <div key={currentMenuPage} className="flex flex-col gap-4 animate-in fade-in duration-700 slide-in-from-bottom-2">
                        {currentPageItems.map(product => {
                            let displayPrice = product.price;
                            const hasDiscount = activeCampaign && (!activeCampaign.targetCategory || activeCampaign.targetCategory === product.categoryId);
                            if (hasDiscount) displayPrice = product.price * (1 - activeCampaign.discountPercent / 100);

                            return (
                                <div key={product.id} className="flex flex-col gap-0.5">
                                    <div className="flex items-end gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-black text-slate-800 uppercase truncate max-w-[300px]">{product.name}</span>
                                            {product.isHot && <Flame size={14} className="text-red-500 fill-red-500" />}
                                            {product.isChefPick && <Sparkles size={14} className="text-amber-500 fill-amber-500 shadow-sm" />}
                                        </div>
                                        <div className="flex-1 border-b border-dotted border-slate-200 mb-1.5 min-w-[10px]"></div>
                                        <div className="flex items-center gap-2">
                                            {hasDiscount && <span className="text-xs text-slate-300 line-through font-bold">{product.price.toFixed(0)}₺</span>}
                                            <span className={`text-2xl font-black ${hasDiscount ? 'text-amber-500' : 'text-slate-900'}`}>
                                                {displayPrice.toFixed(0)}
                                                <span className="text-sm ml-0.5 text-slate-400 font-bold">₺</span>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 italic font-bold leading-tight">
                                        {product.description || 'Hatay mutfağından benzersiz bir lezzet deneyimi.'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-slate-100 relative shadow-inner">
                    <div 
                        className="h-full bg-amber-500 transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Right Section (30%) */}
            <div className="w-[30%] h-full relative bg-slate-50">
                {showcaseImages.map((img, idx) => (
                    <div
                        key={img.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        {img.url ? (
                            <img src={img.url} alt="Showcase" className="w-full h-full object-cover opacity-80" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-200">
                                <Sparkles size={40} />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/10"></div>
                        <div className="absolute bottom-8 left-0 right-0 p-6 text-center">
                            <h3 className="text-xl font-black text-slate-800 italic tracking-tighter drop-shadow-sm uppercase">
                                {idx === 0 ? 'Taze ve Sıcak' : idx === 1 ? 'Özel Soslu' : 'Geleneksel Lezzet'}
                            </h3>
                        </div>
                    </div>
                ))}
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                    {showcaseImages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'w-2 bg-slate-200'}`}
                        ></div>
                    ))}
                </div>
            </div>

            <style>{`
                .custom-scrollbar-light::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar-light::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar-light::-webkit-scrollbar-thumb {
                    background: #d4a37333;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
