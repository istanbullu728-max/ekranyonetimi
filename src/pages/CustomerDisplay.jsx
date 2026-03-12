import React, { useState, useEffect, useMemo } from 'react';
import useStore from '../store/useStore';
import { Sparkles, Flame, Settings, Maximize2, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAutoSyncDisplay } from '../hooks/useAutoSync';

const ITEMS_PER_PAGE = 10;
const SLIDE_DURATION = 8000; // 8 seconds

export default function CustomerDisplay() {
    useAutoSyncDisplay(); // Otomatik, gizli arka plan senkronizasyonu
    const products = useStore((state) => state.products || []);
    const categories = useStore((state) => state.categories || []);
    const campaigns = useStore((state) => state.campaigns || []);
    const showcaseImages = useStore((state) => state.showcaseImages || []);
    const settings = useStore((state) => state.settings || {});
    
    const [currentMenuPage, setCurrentMenuPage] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    // 1. Process Data for Pagination
    const paginatedMenu = useMemo(() => {
        try {
            if (!Array.isArray(products)) return [];
            const availableProducts = products.filter(p => p && p.available);
            const chunks = [];
            for (let i = 0; i < availableProducts.length; i += ITEMS_PER_PAGE) {
                chunks.push(availableProducts.slice(i, i + ITEMS_PER_PAGE));
            }
            return chunks;
        } catch (e) {
            console.error('Pagination error:', e);
            return [];
        }
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
        <div className="relative w-screen h-screen overflow-hidden bg-[#FDFBF7] text-slate-900 font-sans flex select-none">
            
            {/* Left Section (70%) - Paginated Menu */}
            <div className="w-[70%] h-full flex flex-col relative border-r border-slate-200/50">
                
                {/* Header */}
                <div className="p-12 pb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-6xl font-black tracking-tighter text-slate-900">GÜNÜN MENÜSÜ</h1>
                        <div className="h-1.5 w-24 bg-amber-500 mt-2 rounded-full shadow-sm"></div>
                    </div>
                    {activeCampaign && (
                        <div className="bg-amber-500 text-black px-8 py-3 rounded-full font-black text-lg uppercase tracking-wider animate-pulse transition-all">
                             %{activeCampaign.discountPercent} İNDİRİM: {activeCampaign.title}
                        </div>
                    )}
                </div>

                {/* Animated Product List */}
                <div className="flex-1 px-12 py-4 relative">
                    {/* Floating Curve Element for Text Wrap */}
                    {settings?.isTextCurved && (
                        <div 
                            className="float-right h-[120%] w-[350px] -mr-12 -mt-12 pointer-events-none"
                            style={{ 
                                shapeOutside: 'ellipse(100% 50% at 100% 50%)'
                            }}
                        />
                    )}

                    {currentPageItems.length > 0 ? (
                        <div 
                            key={currentMenuPage} 
                            className="block animate-in fade-in duration-1000 slide-in-from-bottom-4"
                        >
                            {currentPageItems.map(product => {
                                if (!product) return null;
                                const category = categories.find(c => c.id === product.categoryId);
                                let displayPrice = Number(product.price) || 0;
                                const hasDiscount = activeCampaign && 
                                    (!activeCampaign.targetCategory || activeCampaign.targetCategory === product.categoryId);
                                
                                if (hasDiscount) {
                                    displayPrice = displayPrice * (1 - (activeCampaign.discountPercent || 0) / 100);
                                }

                                return (
                                    <div key={product.id} className="block mb-6 relative z-10 w-full text-slate-800">
                                        {/* Price block floated right so it aligns with the contour */}
                                        <div className="float-right ml-6 flex items-baseline gap-2 pt-1 pl-4">
                                            {hasDiscount && (
                                                <span className="text-xl text-slate-300 line-through font-bold">
                                                    {(Number(product.price) || 0).toFixed(0)}₺
                                                </span>
                                            )}
                                            <span className={`text-4xl md:text-5xl font-black tracking-tighter ${hasDiscount ? 'text-amber-500' : 'text-slate-900'}`}>
                                                {displayPrice.toFixed(0)}
                                                <span className="text-xl ml-1 text-slate-400 font-bold">₺</span>
                                            </span>
                                        </div>

                                        {/* Name block */}
                                        <span className="text-2xl md:text-3xl font-black tracking-tight uppercase inline-flex items-center gap-2">
                                            {product.name}
                                            {product.isHot && <Flame size={20} className="text-red-500 fill-red-500" />}
                                            {product.isChefPick && <Sparkles size={20} className="text-amber-500 fill-amber-500" />}
                                        </span>
                                        
                                        {/* Dotted Spacer (Overflow hidden creates a BFC that fills the remainder of the line) */}
                                        <div className="overflow-hidden h-4 border-b-[3px] border-dotted border-slate-200/60 mt-2 mb-3"></div>
                                        
                                        {/* Description & Category - Inline structure prevents BFC line-box constraints, wrapping normally */}
                                        <div className="block pr-2 pb-1 relative">
                                            {category && (
                                                <span className="float-right ml-4 mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-slate-200 px-2 py-0.5 rounded-lg bg-white shadow-sm">
                                                    {category.name}
                                                </span>
                                            )}
                                            <span className="text-sm md:text-base text-slate-500 font-bold leading-snug">
                                                {product.description || 'Hatay mutfağının seçkin lezzeti, taze ve doğal spesiyaller hazırlanarak servis edilir.'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-8">
                            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center animate-pulse">
                                <LayoutDashboard size={48} className="text-slate-300" />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="font-black uppercase tracking-[0.3em] text-sm text-slate-800">Menü Verisi Bulunamadı</p>
                                <p className="text-xs text-slate-400 font-bold max-w-xs mx-auto px-4">Lütfen Admin panelinden ürün ekleyin veya sayfayı yenileyin.</p>
                            </div>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl"
                            >
                                Sayfayı Yenile
                            </button>
                        </div>
                    )}
                </div>

                {/* Progress Bar & Page Indicator */}
                <div className="h-2 w-full bg-slate-100 relative shadow-inner">
                    <div 
                        className="h-full bg-amber-500 transition-all duration-75 ease-linear shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                    
                    {/* Page Numbers */}
                    {paginatedMenu.length > 1 && (
                        <div className="absolute -top-10 right-12 flex gap-4 text-slate-200 font-black tracking-widest text-sm uppercase">
                            {paginatedMenu.map((_, idx) => (
                                <span key={idx} className={idx === currentMenuPage ? 'text-amber-500' : ''}>
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section (30%) - Showcase Carousel */}
            <div className="w-[30%] h-full relative bg-slate-50">
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
                                <span className="text-xl font-black uppercase tracking-[0.4em] text-slate-200">HAZIRLANIYOR</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/10"></div>
                        
                        <div className="absolute bottom-20 left-0 right-0 p-12 text-center animate-in slide-in-from-bottom-8 duration-1000">
                            <h3 className="text-4xl font-black text-slate-800 italic tracking-tighter drop-shadow-sm leading-tight uppercase">
                                {idx === 0 ? 'Taze ve Sıcak' : idx === 1 ? 'Özel Soslu' : 'Geleneksel Lezzet'}
                            </h3>
                            <div className="w-12 h-1 bg-amber-500 mx-auto mt-6 rounded-full shadow-sm"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-8 right-8 z-50 flex gap-3">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-300 text-slate-700 hover:text-amber-600 hover:border-amber-500/50 hover:shadow-2xl transition-all text-xs uppercase tracking-widest font-black shadow-lg"
                >
                    <Settings size={20} className="animate-spin-slow" />
                    <span>Panel Girişi</span>
                </button>
                <button
                    onClick={toggleFullScreen}
                    className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 text-slate-400 hover:text-slate-900 hover:shadow-lg transition-all text-[10px] uppercase tracking-widest font-black shadow-sm"
                >
                    <Maximize2 size={16} />
                </button>
            </div>
        </div>
    );
}
