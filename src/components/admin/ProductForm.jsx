import React, { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { Plus, AlertCircle, ShoppingBag } from 'lucide-react';

export default function ProductForm({ onSuccess, initialCategoryId = null }) {
    const { categories, addProduct } = useStore();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: initialCategoryId || (categories[0]?.id || ''),
        available: true,
        isChefPick: false,
        isHot: false
    });

    // Update categoryId if initialCategoryId prop changes
    useEffect(() => {
        if (initialCategoryId) {
            setFormData(prev => ({ ...prev, categoryId: initialCategoryId }));
        }
    }, [initialCategoryId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.categoryId) return;

        addProduct({
            ...formData,
            id: uuidv4(),
            price: Number(formData.price)
        });

        if (onSuccess) onSuccess();
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600">
                    <ShoppingBag size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-slate-800">Yeni Ürün Ekle</h3>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-tighter">Ürün detaylarını doldurup TV'ye yansıtın.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Ürün Adı *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all placeholder:text-slate-300 font-bold"
                        placeholder="Örn: Et Döner Dürüm"
                    />
                </div>

                {/* Category & Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Kategori *</label>
                        <select
                            required
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all appearance-none cursor-pointer font-bold"
                        >
                            <option value="" disabled>Kategori Seçin</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id} className="bg-white">{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Fiyat (₺) *</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₺</span>
                            <input
                                type="number"
                                required
                                min="0" 
                                step="1"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all placeholder:text-slate-300 font-mono font-bold"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Açıklama</label>
                    <textarea
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all resize-none placeholder:text-slate-300 font-medium"
                        placeholder="İsteğe bağlı kısa açıklama..."
                    ></textarea>
                </div>

                {/* Toggles Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={formData.isChefPick}
                                onChange={(e) => setFormData({ ...formData, isChefPick: e.target.checked })}
                                className="sr-only"
                            />
                            <div className={`w-10 h-6 rounded-full transition-colors ${formData.isChefPick ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                            <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.isChefPick ? 'translate-x-4' : ''}`}></div>
                        </div>
                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Şefin Seçimi</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={formData.isHot}
                                onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                                className="sr-only"
                            />
                            <div className={`w-10 h-6 rounded-full transition-colors ${formData.isHot ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                            <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.isHot ? 'translate-x-4' : ''}`}></div>
                        </div>
                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Sıcak & Taze</span>
                    </label>
                </div>

                {/* Info Box */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-4">
                    <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-700/70 font-bold uppercase tracking-tighter leading-relaxed">
                        Ürün eklendiği anda TV simülasyonunda ve mağaza ekranlarında canlı olarak güncellenecektir.
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                >
                    <Plus size={20} />
                    Kaydet ve Yayınla
                </button>
            </form>
        </div>
    );
}
