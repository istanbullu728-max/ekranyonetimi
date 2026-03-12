import React, { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import { Sparkles, Flame, Check } from 'lucide-react';

export default function TVPreviewModal() {
    const { products, categories, campaigns, showcaseImages } = useStore();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Carousel logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [showcaseImages.length]);

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    const activeCampaign = campaigns.find(c => {
        if (!c.active) return false;
        return c.startHour <= currentTimeStr && c.endHour >= currentTimeStr;
    });

    return (
        <div className="w-full h-full bg-[#fdfbf7] flex font-serif relative overflow-hidden select-none">
            {/* Left Section (70%) - Menu */}
            <div className="w-[70%] h-full flex flex-col border-r-2 border-amber-900/5 relative">
                
                {/* Header */}
                <div className="p-12 pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-6xl font-black text-amber-950 tracking-tighter mb-2">MENÜ</h1>
                        <div className="h-1 w-20 bg-amber-600 rounded-full"></div>
                    </div>
                    {activeCampaign && (
                        <div className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest animate-pulse shadow-xl">
                             İndirim: {activeCampaign.title}
                        </div>
                    )}
                </div>

                {/* Menu List */}
                <div className="flex-1 overflow-y-auto px-12 py-4 custom-scrollbar-light">
                    <div className="grid grid-cols-1 gap-12">
                        {categories.map(category => {
                            const catProducts = products.filter(p => p.categoryId === category.id && p.available);
                            if (catProducts.length === 0) return null;

                            return (
                                <div key={category.id} className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-xl font-black text-amber-900/40 uppercase tracking-[0.3em]">{category.name}</h2>
                                        <div className="h-px flex-1 bg-amber-900/10"></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6">
                                        {catProducts.map(product => {
                                            let displayPrice = product.price;
                                            const hasDiscount = activeCampaign && 
                                                (!activeCampaign.targetCategory || activeCampaign.targetCategory === product.categoryId);
                                            
                                            if (hasDiscount) {
                                                displayPrice = product.price * (1 - activeCampaign.discountPercent / 100);
                                            }

                                            return (
                                                <div key={product.id} className="flex justify-between items-baseline group animate-in fade-in slide-in-from-left-4 duration-500">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-2xl font-black text-amber-950">{product.name}</span>
                                                            {product.isHot && <Flame size={18} className="text-red-600 fill-red-600" />}
                                                            {product.isChefPick && <Sparkles size={18} className="text-amber-500 fill-amber-500" />}
                                                        </div>
                                                        <span className="text-xs text-amber-800/40 italic font-medium leading-none mt-2">
                                                            {product.description || 'Geleneksel Hatay lezzeti.'}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 border-b-2 border-dotted border-amber-900/10 mx-6 mb-1"></div>
                                                    <div className="flex flex-col items-end">
                                                        <span className={`text-3xl font-black ${hasDiscount ? 'text-red-700' : 'text-amber-950'}`}>
                                                            {displayPrice.toFixed(0)} <span className="text-sm font-bold">₺</span>
                                                        </span>
                                                        {hasDiscount && (
                                                            <span className="text-[10px] text-amber-900/40 line-through font-bold">
                                                                {product.price.toFixed(0)} ₺
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Labels */}
                <div className="p-8 border-t border-amber-900/5 flex justify-center gap-8 opacity-40">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900">
                        <Check size={12} /> Hijyenik Mutfak
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900">
                        <Check size={12} /> %100 Dana Et
                    </div>
                </div>
            </div>

            {/* Right Section (30%) - Carousel */}
            <div className="w-[30%] h-full relative bg-[#0d0d0d]">
                {showcaseImages.map((img, idx) => (
                    <div
                        key={img.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
                        }`}
                    >
                        {img.url ? (
                            <img src={img.url} alt="Carousel" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center text-white/10 p-10 text-center">
                                <Sparkles size={48} className="mb-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">Lezzet Yolculuğu Yakında</span>
                            </div>
                        )}
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                        
                        {/* Slide Caption */}
                        <div className="absolute bottom-12 left-0 right-0 p-8 text-center animate-in slide-in-from-bottom-4 duration-700">
                            <h3 className="text-2xl font-black text-white italic tracking-tighter drop-shadow-lg">
                                {idx === 0 ? 'Taze ve Sıcak' : idx === 1 ? 'Özel Soslu' : 'Geleneksel Lezzet'}
                            </h3>
                        </div>
                    </div>
                ))}

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                    {showcaseImages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'w-2 bg-white/20'}`}
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

const Check = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);
