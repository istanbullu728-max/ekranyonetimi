import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import LeftColumn from '../components/display/LeftColumn';
import CenterColumn from '../components/display/CenterColumn';
import RightColumn from '../components/display/RightColumn';
import BackgroundFx from '../components/display/BackgroundFx';

import { Settings, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDisplay() {
    const { products, categories, campaigns } = useStore();
    const [activeCampaign, setActiveCampaign] = useState(null);
    const navigate = useNavigate();

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
        <div className="relative w-screen h-screen overflow-hidden bg-[#0d0d0d] text-white font-sans">
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

            {/* Subtle Controls Container */}
            <div className="absolute bottom-4 right-4 z-50 flex items-center gap-3">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/20 hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all text-xs uppercase tracking-wider font-semibold group"
                >
                    <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span>Admin</span>
                </button>

                <button
                    onClick={toggleFullScreen}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/20 hover:text-white/60 hover:bg-white/10 transition-all text-xs uppercase tracking-wider font-semibold"
                    title="Toggle Fullscreen (F)"
                >
                    <Maximize2 size={14} />
                    <span>Tam Ekran</span>
                </button>
            </div>
        </div>
    );
}
