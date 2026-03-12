import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Smartphone, Zap, CheckCircle, ArrowRight, Menu, X, Play, LogIn, ChevronRight, LayoutDashboard, Clock, PenTool, AlertTriangle, ScreenShare, Code, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-[#FF5722]/30 selection:text-[#FF5722] overflow-x-hidden">
            
            {/* Legal Compliance Banner */}
            <div className="bg-[#FF5722] text-black w-full py-2.5 px-4 text-center text-xs md:text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3">
                <AlertTriangle size={16} className="animate-pulse" />
                <span className="hidden sm:inline">📢 Yeni Yönetmeliğe %100 Uyum:</span> Kapıda ve Masada Fiyat Listesi Bulundurma Zorunluluğuna Dijital Çözüm!
            </div>

            {/* Navigation */}
            <nav className="fixed top-[44px] sm:top-[44px] left-0 right-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 bg-[#FF5722] rounded-xl flex items-center justify-center text-black shadow-lg shadow-[#FF5722]/20 group-hover:rotate-6 transition-transform">
                            <Monitor size={20} className="font-bold" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase">Döner Akış <span className="text-[#FF5722]">.</span></span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        <a href="#features" className="text-sm font-black uppercase tracking-widest text-[#a1a1aa] hover:text-white transition-colors">Özellikler</a>
                        <a href="#how-it-works" className="text-sm font-black uppercase tracking-widest text-[#a1a1aa] hover:text-white transition-colors">Nasıl Çalışır</a>
                        <div className="h-6 w-px bg-white/10"></div>
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-sm font-black uppercase tracking-widest text-white hover:bg-white/5 px-6 py-2.5 rounded-xl transition-all flex items-center gap-2"
                        >
                            <LogIn size={18} />
                            Giriş Yap
                        </button>
                        <button 
                            onClick={() => navigate('/admin')}
                            className="bg-[#FF5722] text-black px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#e64a19] transition-all shadow-[0_0_20px_rgba(255,87,34,0.3)] flex items-center gap-2"
                        >
                            Hemen Başla
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white">
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
                            className="md:hidden absolute top-20 left-0 right-0 bg-[#161618] border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl"
                        >
                            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-4 bg-white/5 rounded-2xl text-white">Özellikler</a>
                            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-4 bg-white/5 rounded-2xl text-white">Nasıl Çalışır</a>
                            <button 
                                onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
                                className="w-full bg-white/5 p-4 rounded-2xl font-black uppercase tracking-widest text-left text-white"
                            >
                                Giriş Yap
                            </button>
                            <button 
                                onClick={() => { setIsMenuOpen(false); navigate('/admin'); }}
                                className="w-full bg-[#FF5722] p-4 rounded-2xl font-black text-black uppercase tracking-widest"
                            >
                                Hemen Başla
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-10 relative">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 px-5 py-2 border border-white/10 bg-white/5 backdrop-blur-md rounded-full flex items-center gap-2"
                    >
                        <ShieldCheck size={14} className="text-[#FF5722]" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#a1a1aa]">1 Ocak 2024 Yönetmeliğine Uygundur</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] max-w-5xl mb-8 uppercase"
                    >
                        Özel Cihaz Yok. <br/>
                        Kablo Yok. <br/>
                        <span className="text-[#FF5722]">Karmaşa Yok.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-[#a1a1aa] font-medium max-w-3xl mb-12 leading-relaxed"
                    >
                        Mevcut herhangi bir ekranınızı saniyeler içinde <strong className="text-white">Akıllı Menüye</strong> dönüştürün. Yasal zorunlulukları tek tıkla halledin, tasarımla uğraşmayın.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
                    >
                        <button 
                            onClick={() => navigate('/admin')}
                            className="w-full sm:w-auto px-12 py-6 bg-[#FF5722] text-black rounded-[2rem] font-black text-base sm:text-lg uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,87,34,0.4)] flex items-center justify-center gap-3 group"
                        >
                            Ücretsiz Başla ve Yasaya Uyum Sağla
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.5 }}
                        className="mt-12 text-[#a1a1aa] font-black uppercase tracking-[0.2em] text-xs flex flex-col sm:flex-row gap-4 sm:gap-8 opacity-60"
                    >
                        <span>Kurulum Ücreti Yok</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Teknik Bilgi Gerekmez</span>
                        <span className="hidden sm:inline">•</span>
                        <span>14 Gün Ücretsiz</span>
                    </motion.div>
                </div>

                {/* Hero Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full max-w-[1000px] pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF5722]/20 blur-[150px] rounded-full mix-blend-screen mix-blend-screen"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-screen"></div>
                </div>
            </section>

            {/* Legal Shield Card Section */}
            <section className="px-6 py-12 -mt-10 relative z-20">
                <div className="max-w-6xl mx-auto">
                     <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-[#161618] border border-white/10 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl backdrop-blur-md relative overflow-hidden group"
                     >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/5 blur-[80px] rounded-full group-hover:bg-[#FF5722]/10 transition-colors"></div>
                        <div className="w-24 h-24 bg-white/5 hidden md:flex rounded-3xl border border-white/10 items-center justify-center shrink-0">
                            <ShieldCheck size={48} className="text-[#FF5722]" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Resmi Gazete Uyumlu.</h2>
                            <p className="text-[#a1a1aa] text-lg font-medium leading-relaxed">
                                Kapıda ve masada fiyat listesi bulundurma yönetmeliği için kusursuz çözüm. Denetimlerden tam not alın. Yeni yasaya uygun fiyat listeleme sistemini hemen kurun, <strong className="text-white">ceza riskini ortadan kaldırın.</strong>
                            </p>
                        </div>
                     </motion.div>
                </div>
            </section>

            {/* Hardware Agnostic Section */}
            <section id="features" className="py-24 px-6 relative">
                 <div className="max-w-7xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 drop-shadow-lg">
                        Sınırları Kaldırın. <br/><span className="text-[#a1a1aa]">Donanıma Bağlı Kalmayın.</span>
                    </h2>
                    <p className="text-xl text-[#a1a1aa] max-w-3xl mx-auto font-medium">
                        Marka veya model fark etmez. Tarayıcısı olan her ekran artık sizin profesyonel vitrininiz.
                    </p>
                 </div>

                 <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                         { icon: Monitor, title: "Smart TV", desc: "Samsung, LG, Philips veya herhangi bir akıllı televizyon." },
                         { icon: ScreenShare, title: "Android Box", desc: "Sıradan bir monitörü veya eski TV'yi anında akıllandırın." },
                         { icon: Smartphone, title: "Tablet", desc: "Masaüstü, kasa yanı veya kapı girişi bilgilendirme ekranları." },
                         { icon: Code, title: "Eski Laptop", desc: "Arka odada duran eski cihazınızı, kusursuz bir menü sunucusuna dönüştürün." },
                     ].map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#161618] border border-white/5 rounded-3xl p-8 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer"
                          >
                            <item.icon size={32} className="text-[#FF5722] mb-6" />
                            <h3 className="text-xl font-black uppercase tracking-widest mb-3">{item.title}</h3>
                            <p className="text-[#a1a1aa] text-sm font-medium leading-relaxed">{item.desc}</p>
                          </motion.div>
                     ))}
                 </div>
            </section>

            {/* Smart Auto Slide Highlight */}
            <section className="py-24 px-6 relative bg-gradient-to-b from-transparent to-[#161618]/50">
                 <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                     <div className="flex-1 md:pr-12">
                         <div className="w-16 h-16 bg-[#FF5722]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#FF5722]/20">
                             <Menu size={32} className="text-[#FF5722]" />
                         </div>
                         <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
                             Akıllı <br/>Sayfalama 
                         </h2>
                         <p className="text-[#a1a1aa] text-lg font-medium leading-relaxed mb-8">
                            Ürünleriniz ekrana sığmazsa diye dert etmeyin. Algoritmamız menünüzü kategori bazlı otomatik böler ve belirlediğiniz sürelerde (örn: 8 saniye) şık, profesyonel geçişlerle müşterilerinize sunar.
                         </p>
                         <button onClick={() => navigate('/display')} className="text-[#FF5722] font-black uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-4 transition-all group">
                             Canlı Demoyu Görüntüle <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                         </button>
                     </div>
                     <div className="flex-1 w-full relative">
                         {/* Abstract UI Representation */}
                         <div className="bg-[#0a0a0b] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden aspect-video mockup-container">
                              <div className="h-4 w-24 bg-[#FF5722] rounded-full mb-6"></div>
                              <div className="space-y-4">
                                  <div className="flex justify-between items-center"><div className="w-1/2 h-3 bg-white/20 rounded-full"></div><div className="w-10 h-4 bg-[#FF5722]/50 rounded-full"></div></div>
                                  <div className="flex justify-between items-center"><div className="w-2/3 h-3 bg-white/20 rounded-full"></div><div className="w-12 h-4 bg-[#FF5722]/50 rounded-full"></div></div>
                                  <div className="flex justify-between items-center"><div className="w-1/3 h-3 bg-white/20 rounded-full"></div><div className="w-8 h-4 bg-[#FF5722]/50 rounded-full"></div></div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                                  <motion.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="h-full bg-[#FF5722]"
                                  ></motion.div>
                              </div>
                         </div>
                     </div>
                 </div>
            </section>

            {/* 3 Step Setup Section */}
            <section id="how-it-works" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">Aylarca Değil, <span className="text-[#FF5722]">Dakikalar İçinde</span> Sahnede.</h2>
                        <p className="text-[#a1a1aa] text-lg font-medium">3 adımlık sihirli kurulum ile IT ekibine ihtiyacınız yok.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                        {[
                            { step: "1", title: "Listeni Oluştur", desc: "Ürün isimlerini ve fiyatlarını admin panelinden hızlıca girin. Saniyeler sürer." },
                            { step: "2", title: "Kodu Eşleştir", desc: "TV tarayıcınızdan verilen adrese girip, ekranda çıkan 4 haneli kodu tanımlayın." },
                            { step: "3", title: "Yasalara Uyum Sağla", desc: "Tek tıkla yayına alın, vitrindeki QR menünüz ve TV ekranınız anında senkronize olsun." }
                        ].map((item, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative flex flex-col items-center text-center"
                             >
                                 <div className="w-20 h-20 bg-[#161618] border border-[#FF5722]/30 rounded-full flex items-center justify-center text-3xl font-black text-[#FF5722] shadow-[0_0_30px_rgba(255,87,34,0.15)] mb-8 z-10">
                                     {item.step}
                                 </div>
                                 <h3 className="text-2xl font-black uppercase tracking-widest mb-4">{item.title}</h3>
                                 <p className="text-[#a1a1aa] leading-relaxed font-medium">{item.desc}</p>
                             </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Full Width */}
            <section className="px-6 py-20 pb-40">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-[#161618] border border-[#FF5722]/20 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5722]/10 blur-[100px] rounded-full group-hover:bg-[#FF5722]/20 transition-colors duration-1000"></div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase leading-[1.1] relative z-10">
                        Hâlâ Denetimden Mi <span className="text-[#FF5722]">Korkuyorsunuz?</span>
                    </h2>
                    <p className="text-[#a1a1aa] text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10 drop-shadow-md">
                        Ceza riskini ortadan kaldırın. Satışlarınızı premium bir görünümle artırın. Bugün ÜCRETSİZ başlayın.
                    </p>
                    
                    <div className="flex flex-col items-center gap-6 relative z-10">
                        <button 
                            onClick={() => navigate('/admin')}
                            className="w-full sm:w-auto px-12 py-6 bg-[#FF5722] text-black rounded-[2rem] font-black text-lg sm:text-xl uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,87,34,0.3)]"
                        >
                            Hemen Ücretsiz Başla ve Yönetmeliğe Uyum Sağla
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-white/5 bg-[#0a0a0b]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2">
                             <Monitor size={16} className="text-[#FF5722]" />
                             <span className="font-black text-sm uppercase tracking-tighter text-white">Döner Akış © 2026</span>
                        </div>
                        <span className="text-[#a1a1aa] text-[10px] font-bold tracking-widest uppercase">Dijital Menü Yönetim Sistemleri</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-[#a1a1aa]">
                        <a href="#" className="hover:text-white transition-colors">Yönetmelik Detayları</a>
                        <a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a>
                        <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
                        <button onClick={() => navigate('/login')} className="hover:text-[#FF5722] transition-colors">Giriş Yap</button>
                    </div>
                </div>
            </footer>

            <style>{`
                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    );
}
