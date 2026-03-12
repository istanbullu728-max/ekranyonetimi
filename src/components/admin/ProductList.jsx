import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { Pencil, Trash2, PowerOff, Power, Check, X, Tag } from 'lucide-react';

export default function ProductList() {
    const { products, categories, updateProduct, deleteProduct } = useStore();
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
        <div className="flex flex-col gap-12 pb-20">
            {categories.map((category) => {
                const catProducts = products.filter(p => p.categoryId === category.id);
                if (catProducts.length === 0) return null;

                return (
                    <div key={category.id} className="space-y-6">
                        <div className="flex items-center gap-4 px-2">
                            <h3 className="text-2xl font-bold text-white tracking-tight">
                                {category.name}
                            </h3>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/5">
                                {catProducts.length} Ürün
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {catProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className={`group relative flex flex-col bg-[#18181b] rounded-[2rem] overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-black/40 ${
                                        product.available 
                                        ? 'border-white/5 hover:border-amber-500/20' 
                                        : 'border-red-500/10 grayscale-[0.8]'
                                    }`}
                                >
                                    {/* Content Section */}
                                    <div className="p-6 flex-1 flex flex-col justify-between gap-4 z-20 relative">
                                        {/* Status & Sold Out Info */}
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-2">
                                                {product.isChefPick && (
                                                    <span className="text-[10px] bg-amber-500 text-black px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-xl">
                                                        Şefin Seçimi
                                                    </span>
                                                )}
                                                {product.isHot && (
                                                    <span className="text-[10px] bg-red-600 text-white px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-xl">
                                                        Sıcak & Taze
                                                    </span>
                                                )}
                                                {!product.available && (
                                                    <span className="text-[10px] bg-red-950 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-black uppercase tracking-tighter">
                                                        TÜKENDİ
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <h4 className="font-bold text-xl leading-tight text-white group-hover:text-amber-500 transition-colors">{product.name}</h4>
                                                
                                                {/* Price Edit Area */}
                                                <div className="relative group/price min-w-[80px] flex justify-end">
                                                    {editingPriceId === product.id ? (
                                                        <div className="flex items-center gap-1 bg-[#222] border border-amber-500/50 rounded-lg p-1 animate-in slide-in-from-right-2">
                                                            <input
                                                                autoFocus
                                                                type="number"
                                                                value={tempPrice}
                                                                onChange={(e) => setTempPrice(e.target.value)}
                                                                onKeyDown={(e) => e.key === 'Enter' && savePrice(product.id)}
                                                                className="w-16 bg-transparent text-white font-bold text-right outline-none px-1 text-sm font-mono"
                                                            />
                                                            <button onClick={() => savePrice(product.id)} className="text-green-500 hover:text-green-400">
                                                                <Check size={14} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => startEditingPrice(product)}
                                                            className="text-right group"
                                                        >
                                                            <div className="text-xl font-black text-amber-500 flex flex-col items-end">
                                                                <span>{product.price} <span className="text-sm">₺</span></span>
                                                                <span className="text-[9px] text-gray-600 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Değiştir</span>
                                                            </div>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2 italic leading-relaxed">{product.description || 'Açıklama belirtilmemiş'}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <button
                                                onClick={() => handleToggleAvailable(product)}
                                                className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                                                    product.available
                                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                    : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                                }`}
                                            >
                                                {product.available ? <><PowerOff size={14} /> Tükendi</> : <><Power size={14} /> Satışta</>}
                                            </button>

                                            <div className="flex gap-2 ml-3">
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                    title="Ürünü Sil"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
