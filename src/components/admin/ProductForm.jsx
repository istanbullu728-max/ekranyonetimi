import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { Upload, Plus, AlertCircle, ShoppingBag, X } from 'lucide-react';

export default function ProductForm({ onSuccess }) {
    const { categories, addProduct } = useStore();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: categories[0]?.id || '',
        image: '',
        available: true,
        isChefPick: false,
        isHot: false
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Dosya boyutu 2MB'dan küçük olmalıdır.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

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
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                    <ShoppingBag size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Yeni Ürün Ekle</h3>
                    <p className="text-gray-500 text-sm">Ürün detaylarını doldurup TV'ye yansıtın.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Ürün Adı *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-gray-700"
                        placeholder="Örn: Et Döner Dürüm"
                    />
                </div>

                {/* Category & Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Kategori *</label>
                        <select
                            required
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none cursor-pointer"
                        >
                            {categories.map(c => (
                                <option key={c.id} value={c.id} className="bg-[#18181b]">{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Fiyat (₺) *</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₺</span>
                            <input
                                type="number"
                                required
                                min="0" 
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-gray-700 font-mono"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Açıklama</label>
                    <textarea
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none placeholder:text-gray-700"
                        placeholder="İsteğe bağlı kısa açıklama..."
                    ></textarea>
                </div>

                {/* Toggles Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={formData.isChefPick}
                                onChange={(e) => setFormData({ ...formData, isChefPick: e.target.checked })}
                                className="sr-only"
                            />
                            <div className={`w-10 h-6 rounded-full transition-colors ${formData.isChefPick ? 'bg-amber-500' : 'bg-gray-700'}`}></div>
                            <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.isChefPick ? 'translate-x-4' : ''}`}></div>
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Şefin Seçimi</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={formData.isHot}
                                onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                                className="sr-only"
                            />
                            <div className={`w-10 h-6 rounded-full transition-colors ${formData.isHot ? 'bg-red-500' : 'bg-gray-700'}`}></div>
                            <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.isHot ? 'translate-x-4' : ''}`}></div>
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Sıcak & Taze</span>
                    </label>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Ürün Görseli</label>
                    <div className="relative border-2 border-dashed border-white/10 rounded-3xl overflow-hidden group hover:border-amber-500/30 transition-all bg-white/5 aspect-video flex flex-col items-center justify-center">
                        {formData.image ? (
                            <div className="relative w-full h-full">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, image: ''})}
                                        className="p-3 bg-red-500 rounded-full text-white shadow-xl hover:scale-110 transition-transform"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <Upload className="w-12 h-12 text-gray-600 mb-4 mx-auto group-hover:text-amber-500 group-hover:scale-110 transition-all" />
                                <p className="text-sm text-gray-400">Görsel seçmek için tıklayın</p>
                                <p className="text-xs text-gray-600 mt-2">Max 2MB, JPG/PNG</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${formData.image ? 'hidden' : ''}`}
                        />
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 flex gap-4">
                    <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-500/70 leading-relaxed">
                        Ürün eklendiği anda TV simülasyonunda ve mağaza ekranlarında canlı olarak güncellenecektir.
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-2xl shadow-xl shadow-amber-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                >
                    <Plus size={24} />
                    Kaydet ve Yayınla
                </button>
            </form>
        </div>
    );
}
