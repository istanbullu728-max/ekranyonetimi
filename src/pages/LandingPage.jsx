import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Smartphone, CheckCircle, ArrowRight, Menu, X, ShieldCheck, Zap, Layers, Edit3, Wifi, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-[#FF5722]/20 selection:text-[#FF5722] overflow-x-hidden">
            
            {/* Legal / Info Banner */}
            <div className="bg-[#FF5722] text-white w-full py-2.5 px-4 text-center text-xs md:text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md z-50 relative">
                <ShieldCheck size={16} className="animate-pulse" />
                <span className="hidden sm:inline"> Yeni Yönetmeliğe Tam Uyum:</span> Kapıda ve Masada Fiyat Listesi Zorunluluğu İçin Dijital Çözüm
            </div>

            {/* Navigation */}
            <nav className="fixed top-[44px] left-0 right-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-xl border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-[#FF5722] group-hover:border-[#FF5722] group-hover:text-white transition-colors">
                            <Monitor size={24} className="font-bold" />
                        </div>
                        <span className="text-2xl font-black tracking-widest text-slate-900 uppercase">Döner Akış <span className="text-[#FF5722]">.</span></span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-12">
                        <a href="#features" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors">Özellikler</a>
                        <a href="#how-it-works" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors">Nasıl Çalışır</a>
                        <div className="h-6 w-px bg-slate-200"></div>
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-[#FF5722] transition-colors"
                        >
                            Giriş Yap
                        </button>
                        <button 
                            onClick={() => navigate('/admin')}
                            className="bg-[#FF5722] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#e64a19] transition-all shadow-lg hover:shadow-[#FF5722]/30 flex items-center gap-2"
                        >
                            Ücretsiz Başla
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden absolute top-24 left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-2xl"
                        >
                            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.2em] p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 hover:bg-slate-100">Özellikler</a>
                            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.2em] p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 hover:bg-slate-100">Nasıl Çalışır</a>
                            <button 
                                onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
                                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-left text-slate-900 hover:bg-slate-100"
                            >
                                Giriş Yap
                            </button>
                            <button 
                                onClick={() => { setIsMenuOpen(false); navigate('/admin'); }}
                                className="w-full bg-[#FF5722] p-4 rounded-2xl font-black text-white text-sm uppercase tracking-[0.2em] shadow-lg shadow-[#FF5722]/20"
                            >
                                Ücretsiz Başla
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 z-10 relative">
                    
                    {/* Left: Typography */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 bg-white rounded-full mb-8 shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Yeni Nesil Dijital Menü</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                            className="text-5xl lg:text-7xl xl:text-8xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8 uppercase drop-shadow-md"
                        >
                            Sadece 2 <span className="text-[#FF5722]">Dakikada</span><br/>
                            Dijital Menünüz <br/>
                            Yayında.
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            className="text-lg lg:text-2xl text-slate-500 font-medium max-w-2xl mb-12 leading-relaxed tracking-wide"
                        >
                            Cihaz bağımsız, yasalara uyumlu, cebinizden yönetilebilir. Klasik yöntemleri unutun.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center gap-6"
                        >
                            <button 
                                onClick={() => navigate('/admin')}
                                className="w-full sm:w-auto px-12 py-6 bg-[#FF5722] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-[#e64a19] transition-all shadow-[0_20px_40px_rgba(255,87,34,0.4)] hover:shadow-[0_20px_60px_rgba(255,87,34,0.6)] flex items-center justify-center gap-4 group hover:-translate-y-1"
                            >
                                Ücretsiz Başla
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                            </button>
                            <button 
                                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto px-12 py-6 bg-white border border-slate-200 text-slate-900 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center shadow-sm"
                            >
                                Nasıl Çalışır?
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: Mockups */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex-1 relative w-full h-[500px] flex items-center justify-center lg:justify-end perspective-1000"
                    >
                        {/* Glow Behind Mockups */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF5722]/10 blur-[120px] rounded-full"></div>

                        {/* TV Mockup */}
                        <div className="relative z-10 w-full max-w-[600px] aspect-video bg-white border border-slate-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col rotate-y-[-10deg] transform-gpu">
                            {/* TV Bezel Inner */}
                            <div className="absolute inset-2 border border-slate-100 rounded-2xl overflow-hidden pointer-events-none"></div>
                            {/* Fake Display Content */}
                            <div className="flex-1 p-6 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-32 h-6 bg-slate-200 rounded-full"></div>
                                    <div className="w-16 h-6 bg-[#FF5722] rounded-full"></div>
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                        <div>
                                            <div className="w-48 h-6 bg-slate-800 rounded mb-2"></div>
                                            <div className="w-32 h-3 bg-slate-200 rounded"></div>
                                        </div>
                                        <div className="w-24 h-8 bg-slate-800 rounded"></div>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                        <div>
                                            <div className="w-40 h-6 bg-slate-800 rounded mb-2"></div>
                                            <div className="w-28 h-3 bg-slate-200 rounded"></div>
                                        </div>
                                        <div className="w-24 h-8 bg-[#FF5722] rounded animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                        <div>
                                            <div className="w-56 h-6 bg-slate-800 rounded mb-2"></div>
                                            <div className="w-36 h-3 bg-slate-200 rounded"></div>
                                        </div>
                                        <div className="w-24 h-8 bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* iPhone Mockup (Overlapping) */}
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                            className="absolute -bottom-10 -left-10 z-20 w-[200px] h-[400px] bg-white border-[6px] border-slate-300 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
                        >
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-300 rounded-b-xl z-30"></div>
                            {/* App Screen */}
                            <div className="flex-1 bg-white pt-12 px-4 flex flex-col gap-4">
                                <div className="w-full h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between px-4">
                                    <span className="text-[10px] font-black text-slate-500">Urfa Dürüm</span>
                                    <span className="text-[12px] font-black text-slate-900">120₺</span>
                                </div>
                                <div className="w-full h-12 bg-[#FF5722]/10 rounded-xl border border-[#FF5722]/30 flex items-center justify-between px-4">
                                    <span className="text-[10px] font-black text-slate-500">Adana Dürüm</span>
                                    <input type="text" className="w-16 bg-transparent text-right text-sm font-black text-[#FF5722] outline-none" defaultValue="140" />
                                </div>
                                <button className="mt-auto mb-4 w-full py-4 bg-[#FF5722] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white">Fiyatı Güncelle</button>
                            </div>
                        </motion.div>

                        {/* Connecting Line/Animation */}
                        <svg className="absolute top-1/2 left-[180px] w-32 h-32 -translate-y-1/2 z-10 pointer-events-none opacity-50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path 
                                d="M0,80 Q50,80 50,50 T100,20" 
                                stroke="#FF5722" 
                                strokeWidth="2" 
                                strokeDasharray="5,5"
                                className="animate-[dash_2s_linear_infinite]"
                            />
                        </svg>
                        <style>{`
                            @keyframes dash {
                                to {
                                    stroke-dashoffset: -10;
                                }
                            }
                        `}</style>
                    </motion.div>
                </div>
            </section>

            {/* Value Propositions (Minimalist) */}
            <section id="features" className="py-32 px-6 relative border-t border-slate-200 bg-gradient-to-b from-[#FDFBF7] to-white">
                 <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                         { icon: ShieldCheck, title: "Yasal Güvence", desc: "Resmi Gazete yönetmeliğine tam uyum. Masada ve kapıda fiyat bulundurma zorunluluğuna kesin çözüm." },
                         { icon: Monitor, title: "Cihaz Özgürlüğü", desc: "Özel kutu yok. Kurulum yok. Kendi Smart TV'niz veya eski monitörünüz anında profesyonel menüye dönüşür." },
                         { icon: Layers, title: "Akıllı Sayfalama", desc: "Sığmayan menüler için otomatik kategorizasyon ve 8 saniyelik pürüzsüz geçişler." },
                     ].map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-white border border-slate-200 rounded-[2rem] p-10 hover:shadow-xl hover:border-[#FF5722]/30 transition-all cursor-default group"
                          >
                            <div className="w-16 h-16 bg-[#FF5722]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#FF5722]/20 group-hover:scale-110 transition-transform">
                                <item.icon size={32} className="text-[#FF5722]" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-4">{item.title}</h3>
                            <p className="text-slate-500 text-base font-medium leading-relaxed tracking-wide">{item.desc}</p>
                          </motion.div>
                     ))}
                 </div>
            </section>

            {/* How It Works (Visual Steps) */}
            <section id="how-it-works" className="py-40 px-6 relative border-t border-slate-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-32">
                        <span className="text-[#FF5722] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">SÜREÇ</span>
                        <h2 className="text-4xl md:text-6xl mt-4 font-black text-slate-900 tracking-tighter uppercase drop-shadow-sm">
                            Nasıl Çalışır?
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Desktop Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] border-t border-dashed border-slate-300"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-8">
                            {[
                                { step: "01", icon: Edit3, title: "YAZ", desc: "Ürün ve fiyatları gir." },
                                { step: "02", icon: Wifi, title: "BAĞLA", desc: "TV'deki kodu telefonuna yaz." },
                                { step: "03", icon: Play, title: "YAYINLA", desc: "Menün anında TV'de." }
                            ].map((item, i) => (
                                 <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: i * 0.3 }}
                                    className="relative flex flex-col items-center text-center group"
                                 >
                                     <div className="absolute -top-10 text-[120px] font-black text-slate-100 select-none tracking-tighter leading-none pointer-events-none group-hover:text-[#FF5722]/10 transition-colors">
                                         {item.step}
                                     </div>
                                     <div className="w-24 h-24 bg-white border-4 border-slate-200 rounded-full flex items-center justify-center text-[#FF5722] mb-8 z-10 group-hover:border-[#FF5722]/50 group-hover:shadow-[0_0_30px_rgba(255,87,34,0.1)] transition-all">
                                         <item.icon size={36} />
                                     </div>
                                     <h3 className="text-3xl font-black text-slate-800 uppercase tracking-[0.2em] mb-4">{item.title}</h3>
                                     <p className="text-slate-500 text-xl font-medium tracking-wide">{item.desc}</p>
                                 </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-6 py-20 pb-40 border-t border-slate-200 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#FF5722]/5 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-12 uppercase leading-[1.1]">
                        SİSTEMİNİZ <br/>HAZIR.
                    </h2>
                    <button 
                        onClick={() => navigate('/admin')}
                        className="w-full sm:w-auto px-16 py-8 bg-[#FF5722] text-white rounded-full font-black text-xl uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,87,34,0.3)] border border-[#FF5722]/50 hover:bg-slate-900 hover:text-white hover:border-slate-900"
                    >
                        ÜCRETSİZ BAŞLA
                    </button>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="px-6 py-12 border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Monitor size={16} className="text-[#FF5722]" />
                        <span className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Döner Akış © 2026</span>
                    </div>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <span className="hover:text-slate-900 transition-colors cursor-pointer">Gizlilik</span>
                        <span className="hover:text-slate-900 transition-colors cursor-pointer">Koşullar</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
