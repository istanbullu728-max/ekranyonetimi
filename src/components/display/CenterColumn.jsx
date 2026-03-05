import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CenterColumn({ products }) {
    // Get all available Chef's Picks (or fallback to any available products if none flagged)
    const [currentIndex, setCurrentIndex] = useState(0);

    let featureds = products.filter(p => p.isChefPick && p.available);
    if (featureds.length === 0) {
        featureds = products.filter(p => p.available).slice(0, 3);
    }

    // Rotate images every 10 seconds
    useEffect(() => {
        if (featureds.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featureds.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [featureds]);

    if (featureds.length === 0) return null;

    const currentProduct = featureds[currentIndex];

    return (
        <div className="relative h-full flex flex-col justify-center gap-8 rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-[#121212]/80 p-6">
            {/* Central Image Mask Frame */}
            <div className="flex-1 relative rounded-3xl overflow-hidden border border-amber-900/40 group bg-neutral-900">

                {/* Animated gradients around image (optimized without mix-blend) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentProduct.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full will-change-[opacity]"
                    >
                        {currentProduct.image ? (
                            <img
                                src={currentProduct.image}
                                alt={currentProduct.name}
                                loading="eager"
                                decoding="async"
                                className="w-full h-full object-cover animate-ken-burns filter brightness-[1.05] contrast-125 saturate-125 will-change-transform"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                                <span className="text-white/20 text-4xl font-serif">Görsel Yok</span>
                            </div>
                        )}

                        {/* Product Meta overlaid on image bottom */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="absolute bottom-12 left-10 right-10 z-20 text-center will-change-[transform,opacity]"
                        >
                            {/* Badge */}
                            <div className="inline-block mb-6 border-b border-amber-500/50 pb-2 px-8">
                                <span className="text-amber-500 uppercase tracking-[0.3em] font-medium text-sm drop-shadow-md">
                                    — Şefin Seçimi —
                                </span>
                            </div>

                            <h2 className="text-6xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                                {currentProduct.name}
                            </h2>

                            <p className="text-xl text-gray-300 font-light max-w-xl mx-auto drop-shadow-lg leading-relaxed">
                                {currentProduct.description}
                            </p>
                        </motion.div>

                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
}
