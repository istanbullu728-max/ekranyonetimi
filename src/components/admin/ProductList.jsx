import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { Pencil, Trash2, PowerOff, Power, Check, X, Tag, Plus, FolderPlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function ProductList({ onAddProductToCategory }) {
    const { products, categories, updateProduct, deleteProduct, addCategory } = useStore();
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

    const handleAddCategory = () => {
        const catName = window.prompt("Yeni kategori adını girin (Örn: Tatlılar):");
        if (catName && catName.trim()) {
            addCategory({
                id: uuidv4(),
                name: catName.trim()
            });
        }
    };

    return (
        <div className="flex flex-col gap-12 pb-20">
            {/* Header / Add Category */}
            <div className="flex justify-end pr-4">
                <button 
                    onClick={handleAddCategory}
                    className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors font-bold text-xs uppercase tracking-widest shadow-md"
                >
                    <FolderPlus size={18} />
                    Kategori Ekle
                </button>
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
