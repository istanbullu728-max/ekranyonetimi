import React, { useState, useEffect, useMemo } from 'react';
import useStore from '../store/useStore';
import { Sparkles, Flame, Settings, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;
const SLIDE_DURATION = 8000; // 8 seconds

export default function CustomerDisplay() {
    const { products = [], categories = [], campaigns = [], showcaseImages = [] } = useStore();
    const [currentMenuPage, setCurrentMenuPage] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    // 1. Process Data for Pagination
    const paginatedMenu = useMemo(() => {
        const availableProducts = products.filter(p => p.available);
        const chunks = [];
        for (let i = 0; i < availableProducts.length; i += ITEMS_PER_PAGE) {
            chunks.push(availableProducts.slice(i, i + ITEMS_PER_PAGE));
        }
        return chunks;
    }, [products]);

    // 2. Menu Auto-Pagination & Progress Bar Logic
    useEffect(() => {
        if (paginatedMenu.length <= 1) {
            setProgress(0);
            return;
        }

        const intervalTime = 50; // Update every 50ms for smooth bar
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

    // 3. Showcase Carousel Logic (Independent)
    useEffect(() => {
        if (showcaseImages.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
        }, 5000); // Showcase can stay at 5s or match 8s
        return () => clearInterval(timer);
    }, [showcaseImages.length]);

    // 4. Active Campaign Logic
    const [activeCampaign, setActiveCampaign] = useState(null);
    useEffect(() => {
        const checkCampaigns = () => {
            const now = new Date();
            const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            const active = campaigns.find(c => c.active && c.startHour <= currentTimeStr && c.endHour >= currentTimeStr);
            setActiveCampaign(active || null);
        };
        checkCampaigns();
        const interval = setInterval(checkCampaigns, 60000);
        return () => clearInterval(interval);
    }, [campaigns]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(console.error);
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    };

    const currentPageItems = paginatedMenu[currentMenuPage] || [];

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#121212] text-white font-sans flex select-none">
            
            {/* Left Section (70%) - Paginated Menu */}
            <div className="w-[70%] h-full flex flex-col relative border-r border-white/5">
                
                {/* Header */}
                <div className="p-12 pb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-6xl font-black tracking-tighter text-white/90">GÜNÜN MENÜSÜ</h1>
                        <div className="h-1.5 w-24 bg-amber-500 mt-2 rounded-full"></div>
                    </div>
                    {activeCampaign && (
                        <div className="bg-amber-500 text-black px-8 py-3 rounded-full font-black text-lg uppercase tracking-wider animate-pulse transition-all">
                             %{activeCampaign.discountPercent} İNDİRİM: {activeCampaign.title}
                        </div>
                    )}
                </div>

                {/* Animated Product List */}
                <div className="flex-1 px-12 py-4 relative">
                    <div 
                        key={currentMenuPage} 
                        className="flex flex-col gap-6 animate-in fade-in duration-1000 slide-in-from-bottom-4"
                    >
                        {currentPageItems.map(product => {
                            const category = categories.find(c => c.id === product.categoryId);
                            let displayPrice = product.price;
                            const hasDiscount = activeCampaign && 
                                (!activeCampaign.targetCategory || activeCampaign.targetCategory === product.categoryId);
                            
                            if (hasDiscount) {
                                displayPrice = product.price * (1 - activeCampaign.discountPercent / 100);
                            }

                            return (
                                <div key={product.id} className="flex flex-col gap-1">
                                    <div className="flex items-end gap-4 group">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl font-bold tracking-tight text-white/90 uppercase">
                                                {product.name}
                                            </span>
                                            {product.isHot && <Flame size={20} className="text-red-500 fill-red-500" />}
                                            {product.isChefPick && <Sparkles size={20} className="text-amber-500 fill-amber-500" />}
                                        </div>
                                        
                                        {/* Dynamic Dots */}
                                        <div className="flex-1 border-b-2 border-dotted border-white/10 mb-2 min-w-[20px]"></div>
                                        
                                        <div className="flex items-center gap-3">
                                            {hasDiscount && (
                                                <span className="text-xl text-white/20 line-through font-medium">
                                                    {product.price.toFixed(0)}₺
                                                </span>
                                            )}
                                            <span className={`text-4xl font-black ${hasDiscount ? 'text-amber-500' : 'text-white'}`}>
                                                {displayPrice.toFixed(0)}
                                                <span className="text-xl ml-1 opacity-50 font-bold">₺</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pr-2">
                                        <span className="text-sm text-white/30 italic font-medium">
                                            {product.description || 'Hatay mutfağının seçkin lezzeti, taze malzemelerle.'}
                                        </span>
                                        {category && (
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/10 border border-white/5 px-2 py-0.5 rounded">
                                                {category.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Bar & Page Indicator */}
                <div className="h-2 w-full bg-white/5 relative">
                    <div 
                        className="h-full bg-amber-500 transition-all duration-75 ease-linear shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                    
                    {/* Page Numbers */}
                    {paginatedMenu.length > 1 && (
                        <div className="absolute -top-10 right-12 flex gap-4 text-white/20 font-black tracking-widest text-sm uppercase">
                            {paginatedMenu.map((_, idx) => (
                                <span key={idx} className={idx === currentMenuPage ? 'text-amber-500' : ''}>
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section (30%) - Showcase Carousel (Static/Unchanged logic but themed) */}
            <div className="w-[30%] h-full relative bg-[#0a0a0a]">
                {showcaseImages.map((img, idx) => (
                    <div
                        key={img.id}
                        className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
                        }`}
                    >
                        {img.url ? (
                            <img src={img.url} alt="Carousel" className="w-full h-full object-cover opacity-80" />
                        ) : (
                            <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center text-white/5 p-20 text-center">
                                <Sparkles size={80} className="mb-8" />
                                <span className="text-xl font-bold uppercase tracking-[0.4em]">HAZIRLANIYOR</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40"></div>
                        
                        <div className="absolute bottom-20 left-0 right-0 p-12 text-center animate-in slide-in-from-bottom-8 duration-1000">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-2xl leading-tight">
                                {idx === 0 ? 'Taze ve Sıcak' : idx === 1 ? 'Özel Soslu' : 'Geleneksel Lezzet'}
                            </h3>
                            <div className="w-12 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Admin/Settings Hidden Controls */}
            <div className="absolute bottom-6 right-6 z-50 opacity-0 hover:opacity-100 transition-opacity">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/40 hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all text-[10px] uppercase tracking-wider font-black"
                >
                    <Settings size={14} />
                    <span>Admin</span>
                </button>
                <button
                    onClick={toggleFullScreen}
                    className="ml-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/40 hover:text-white transition-all text-[10px] uppercase tracking-wider font-black"
                >
                    <Maximize2 size={14} />
                </button>
            </div>
        </div>
    );
}
