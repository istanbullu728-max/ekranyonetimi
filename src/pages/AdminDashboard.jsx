import React, { useState } from 'react';
import useStore from '../store/useStore';
import ProductList from '../components/admin/ProductList';
import ProductForm from '../components/admin/ProductForm';
import CampaignManager from '../components/admin/CampaignManager';
import ShowcaseManager from '../components/admin/ShowcaseManager';
import { LayoutDashboard, Megaphone, Settings, Plus, Monitor, X, Menu, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('products');
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isTVPreviewOpen, setIsTVPreviewOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-200 flex flex-col md:flex-row font-sans">
            
            {/* Sidebar Overlay for Mobile */}
            {!isSidebarOpen && (
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden fixed top-4 left-4 z-50 p-2 bg-amber-500 rounded-lg text-black shadow-lg"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:relative z-40 w-64 h-full bg-[#212121] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out`}>
                <div className="p-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                        Döner Akış Admin
                    </h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Ürün Yönetimi</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('showcase')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'showcase' ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <ImageIcon size={20} />
                        <span>Vitrin Görselleri</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('campaigns')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'campaigns' ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Megaphone size={20} />
                        <span>Kampanyalar</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Settings size={20} />
                        <span>Ayarlar</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-bold">AD</div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">Yönetici</p>
                            <p className="text-[10px] text-gray-500 truncate">Sistem Yetkilisi</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                
                {/* Top Action Bar */}
                <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#1a1a1a]/80 backdrop-blur-md sticky top-0 z-30">
                    <h2 className="text-lg font-semibold text-white uppercase tracking-widest text-xs">
                        {activeTab === 'products' ? 'Ürün Listesi' : activeTab === 'showcase' ? 'Vitrin Yönetimi' : activeTab === 'campaigns' ? 'Kampanya Yönetimi' : 'Ayarlar'}
                    </h2>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsTVPreviewOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-600/10 border border-amber-600/30 text-amber-500 rounded-xl hover:bg-amber-600/20 transition-all font-semibold text-sm group"
                        >
                            <Monitor size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline text-xs uppercase tracking-wider">TV Önizleme</span>
                        </button>

                        <button
                            onClick={() => setIsProductModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-xl hover:bg-amber-400 transition-all font-bold shadow-lg shadow-amber-500/20 text-sm"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline text-xs uppercase tracking-wider">Yeni Ürün</span>
                        </button>
                    </div>
                </header>

                {/* Dashboard View */}
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {activeTab === 'products' && (
                        <div className="max-w-6xl mx-auto">
                            <ProductList onEditProduct={() => setIsProductModalOpen(true)} />
                        </div>
                    )}

                    {activeTab === 'showcase' && (
                        <div className="max-w-6xl mx-auto">
                            <ShowcaseManager />
                        </div>
                    )}

                    {activeTab === 'campaigns' && (
                        <div className="max-w-6xl mx-auto">
                            <CampaignManager />
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="max-w-4xl mx-auto bg-[#262626] border border-white/5 rounded-2xl p-10">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Settings className="text-amber-500" /> Ayarlar
                            </h2>
                            <div className="space-y-6">
                                <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                    <h3 className="font-bold text-white mb-2 text-lg">Görünüm ve Tema</h3>
                                    <p className="text-gray-400 text-sm">TV ekranınızın font, renk ve geçiş sürelerini buradan ayarlayabileceksiniz (Yakında).</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                                    <h3 className="font-bold text-white mb-2 text-lg">Bildirimler</h3>
                                    <p className="text-gray-400 text-sm">Ürün tükendiğinde veya kampanya başladığında alacağınız uyarıları yönetin.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Modals */}
            {isProductModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)}></div>
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#262626] border border-white/10 rounded-3xl shadow-2xl p-8 custom-scrollbar">
                        <button 
                            onClick={() => setIsProductModalOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <ProductForm onSuccess={() => setIsProductModalOpen(false)} />
                    </div>
                </div>
            )}

            {isTVPreviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsTVPreviewOpen(false)}></div>
                    <div className="relative w-full max-w-[90vw] aspect-video bg-[#fdfbf7] rounded-3xl shadow-2xl overflow-hidden border-8 border-[#333]">
                        <button 
                            onClick={() => setIsTVPreviewOpen(false)}
                            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/10 hover:bg-black/20 text-black transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <TVPreviewModal />
                    </div>
                </div>
            )}

        </div>
    );
}
