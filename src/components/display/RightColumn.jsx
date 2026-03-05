import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RightColumn({ products, activeCampaign, campaigns }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Collect items for rotation: active campaign + dessert items
    const desserts = products.filter(p => p.categoryId === 'cat-icecek' && p.available);

    // Create rotation array
    const rotationItems = [];

    if (activeCampaign) {
        rotationItems.push({ type: 'campaign', data: activeCampaign });
    }

    // Add 1 or 2 featured desserts
    desserts.slice(0, 2).forEach(d => {
        rotationItems.push({ type: 'product', data: d });
    });

    // Rotate every 8 seconds
    useEffect(() => {
        if (rotationItems.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % rotationItems.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [rotationItems.length]);

    if (rotationItems.length === 0) {
        // Fallback if nothing to show
        return (
            <div className="bg-[#121010] rounded-3xl border border-white/5 p-8 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const currentItem = rotationItems[activeIndex];

    return (
        <div className="h-full flex flex-col gap-6 relative">
            <AnimatePresence mode="wait">

                {currentItem.type === 'campaign' && (
                    <motion.div
                        key={`camp-${currentItem.data.id}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 bg-gradient-to-br from-red-900 via-[#1a0f0f] to-[#121010] rounded-3xl p-8 border border-red-500/30 flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-red-900/20 will-change-[transform,opacity]"
                    >
                        {/* Animated bg rays */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1),transparent_50%)]"></div>

                        <div className="relative z-10 text-center">
                            <span className="inline-block bg-red-600 text-white font-bold px-4 py-1 rounded-full text-sm tracking-widest uppercase mb-6 animate-pulse">
                                Fırsat Kampanyası
                            </span>

                            <h3 className="text-5xl font-black font-serif text-white mb-6 leading-tight drop-shadow-xl text-shadow-glow">
                                {currentItem.data.title}
                            </h3>

                            <p className="text-xl text-red-100 mb-8 px-4 font-light">
                                {currentItem.data.description}
                            </p>

                            <div className="inline-flex flex-col items-center justify-center bg-black/60 rounded-2xl p-6 border border-white/10 shadow-inner">
                                <span className="text-red-400 text-lg uppercase tracking-wider font-bold mb-1">İndirim Oranı</span>
                                <span className="text-6xl font-black text-white">%{currentItem.data.discountPercent}</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentItem.type === 'product' && (
                    <motion.div
                        key={`prod-${currentItem.data.id}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 bg-[#121010] rounded-3xl p-0 border border-white/5 flex flex-col relative overflow-hidden group shadow-2xl will-change-[transform,opacity]"
                    >
                        {/* Large image for drinks/desserts */}
                        <div className="h-2/3 overflow-hidden relative">
                            {currentItem.data.image ? (
                                <img
                                    src={currentItem.data.image}
                                    alt={currentItem.data.name}
                                    className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-b from-neutral-800 to-neutral-900" />
                            )}
                            {/* Gradient overlay to text */}
                            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#151515] to-transparent"></div>
                        </div>

                        <div className="flex-1 p-8 text-center flex flex-col justify-center relative z-10 -mt-6">
                            <h4 className="text-4xl font-serif font-bold text-amber-500 mb-3 drop-shadow-md">
                                {currentItem.data.name}
                            </h4>

                            <div className="w-16 h-px bg-amber-500/50 mx-auto my-4"></div>

                            <div className="text-5xl font-black text-white">
                                {currentItem.data.price} <span className="text-2xl text-amber-600">₺</span>
                            </div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Static Footer / Info block */}
            <div className="h-48 bg-[#121010] rounded-3xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-amber-500 mb-2">
                    <svg className="w-10 h-10 mx-auto opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                </div>
                <p className="text-gray-400 font-light tracking-widest uppercase text-sm">
                    %100 Doğal Et
                    <br />Günlük Hazırlanmış
                </p>
            </div>
        </div>
    );
}
