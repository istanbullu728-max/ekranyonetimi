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
        <div className="min-h-screen bg-[#f8f9fa] text-slate-800 flex flex-col md:flex-row font-sans">
            
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
            <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:relative z-40 w-64 h-full bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out shadow-xl md:shadow-none`}>
                <div className="p-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                        Döner Akış Admin
                    </h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Ürün Yönetimi</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('showcase')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'showcase' ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        <ImageIcon size={20} />
                        <span>Vitrin Görselleri</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('campaigns')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'campaigns' ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        <Megaphone size={20} />
                        <span>Kampanyalar</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                        <Settings size={20} />
                        <span>Ayarlar</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 text-xs font-bold font-mono">AD</div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold text-slate-800 truncate">Yönetici</p>
                            <p className="text-[10px] text-slate-400 truncate uppercase font-bold tracking-tighter">Sistem Yetkilisi</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                
                {/* Top Action Bar */}
                <header className="h-20 border-b border-slate-200 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                        {activeTab === 'products' ? 'Ürün Listesi' : activeTab === 'showcase' ? 'Vitrin Yönetimi' : activeTab === 'campaigns' ? 'Kampanya Yönetimi' : 'Ayarlar'}
                    </h2>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsTVPreviewOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all font-bold text-xs uppercase tracking-wider group"
                        >
                            <Monitor size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">TV Önizleme</span>
                        </button>

                        <button
                            onClick={() => setIsProductModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-xl hover:bg-amber-400 transition-all font-bold shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wider"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Yeni Ürün</span>
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
                        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-slate-800">
                                <Settings className="text-amber-500" /> Ayarlar
                            </h2>
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h3 className="font-bold text-slate-800 mb-2 text-lg">Görünüm ve Tema</h3>
                                    <p className="text-slate-500 text-sm">TV ekranınızın font, renk ve geçiş sürelerini buradan ayarlayabileceksiniz (Yakında).</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h3 className="font-bold text-slate-800 mb-2 text-lg">Bildirimler</h3>
                                    <p className="text-slate-500 text-sm">Ürün tükendiğinde veya kampanya başladığında alacağınız uyarıları yönetin.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Modals */}
            {isProductModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)}></div>
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-8 custom-scrollbar">
                        <button 
                            onClick={() => setIsProductModalOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <ProductForm onSuccess={() => setIsProductModalOpen(false)} />
                    </div>
                </div>
            )}

            {isTVPreviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setIsTVPreviewOpen(false)}></div>
                    <div className="relative w-full max-w-[90vw] aspect-video bg-[#333] rounded-[3rem] shadow-2xl overflow-hidden border-[12px] border-[#111]">
                        <button 
                            onClick={() => setIsTVPreviewOpen(false)}
                            className="absolute top-8 right-8 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
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
