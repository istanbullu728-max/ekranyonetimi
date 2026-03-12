import React from 'react';
import useStore from '../../store/useStore';
import { Tag, Sparkles, Flame } from 'lucide-react';

export default function TVPreviewModal() {
    const { products, categories, campaigns } = useStore();
    
    // Simple logic to find active campaign (same as CustomerDisplay)
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    const activeCampaign = campaigns.find(c => {
        if (!c.active) return false;
        return c.startHour <= currentTimeStr && c.endHour >= currentTimeStr;
    });

    return (
        <div className="w-full h-full bg-[#fdf8f0] flex flex-col font-serif relative overflow-hidden select-none">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")' }}></div>
            
            {/* Header Area */}
            <div className="relative z-10 p-10 flex justify-between items-end border-b-2 border-amber-900/10 mb-6 bg-white/50 backdrop-blur-sm">
                <div>
                    <h1 className="text-5xl font-black text-amber-950 tracking-tighter">GÜNÜN MENÜSÜ</h1>
                    <p className="text-amber-800/60 font-medium tracking-[0.2em] mt-2 uppercase text-sm">Lezzetin En Taze Hali • İskenderun</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black text-amber-600">DÖNER AKIŞ</div>
                    <div className="text-xs text-amber-900/40 uppercase font-bold mt-1 tracking-widest leading-none">Simülasyon Modu</div>
                </div>
            </div>

            {/* Menu Grid */}
            <div className="flex-1 grid grid-cols-12 gap-10 p-10 pt-4 overflow-hidden relative z-10">
                
                {/* Main List (8 columns) */}
                <div className="col-span-8 flex flex-col gap-8 h-full overflow-y-auto pr-4 custom-scrollbar-light">
                    {categories.map(category => {
                        const catProducts = products.filter(p => p.categoryId === category.id && p.available);
                        if (catProducts.length === 0) return null;

                        return (
                            <div key={category.id} className="space-y-4">
                                <h2 className="text-2xl font-black text-amber-900 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-amber-900/20"></span>
                                    {category.name}
                                </h2>
                                <div className="space-y-3">
                                    {catProducts.map(product => {
                                        // Apply campaign discount if applicable
                                        let displayPrice = product.price;
                                        const hasDiscount = activeCampaign && 
                                            (!activeCampaign.targetCategory || activeCampaign.targetCategory === product.categoryId);
                                        
                                        if (hasDiscount) {
                                            displayPrice = product.price * (1 - activeCampaign.discountPercent / 100);
                                        }

                                        return (
                                            <div key={product.id} className="flex justify-between items-baseline group animate-in fade-in slide-in-from-left-4 duration-500">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold text-amber-950">{product.name}</span>
                                                        {product.isHot && <Flame size={16} className="text-red-600 fill-red-600" />}
                                                        {product.isChefPick && <Sparkles size={16} className="text-amber-500 fill-amber-500" />}
                                                    </div>
                                                    <span className="text-xs text-amber-800/50 italic font-medium leading-none mt-1">
                                                        {product.description || 'Geleneksel lezzetler...'}
                                                    </span>
                                                </div>
                                                <div className="flex-1 border-b-2 border-dotted border-amber-900/10 mx-4 mb-1"></div>
                                                <div className="flex flex-col items-end">
                                                    <span className={`text-2xl font-black ${hasDiscount ? 'text-red-700' : 'text-amber-900'}`}>
                                                        {displayPrice.toFixed(2)} <span className="text-sm font-bold">₺</span>
                                                    </span>
                                                    {hasDiscount && (
                                                        <span className="text-[10px] text-amber-900/40 line-through font-bold">
                                                            {product.price.toFixed(2)} ₺
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

                {/* Side Specials (4 columns) */}
                <div className="col-span-4 h-full flex flex-col gap-8">
                    {/* Active Campaign Info */}
                    {activeCampaign ? (
                        <div className="bg-red-700 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
                                <Sparkles size={100} />
                            </div>
                            <div className="relative z-10">
                                <div className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-60 italic">Günün Fırsatı</div>
                                <h3 className="text-4xl font-black leading-tight mb-4">{activeCampaign.title}</h3>
                                <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">{activeCampaign.description}</p>
                                <div className="flex items-center gap-4">
                                    <div className="bg-white text-red-700 text-3xl font-black px-4 py-2 rounded-2xl shadow-xl">
                                        %{activeCampaign.discountPercent}
                                    </div>
                                    <div className="text-xs font-black leading-tight uppercase tracking-widest opacity-60">
                                        İNDİRİM <br /> BAŞLADI
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 bg-amber-900/5 border-2 border-dashed border-amber-800/10 rounded-[2rem] flex flex-col items-center justify-center p-10 text-center">
                            <Tag size={48} className="text-amber-900/20 mb-4" />
                            <h4 className="text-xl font-bold text-amber-900/40">Şu An Aktif Kampanya Yok</h4>
                            <p className="text-sm text-amber-900/30 mt-2">Kampanyalarınızı admin panelinden zamanlayabilirsiniz.</p>
                        </div>
                    )}

                    {/* Featured Item */}
                    {products.find(p => p.isChefPick && p.available && p.image) && (
                        <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-amber-900/5 flex-1 flex flex-col">
                            {(() => {
                                const chefPick = products.find(p => p.isChefPick && p.available && p.image);
                                return (
                                    <>
                                        <div className="flex-1 rounded-[1.8rem] overflow-hidden mb-4 relative">
                                            <img src={chefPick.image} alt={chefPick.name} className="w-full h-full object-cover" />
                                            <div className="absolute top-4 left-4 bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg">ŞEFİN TAVSİYESİ</div>
                                        </div>
                                        <div className="px-2">
                                            <h4 className="text-xl font-black text-amber-950 mb-1">{chefPick.name}</h4>
                                            <p className="text-xs text-amber-800/50 font-medium line-clamp-2 italic mb-2">{chefPick.description}</p>
                                            <div className="text-2xl font-black text-amber-600">{chefPick.price.toFixed(2)} ₺</div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="p-8 flex justify-center items-center gap-10 bg-white/30 backdrop-blur-sm relative z-10 border-t border-amber-900/5">
                 <div className="flex items-center gap-2 text-amber-900/40 text-xs font-bold uppercase tracking-widest">
                    <Sparkles size={14} /> Temiz İçerik
                 </div>
                 <div className="w-1 h-1 bg-amber-900/20 rounded-full"></div>
                 <div className="flex items-center gap-2 text-amber-900/40 text-xs font-bold uppercase tracking-widest">
                    <Flame size={14} /> Odun Ateşinde
                 </div>
                 <div className="w-1 h-1 bg-amber-900/20 rounded-full"></div>
                 <div className="flex items-center gap-2 text-amber-900/40 text-xs font-bold uppercase tracking-widest">
                    <Check size={14} /> Helal Kesim
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
                    background: #d4a373;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

// Simple check icon for the footer
const Check = ({ size, className }) => (
    <svg 
        width={size} height={size} viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
        className={className}
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);
