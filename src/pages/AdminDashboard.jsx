import React, { useState } from 'react';
import useStore from '../store/useStore';
import ProductList from '../components/admin/ProductList';
import ProductForm from '../components/admin/ProductForm';
import CampaignManager from '../components/admin/CampaignManager';
import { LayoutDashboard, Megaphone, Settings } from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('products');

    return (
        <div className="min-h-screen bg-[#111] text-gray-200 p-6 flex flex-col md:flex-row gap-6">

            {/* Sidebar sidebar */}
            <div className="w-full md:w-64 flex flex-col gap-2">
                <div className="mb-6 px-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                        Döner Ekranı Admin
                    </h1>
                </div>

                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-amber-600/20 text-amber-500' : 'hover:bg-white/5'
                        }`}
                >
                    <LayoutDashboard size={20} />
                    <span>Ürün Yönetimi</span>
                </button>

                <button
                    onClick={() => setActiveTab('campaigns')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'campaigns' ? 'bg-amber-600/20 text-amber-500' : 'hover:bg-white/5'
                        }`}
                >
                    <Megaphone size={20} />
                    <span>Kampanyalar</span>
                </button>

                <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-amber-600/20 text-amber-500' : 'hover:bg-white/5'
                        }`}
                >
                    <Settings size={20} />
                    <span>Ayarlar</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col">
                {activeTab === 'products' && (
                    <div className="flex flex-col xl:flex-row gap-8 h-full">
                        <div className="flex-1 xl:w-2/3 h-full overflow-y-auto pr-2">
                            <ProductList />
                        </div>
                        <div className="xl:w-1/3 border-t xl:border-t-0 xl:border-l border-white/10 pt-6 xl:pt-0 xl:pl-8 overflow-y-auto">
                            <ProductForm />
                        </div>
                    </div>
                )}

                {activeTab === 'campaigns' && (
                    <div>
                        <CampaignManager />
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Ayarlar</h2>
                        <p className="text-gray-400">Bu bölümde ileride tema, font ve geçiş süresi ayarlamaları yapılabilir.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
