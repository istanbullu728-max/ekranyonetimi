import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Smartphone, Zap, CheckCircle, ArrowRight, Menu, X, Play, LogIn, ChevronRight, LayoutDashboard, Clock, PenTool } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
            
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-amber-500/20 group-hover:rotate-6 transition-transform">
                            <Monitor size={20} className="font-bold" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Döner Akış</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        <a href="#features" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Özellikler</a>
                        <a href="#preview" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Önizleme</a>
                        <div className="h-6 w-px bg-slate-200"></div>
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-sm font-black uppercase tracking-widest text-slate-900 hover:bg-slate-100 px-6 py-2.5 rounded-xl transition-all flex items-center gap-2"
                        >
                            <LogIn size={18} />
                            Giriş Yap
                        </button>
                        <button 
                            onClick={() => navigate('/admin')}
                            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2"
                        >
                            Hemen Başla
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
                        <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-4 bg-slate-50 rounded-2xl">Özellikler</a>
                        <button 
                            onClick={() => navigate('/login')}
                            className="w-full bg-slate-50 p-4 rounded-2xl font-black uppercase tracking-widest text-left"
                        >
                            Giriş Yap
                        </button>
                        <button 
                            onClick={() => navigate('/admin')}
                            className="w-full bg-amber-500 p-4 rounded-2xl font-black uppercase tracking-widest"
                        >
                            Hemen Başla
                        </button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="mb-8 px-5 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-2 animate-bounce">
                        <Zap size={14} className="text-amber-600 fill-amber-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Artık Yayındayız</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] max-w-5xl mb-8 uppercase">
                        Menünüzü <span className="text-amber-500">2 Dakikada</span> TV'ye Taşıyın.
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mb-12 leading-relaxed">
                        Tasarımcıya ihtiyacınız yok. Ürünleri girin, akıllı sistemimiz menünüzü otomatik oluştursun ve profesyonel geçişlerle TV'nize yansıtsın.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <button 
                            onClick={() => navigate('/admin')}
                            className="w-full sm:w-auto px-12 py-6 bg-amber-500 text-black rounded-[2rem] font-black text-xl uppercase tracking-tighter hover:scale-105 transition-all shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-3 group"
                        >
                            Hemen Ücretsiz Başla
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        <button 
                            onClick={() => navigate('/display')}
                            className="w-full sm:w-auto px-12 py-6 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] font-black text-xl uppercase tracking-tighter hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                        >
                            Canlı Demoyu İzle
                            <Play size={20} className="fill-slate-900" />
                        </button>
                    </div>

                    {/* Meta Vibe */}
                    <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-300 font-black uppercase tracking-[0.3em] text-[10px]">
                        <span className="flex items-center gap-2"><CheckCircle size={14} /> KURULUM GEREKTİRMEZ</span>
                        <span className="flex items-center gap-2"><CheckCircle size={14} /> KREDİ KARTI GEREKMEZ</span>
                        <span className="flex items-center gap-2"><CheckCircle size={14} /> SINIRSIZ GÜNCELLEME</span>
                    </div>
                </div>

                {/* Hero Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[120%] h-full opacity-30">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-400/10 blur-[120px] rounded-full"></div>
                </div>
            </section>

            {/* Product Preview Section (Laptop & TV) */}
            <section id="preview" className="px-6 py-20 bg-slate-50/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 translate-y-20 animate-in slide-in-from-bottom-20 duration-1000 fill-mode-forwards">
                        
                        {/* Admin Panel Mockup (Laptop) */}
                        <div className="relative w-full max-w-2xl group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-white border-[12px] border-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[16/10] flex flex-col">
                                <div className="h-4 bg-slate-900 flex items-center gap-1.5 px-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                </div>
                                <div className="flex-1 bg-white p-6 opacity-40">
                                    <div className="flex gap-4 mb-8">
                                        <div className="w-1/4 h-32 bg-slate-100 rounded-2xl"></div>
                                        <div className="flex-1 space-y-4">
                                            <div className="h-6 w-1/2 bg-slate-100 rounded-full"></div>
                                            <div className="h-4 w-full bg-slate-50 rounded-full"></div>
                                            <div className="h-4 w-3/4 bg-slate-50 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-40 bg-slate-50 rounded-3xl border border-dashed border-slate-200"></div>
                                        <div className="h-40 bg-slate-50 rounded-3xl border border-dashed border-slate-200"></div>
                                    </div>
                                </div>
                                {/* Floating Overlay Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-amber-500 text-black px-8 py-4 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-amber-500/50 scale-110">YÖNETİM PANELİ</div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 hidden lg:block animate-pulse">
                                <ArrowRight size={80} className="text-amber-500 rotate-[15deg]" />
                            </div>
                        </div>

                        {/* TV Display Mockup */}
                        <div className="relative w-full max-w-md group">
                            <div className="absolute -inset-4 bg-gradient-to-bl from-amber-500/20 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-[#111] border-[16px] border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden aspect-[9/16] flex flex-col">
                                <div className="flex-1 bg-[#FDFBF7] p-8">
                                    <div className="h-4 w-12 bg-amber-500 mb-6 rounded-full"></div>
                                    <div className="space-y-6">
                                        {[1,2,3,4,5,6].map(i => (
                                            <div key={i} className="flex justify-between items-end border-b border-slate-100 pb-2">
                                                <div className="h-3 w-28 bg-slate-200 rounded-full"></div>
                                                <div className="h-4 w-10 bg-slate-300 rounded-full"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-10 left-8 right-8 h-40 bg-slate-100 rounded-2xl"></div>
                                </div>
                                {/* Floating Label */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-white border-2 border-slate-900 text-black px-8 py-4 rounded-3xl font-black uppercase tracking-widest shadow-2xl animate-bounce">TV GÖRÜNÜMÜ</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 text-center text-slate-400 font-black uppercase tracking-[0.5em] text-xs">
                        PANELDEN TV'YE KESİNTİSİZ AKIŞ
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        
                        {/* Feature 1 */}
                        <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-amber-500/5 transition-all group">
                            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600 mb-8 group-hover:scale-110 transition-transform">
                                <LayoutDashboard size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Otomatik Sayfalama</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Menünüz ekrana sığmazsa dert etmeyin. Sistemimiz ürünleri otomatik böler ve 8 saniyede bir zarif geçişler yapar.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-amber-500/5 transition-all group">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                                <Clock size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Anlık Güncelleme</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Fiyat mı değişti? Telefonunuzdan güncelleyin, dükkandaki TV'de saniyeler içinde otomatik olarak değişsin.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl hover:shadow-amber-500/5 transition-all group">
                            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform">
                                <PenTool size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Tasarımcı İçinde</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Siz sadece metni yazın; yerleşim, hizalama ve estetik her şeyi yapay zekalı premium şablonlarımız halletsin.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Full Width */}
            <section className="px-6 py-20 pb-40">
                <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase leading-[0.9]">
                        Sektörün En Şık Menü Sistemine <span className="text-amber-500">Hazır mısınız?</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
                        Karmaşık donanımlara, yüksek aylık ücretlere son. Basit, güçlü ve tamamen size özel.
                    </p>
                    
                    <div className="flex flex-col items-center gap-6">
                        <button 
                            onClick={() => navigate('/admin')}
                            className="px-12 py-6 bg-amber-500 text-black rounded-3xl font-black text-xl uppercase tracking-tighter hover:scale-105 transition-all shadow-2xl shadow-amber-500/20"
                        >
                            Hemen Ücretsiz Başla
                        </button>
                        <span className="text-slate-500 font-black uppercase tracking-widest text-xs">
                            Kredi Kartı Gerekmez • Anında Kurulum
                        </span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-slate-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Monitor size={16} className="text-amber-500" />
                        <span className="font-black text-sm uppercase tracking-tighter">Döner Akış © 2026</span>
                    </div>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <a href="#" className="hover:text-slate-900 transition-colors">Kullanım Koşulları</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Gizlilik Politikası</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Destek</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
