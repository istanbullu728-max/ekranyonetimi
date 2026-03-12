import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { Pencil, Trash2, PowerOff, Power, Check, X, Tag, Plus } from 'lucide-react';

export default function ProductList({ onAddProductToCategory }) {
    const { products, categories, updateProduct, deleteProduct, settings, setIsTextCurved } = useStore();
    const [editingPriceId, setEditingPriceId] = useState(null);
    const [tempPrice, setTempPrice] = useState('');

    const handleToggleAvailable = (product) => {
        updateProduct(product.id, { available: !product.available });
    };

    const handleDelete = (id) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            deleteProduct(id);
        }
    };

    const startEditingPrice = (product) => {
        setEditingPriceId(product.id);
        setTempPrice(product.price.toString());
    };

    const savePrice = (id) => {
        const newPrice = Number(tempPrice);
        if (!isNaN(newPrice) && newPrice >= 0) {
            updateProduct(id, { price: newPrice });
        }
        setEditingPriceId(null);
    };

    return (
        <div className="flex flex-col gap-12 pb-20 pt-4">
            {/* Global Settings Toggle */}
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-3xl"></div>
                <div className="flex gap-4 items-center text-slate-700">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-100 group-hover:scale-105 transition-transform">
                        <Tag size={24} />
                    </div>
                    <div>
                         <h4 className="font-bold text-lg text-slate-800">Yazıyı Kavisli Yap (TV Görünümü)</h4>
                         <p className="text-sm text-slate-400">Görsellerin etrafından metinlerin kavisli akmasını sağlar.</p>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings?.isTextCurved || false}
                        onChange={(e) => setIsTextCurved(e.target.checked)} 
                    />
                    <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
            </div>

            {categories.map((category) => {
                const catProducts = products.filter(p => p.categoryId === category.id);
                // Even if length is 0, we still want to show the category block now so we can add to it.

                return (
                    <div key={category.id} className="space-y-4">
                        <div className="flex items-center gap-4 px-2">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                                {category.name}
                            </h3>
                            <div className="h-px flex-1 bg-slate-200"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 py-1.5 px-4 rounded-full border border-slate-200">
                                {catProducts.length} Ürün
                            </span>
                        </div>

                        {catProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {catProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className={`group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border-2 transition-all duration-500 hover:shadow-xl ${
                                            product.available 
                                            ? 'border-slate-100 hover:border-amber-500/30' 
                                            : 'border-red-100 grayscale-[0.5]'
                                        }`}
                                    >
                                        {/* Content Section */}
                                        <div className="p-6 flex-1 flex flex-col justify-between gap-4 z-20 relative">
                                            {/* Status & Sold Out Info */}
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-2">
                                                    {product.isChefPick && (
                                                        <span className="text-[9px] bg-amber-500 text-black px-3 py-1.5 rounded-full font-black uppercase tracking-tighter shadow-md">
                                                            Şefin Seçimi
                                                        </span>
                                                    )}
                                                    {product.isHot && (
                                                        <span className="text-[9px] bg-red-500 text-white px-3 py-1.5 rounded-full font-black uppercase tracking-tighter shadow-md">
                                                            Sıcak & Taze
                                                        </span>
                                                    )}
                                                    {!product.available && (
                                                        <span className="text-[9px] bg-red-50 text-red-500 border border-red-100 px-3 py-1.5 rounded-full font-black uppercase tracking-tighter">
                                                            TÜKENDİ
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-start gap-4 mb-1">
                                                    <h4 className="font-bold text-lg leading-tight text-slate-800 group-hover:text-amber-600 transition-colors">{product.name}</h4>
                                                    
                                                    {/* Price Edit Area */}
                                                    <div className="relative group/price min-w-[70px] flex justify-end">
                                                        {editingPriceId === product.id ? (
                                                            <div className="flex items-center gap-1 bg-slate-50 border border-amber-500 rounded-xl p-1 animate-in slide-in-from-right-2">
                                                                <input
                                                                    autoFocus
                                                                    type="number"
                                                                    value={tempPrice}
                                                                    onChange={(e) => setTempPrice(e.target.value)}
                                                                    onKeyDown={(e) => e.key === 'Enter' && savePrice(product.id)}
                                                                    className="w-14 bg-transparent text-slate-900 font-bold text-right outline-none px-1 text-xs font-mono"
                                                                />
                                                                <button onClick={() => savePrice(product.id)} className="text-green-600 hover:text-green-700">
                                                                    <Check size={14} />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button 
                                                                onClick={() => startEditingPrice(product)}
                                                                className="text-right group"
                                                            >
                                                                <div className="text-lg font-black text-amber-600 flex flex-col items-end">
                                                                    <span>{product.price} <span className="text-xs">₺</span></span>
                                                                    <span className="text-[8px] text-slate-400 font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Düzenle</span>
                                                                </div>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-400 line-clamp-2 italic leading-relaxed">{product.description || 'Açıklama belirtilmemiş'}</p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                <button
                                                    onClick={() => handleToggleAvailable(product)}
                                                    className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                                                        product.available
                                                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                    }`}
                                                >
                                                    {product.available ? <><PowerOff size={12} /> Tükendi Yap</> : <><Power size={12} /> Satışa Aç</>}
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all ml-2"
                                                    title="Ürünü Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Bu kategoride henüz ürün yok.</p>
                            </div>
                        )}

                        {/* Add Product To Category Button */}
                        <div className="flex justify-center mt-4 pb-4 border-b border-slate-100/50 last:border-0 pl-2">
                            <button
                                onClick={() => onAddProductToCategory(category.id)}
                                className="flex items-center gap-2 text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-6 py-3 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em]"
                            >
                                <Plus size={16} />
                                {category.name} Kategorisine Ürün Ekle
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
