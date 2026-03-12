import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { Sparkles, Flame, Settings, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDisplay() {
    const { products = [], categories = [], campaigns = [], showcaseImages = [] } = useStore();
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    // Carousel logic
    useEffect(() => {
        if (showcaseImages.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [showcaseImages.length]);

    // Active Campaign logic
    const [activeCampaign, setActiveCampaign] = useState(null);
    useEffect(() => {
        const checkCampaigns = () => {
            const now = new Date();
            const currentHour = now.getHours().toString().padStart(2, '0');
            const currentMinute = now.getMinutes().toString().padStart(2, '0');
            const currentTimeStr = `${currentHour}:${currentMinute}`;
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

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#fdfbf7] text-amber-950 font-serif flex select-none">
            
            {/* Left Section (70%) - Menu */}
            <div className="w-[70%] h-full flex flex-col border-r-4 border-amber-900/5 relative">
                
                {/* Header */}
                <div className="p-16 pb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-8xl font-black text-amber-950 tracking-tighter mb-4">MENÜ</h1>
                        <div className="h-2 w-32 bg-amber-600 rounded-full"></div>
                    </div>
                    {activeCampaign && (
                        <div className="bg-red-600 text-white px-10 py-4 rounded-full font-black text-xl uppercase tracking-widest animate-pulse shadow-2xl flex items-center gap-4">
                             <Sparkles size={24} /> %{activeCampaign.discountPercent} İNDİRİM: {activeCampaign.title}
                        </div>
                    )}
                </div>

                {/* Menu List */}
                <div className="flex-1 overflow-y-auto px-16 py-4 custom-scrollbar-light">
                    <div className="grid grid-cols-1 gap-16 pb-12">
                        {categories.map(category => {
                            const catProducts = products.filter(p => p.categoryId === category.id && p.available);
                            if (catProducts.length === 0) return null;

                            return (
                                <div key={category.id} className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <h2 className="text-3xl font-black text-amber-900/40 uppercase tracking-[0.4em]">{category.name}</h2>
                                        <div className="h-px flex-1 bg-amber-900/20"></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-8">
                                        {catProducts.map(product => {
                                            let displayPrice = product.price;
                                            const hasDiscount = activeCampaign && 
                                                (!activeCampaign.targetCategory || activeCampaign.targetCategory === product.categoryId);
                                            
                                            if (hasDiscount) {
                                                displayPrice = product.price * (1 - activeCampaign.discountPercent / 100);
                                            }

                                            return (
                                                <div key={product.id} className="flex justify-between items-baseline group animate-in fade-in slide-in-from-left-8 duration-700">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-4xl font-black text-amber-950 tracking-tight">{product.name}</span>
                                                            {product.isHot && <Flame size={24} className="text-red-600 fill-red-600" />}
                                                            {product.isChefPick && <Sparkles size={24} className="text-amber-500 fill-amber-500" />}
                                                        </div>
                                                        <span className="text-lg text-amber-800/50 italic font-medium leading-relaxed mt-2 max-w-2xl">
                                                            {product.description || 'Hatay mutfağının seçkin lezzeti, taze malzemelerle.'}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 border-b-4 border-dotted border-amber-900/10 mx-10 mb-2"></div>
                                                    <div className="flex flex-col items-end">
                                                        <span className={`text-5xl font-black ${hasDiscount ? 'text-red-700' : 'text-amber-950'}`}>
                                                            {displayPrice.toFixed(0)} <span className="text-xl font-bold">₺</span>
                                                        </span>
                                                        {hasDiscount && (
                                                            <span className="text-lg text-amber-900/40 line-through font-bold">
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

                {/* Footer Info */}
                <div className="p-10 border-t-2 border-amber-900/5 flex justify-center gap-16 opacity-30">
                    <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-amber-900">
                        <Check size={20} /> Hijyenik Mutfak Kaideleri
                    </div>
                    <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-amber-900">
                        <Check size={20} /> %100 Yerli ve Taze Et
                    </div>
                </div>
            </div>

            {/* Right Section (30%) - Carousel */}
            <div className="w-[30%] h-full relative bg-[#0a0a0a]">
                {showcaseImages.map((img, idx) => (
                    <div
                        key={img.id}
                        className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                            idx === currentSlide ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-125 rotate-6 pointer-events-none'
                        }`}
                    >
                        {img.url ? (
                            <img src={img.url} alt="Carousel" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center text-white/5 p-20 text-center">
                                <Sparkles size={80} className="mb-8" />
                                <span className="text-xl font-bold uppercase tracking-[0.4em]">Lezzet Yakında</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                        
                        <div className="absolute bottom-20 left-0 right-0 p-12 text-center animate-in slide-in-from-bottom-8 duration-1000">
                            <h3 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-tight">
                                {idx === 0 ? 'Taze ve Sıcak' : idx === 1 ? 'Özel Soslu' : 'Geleneksel Lezzet'}
                            </h3>
                            <div className="w-16 h-1 bg-amber-500 mx-auto mt-6 rounded-full shadow-lg"></div>
                        </div>
                    </div>
                ))}

                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4">
                    {showcaseImages.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentSlide ? 'w-12 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'w-3 bg-white/20'}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute top-6 right-6 z-50 flex gap-4 opacity-10 hover:opacity-100 transition-opacity">
                 <button onClick={toggleFullScreen} className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-amber-500 hover:text-black transition-all">
                    <Maximize2 size={28} />
                 </button>
            </div>

            {/* Admin Login Button (Bottom Right) */}
            <div className="absolute bottom-4 right-4 z-50 opacity-10 hover:opacity-100 transition-opacity">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 text-white/40 hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all text-[10px] uppercase tracking-wider font-black group"
                >
                    <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span>Yönetici Girişi</span>
                </button>
            </div>

            <style>{`
                .custom-scrollbar-light::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar-light::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar-light::-webkit-scrollbar-thumb {
                    background: #d4a37355;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

const Check = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);
