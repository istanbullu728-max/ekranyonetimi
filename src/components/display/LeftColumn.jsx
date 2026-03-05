import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeftColumn({ categories, products, activeCampaign }) {
    // Sort categories by order
    const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

    // Filter out drinks/desserts for the left column (they go on the right)
    const leftCategories = sortedCategories.filter(c => c.id !== 'cat-icecek');

    return (
        <div className="bg-[#121010] rounded-3xl border border-white/5 p-8 h-full flex flex-col gap-8 shadow-2xl relative overflow-hidden">

            {/* Header */}
            <div className="text-center pb-6 border-b border-white/10 relative z-10">
                <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 filter drop-shadow-md tracking-wider">
                    MENÜ
                </h1>
                <p className="text-amber-500/80 mt-2 uppercase tracking-[0.4em] text-xs font-semibold">Geleneksel Lezzet</p>
            </div>

            {/* Menu Categories */}
            <div className="flex-1 overflow-hidden flex flex-col gap-10 z-10">
                {leftCategories.map(category => {
                    const catProducts = products.filter(p => p.categoryId === category.id);
                    if (catProducts.length === 0) return null;

                    return (
                        <div key={category.id} className="flex flex-col gap-5">
                            <h2 className="text-3xl font-serif text-amber-500 flex items-center gap-4">
                                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30"></span>
                                {category.name}
                                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30"></span>
                            </h2>

                            <div className="flex flex-col gap-6">
                                <AnimatePresence>
                                    {catProducts.map(product => {
                                        const isDiscounted = activeCampaign?.targetCategory === category.id || activeCampaign?.targetCategory === null;
                                        const displayPrice = isDiscounted
                                            ? Math.round(product.price * (1 - activeCampaign.discountPercent / 100))
                                            : product.price;

                                        return (
                                            <motion.div
                                                key={product.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="relative will-change-[transform,opacity]"
                                            >
                                                <div className={`flex justify-between items-end gap-4 ${!product.available ? 'opacity-40 grayscale' : ''}`}>
                                                    <div className="flex-1 border-b border-dashed border-white/10 pb-1 mb-1">
                                                        <h3 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
                                                            {product.name}
                                                            {product.isHot && (
                                                                <span className="text-[10px] bg-red-600/20 text-red-500 px-2 py-0.5 rounded border border-red-500/30 uppercase tracking-widest font-bold animate-badge-pulse flex items-center gap-1">
                                                                    🔥 Sıcak
                                                                </span>
                                                            )}
                                                        </h3>
                                                        {product.description && (
                                                            <p className="text-gray-400 text-sm mt-1">{product.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="text-3xl font-bold text-amber-500 whitespace-nowrap pl-4">
                                                        {isDiscounted && (
                                                            <span className="text-lg text-gray-500 line-through mr-2 align-top">{product.price}₺</span>
                                                        )}
                                                        {displayPrice} <span className="text-lg text-amber-700">₺</span>
                                                    </div>
                                                </div>

                                                {/* Sold Out Overlay */}
                                                {!product.available && (
                                                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                                        <div className="bg-red-600 text-white font-bold px-6 py-1 transform -rotate-12 rounded shadow-2xl border-2 border-red-500/50 uppercase tracking-widest text-xl backdrop-blur-sm">
                                                            TÜKENDİ
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-amber-500/20 rounded-tl-3xl z-0"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-amber-500/20 rounded-tr-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-amber-500/20 rounded-bl-3xl z-0"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-amber-500/20 rounded-br-3xl z-0"></div>
        </div>
    );
}
