import React from 'react';
import useStore from '../../store/useStore';
import { Pencil, Trash2, PowerOff, Power } from 'lucide-react';

export default function ProductList() {
    const { products, categories, updateProduct, deleteProduct } = useStore();

    const handleToggleAvailable = (product) => {
        updateProduct(product.id, { available: !product.available });
    };

    const handleDelete = (id) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            deleteProduct(id);
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            {categories.map((category) => {
                const catProducts = products.filter(p => p.categoryId === category.id);
                if (catProducts.length === 0) return null;

                return (
                    <div key={category.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h3 className="text-xl font-bold mb-4 px-2 text-amber-500 border-b border-white/10 pb-2">
                            {category.name}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                            {catProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className={`relative flex flex-col bg-[#1f1f1f] rounded-lg overflow-hidden border transition-all ${product.available ? 'border-white/10' : 'border-red-900/50 opacity-70 grayscale'
                                        }`}
                                >
                                    {/* Image Thumbnail */}
                                    <div className="h-32 w-full bg-black/50 relative">
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-white/20">Görsel Yok</div>
                                        )}

                                        {/* Badges */}
                                        <div className="absolute top-2 left-2 flex gap-1 flex-col">
                                            {product.isChefPick && <span className="text-xs bg-amber-500 text-black px-2 py-0.5 rounded font-bold">Şefin Seçimi</span>}
                                            {product.isHot && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">Sıcak Badge</span>}
                                        </div>

                                        {!product.available && (
                                            <div className="absolute inset-0 bg-red-900/30 flex items-center justify-center backdrop-blur-[1px]">
                                                <span className="bg-red-600 text-white font-bold px-3 py-1 rounded text-sm transform -rotate-12 border border-red-400">TÜKENDİ</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-lg leading-tight truncate pr-2" title={product.name}>{product.name}</h4>
                                                <span className="text-amber-500 font-bold whitespace-nowrap">{product.price} ₺</span>
                                            </div>
                                            <p className="text-xs text-gray-400 line-clamp-2" title={product.description}>{product.description || 'Açıklama yok'}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5">
                                            <button
                                                onClick={() => handleToggleAvailable(product)}
                                                className={`text-xs flex items-center gap-1 font-medium px-2 py-1.5 rounded transition-colors ${product.available
                                                        ? 'bg-red-900/20 text-red-500 hover:bg-red-900/40'
                                                        : 'bg-green-900/20 text-green-500 hover:bg-green-900/40'
                                                    }`}
                                            >
                                                {product.available ? <><PowerOff size={14} /> Tükendi Yap</> : <><Power size={14} /> Satışta Yap</>}
                                            </button>

                                            <div className="flex gap-2">
                                                {/* We will route edit to form in a fully realized app. For now we just implement Delete */}
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={16} />
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
