import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import LeftColumn from '../components/display/LeftColumn';
import CenterColumn from '../components/display/CenterColumn';
import RightColumn from '../components/display/RightColumn';
import BackgroundFx from '../components/display/BackgroundFx';

export default function CustomerDisplay() {
    const { products, categories, campaigns } = useStore();
    const [activeCampaign, setActiveCampaign] = useState(null);

    // Check for active campaigns based on current time
    useEffect(() => {
        const checkCampaigns = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

            const active = campaigns.find(c => {
                if (!c.active) return false;
                return c.startHour <= currentTimeStr && c.endHour >= currentTimeStr;
            });

            setActiveCampaign(active || null);
        };

        checkCampaigns();
        const interval = setInterval(checkCampaigns, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [campaigns]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'f' || e.key === 'F') toggleFullScreen();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#0d0d0d] text-white">
            <BackgroundFx />

            {/* 3-Column CSS Grid Layout */}
            <div className="relative z-10 w-full h-full p-8 grid grid-cols-12 gap-8">
                {/* Left Column (Categories & Prices) */}
                <div className="col-span-3 h-full flex flex-col gap-6">
                    <LeftColumn
                        categories={categories}
                        products={products}
                        activeCampaign={activeCampaign}
                    />
                </div>

                {/* Center Column (Hero / Chef's Pick) */}
                <div className="col-span-6 h-full flex flex-col gap-6">
                    <CenterColumn
                        products={products}
                    />
                </div>

                {/* Right Column (Campaigns & Drinks/Desserts) */}
                <div className="col-span-3 h-full flex flex-col gap-6">
                    <RightColumn
                        products={products}
                        activeCampaign={activeCampaign}
                        campaigns={campaigns}
                    />
                </div>
            </div>

            {/* Hidden button for touch screens or folks who don't know the F key */}
            <button
                onClick={toggleFullScreen}
                className="absolute bottom-4 right-4 z-50 text-white/10 hover:text-white/30 transition-colors"
            >
                [Fullscreen F]
            </button>
        </div>
    );
}
