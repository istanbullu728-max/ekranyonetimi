import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, KeyRound, User } from 'lucide-react';

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
        <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full"></div>

                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4 border border-amber-500/20">
                            <KeyRound className="text-amber-500" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Girişi</h1>
                        <p className="text-gray-400 mt-2 text-center text-sm">
                            Yönetim paneline erişmek için giriş yapın
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Kullanıcı Adı</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-sans"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Şifre</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-sans"
                                    placeholder="••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2"
                        >
                            <LogIn size={20} />
                            <span>Giriş Yap</span>
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full text-gray-500 hover:text-gray-300 text-sm transition-colors"
                        >
                            ← Ana Ekrana Dön
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Simple Lock icon replacement since I missed importing it initially if I use lucide
import { Lock } from 'lucide-react';
