import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { Upload, Plus, AlertCircle } from 'lucide-react';

export default function ProductForm() {
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

        // Reset form
        setFormData({
            name: '',
            description: '',
            price: '',
            categoryId: formData.categoryId, // Keep last selected category
            image: '',
            available: true,
            isChefPick: false,
            isHot: false
        });
    };

    return (
        <div className="bg-[#1f1f1f] border border-white/10 rounded-xl p-6 sticky top-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="text-amber-500" />
                Yeni Ürün Ekle
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Ürün Adı *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="Örn: Et Döner Dürüm"
                    />
                </div>

                {/* Category & Price Row */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Kategori *</label>
                        <select
                            required
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Fiyat (₺) *</label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Açıklama</label>
                    <textarea
                        rows="2"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                        placeholder="İsteğe bağlı kısa açıklama..."
                    ></textarea>
                </div>

                {/* Details Toggles */}
                <div className="flex flex-col gap-3 py-3 border-y border-white/5">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Ana Ekranda Büyük Göster (Şefin Seçimi)</span>
                        <input
                            type="checkbox"
                            checked={formData.isChefPick}
                            onChange={(e) => setFormData({ ...formData, isChefPick: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-black/50"
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">"Sıcak ve Taze" Rozeti Ekle</span>
                        <input
                            type="checkbox"
                            checked={formData.isHot}
                            onChange={(e) => setFormData({ ...formData, isHot: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-black/50"
                        />
                    </label>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Ürün Görseli</label>

                    <div className="relative border-2 border-dashed border-white/20 rounded-xl overflow-hidden group hover:border-amber-500/50 transition-colors bg-black/30">
                        {formData.image ? (
                            <div className="relative w-full h-40">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm font-medium flex items-center gap-2">
                                        <Upload size={16} /> Resmi Değiştir
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                                <Upload className="w-8 h-8 text-gray-500 mb-2 group-hover:text-amber-500 transition-colors" />
                                <p className="text-sm text-gray-400 mb-1">Görsel yüklemek için tıklayın</p>
                                <p className="text-xs text-gray-600">Max 2MB, JPG/PNG</p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Warning about real-time sync */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex gap-3 text-amber-500/80 mt-2">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed">
                        Eklediğiniz ürün anında müşteri ekranlarına (TV) yansıyacaktır. Lütfen görsel kalitesine dikkat ediniz.
                    </p>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold py-3 rounded-lg shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98] mt-2"
                >
                    Ürünü Ekle ve Yansıt
                </button>

            </form>
        </div>
    );
}
