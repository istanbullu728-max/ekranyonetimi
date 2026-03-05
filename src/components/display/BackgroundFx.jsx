import React from 'react';

export default function BackgroundFx() {
    return (
        <>
            {/* Base dark wood/charcoal gradient - Solid base is better for performance */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#121010] via-[#0d0d0d] to-[#0a0808] opacity-100 z-0"></div>

            {/* Subtle glowing radial accents - reduced blur radius for performance */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-900/10 blur-[80px] z-0 pointer-events-none transform-gpu"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/5 blur-[80px] z-0 pointer-events-none transform-gpu"></div>

            {/* CSS Pattern Overlay instead of heavy SVG turbulence filter */}
            <div
                className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            ></div>

            {/* Animated Smoke Particles (CSS) - Reduced to 2 particles to save GPU */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden z-0 pointer-events-none">
                <div className="absolute bottom-[-100px] left-[25%] w-[300px] h-[300px] rounded-full bg-white/[0.03] blur-[60px] animate-smoke" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-[-150px] left-[65%] w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[80px] animate-smoke" style={{ animationDelay: '7s' }}></div>
            </div>
        </>
    );
}
