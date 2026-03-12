import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, KeyRound, User, Lock } from 'lucide-react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Simple hardcoded credentials as requested
        if (username === 'admin' && password === '1234') {
            localStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Geçersiz kullanıcı adı veya şifre.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 selection:bg-amber-100 selection:text-amber-900">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full"></div>

                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-20 h-20 bg-amber-500/10 rounded-[2rem] flex items-center justify-center mb-6 border border-amber-500/20 shadow-inner">
                            <KeyRound className="text-amber-600" size={40} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Admin Girişi</h1>
                        <p className="text-slate-400 mt-3 text-center text-sm font-bold uppercase tracking-widest">
                            Yönetim paneline erişmek için giriş yapın
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-[0.2em]">Kullanıcı Adı</label>
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-sans font-bold shadow-sm"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 ml-2 uppercase tracking-[0.2em]">Şifre</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-sans font-bold shadow-sm"
                                    placeholder="••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-5 rounded-[2rem] transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 active:scale-[0.98] mt-4 uppercase tracking-widest text-sm"
                        >
                            <LogIn size={20} />
                            <span>Sisteme Bağlan</span>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100">
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
                        >
                            ← Ana Sayfaya Dön
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
