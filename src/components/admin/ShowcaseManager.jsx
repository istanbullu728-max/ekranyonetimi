import React from 'react';
import useStore from '../../store/useStore';
import { Upload, X, ImageIcon, Sparkles, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function ShowcaseManager() {
    const { showcaseImages, updateShowcaseImage, addShowcaseImage, removeShowcaseImage } = useStore();

    const handleImageUpload = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Dosya boyutu 2MB'dan küçük olmalıdır.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                if (id) {
                    // Update existing
                    updateShowcaseImage(id, reader.result);
                } else {
                    // Add new
                    addShowcaseImage({
                        id: uuidv4(),
                        url: reader.result,
                        active: true
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Bu görseli vitrinden kaldırmak istediğinize emin misiniz?")) {
            removeShowcaseImage(id);
        }
    };

    return (
        <div className="flex flex-col gap-10 pb-20">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-black text-slate-800 mb-3 flex items-center justify-center md:justify-start gap-4">
                        <Sparkles className="text-amber-500" size={32} /> 
                        Vitrin Görselleri
                    </h2>
                    <p className="text-slate-500 max-w-xl text-sm leading-relaxed font-medium">
                        TV ekranının sağ tarafında (%30) dönecek olan görselleri buradan yönetin. 
                        İstediğiniz kadar görsel ekleyebilirsiniz. Eklediğiniz görseller anında canlı yayına geçer.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Canlı Senkronizasyon</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {showcaseImages.map((img, index) => (
                    <div key={img.id} className="group flex flex-col gap-4">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{index + 1}. Görsel</span>
                            <div className="h-[1px] flex-1 bg-slate-100 mx-4"></div>
                            <button 
                                onClick={() => handleDelete(img.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                title="Görseli Sil"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        
                        <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-slate-200 bg-slate-50 hover:border-amber-500/30 transition-all group/box shadow-sm">
                            {img.url ? (
                                <>
                                    <img src={img.url} alt={`Vitrin ${img.id}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/box:scale-110 opacity-80" />
                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/box:opacity-100 transition-opacity backdrop-blur-sm">
                                        <label className="p-4 bg-amber-500 rounded-full text-black cursor-pointer hover:scale-110 transition-transform shadow-xl mb-4">
                                            <Upload size={24} />
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                className="hidden" 
                                                onChange={(e) => handleImageUpload(img.id, e)} 
                                            />
                                        </label>
                                        <span className="text-xs font-black text-white uppercase tracking-widest">Görseli Değiştir</span>
                                    </div>
                                </>
                            ) : (
                                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                    <ImageIcon className="w-16 h-16 text-slate-200 mb-4 group-hover/box:text-amber-500 transition-colors" />
                                    <p className="text-xs text-slate-300 font-black uppercase tracking-widest">Görsel Seç</p>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={(e) => handleImageUpload(img.id, e)} 
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder Container */}
                <div className="group flex flex-col gap-4">
                    <div className="flex justify-between items-center px-2">
                        <span className="text-xs font-black text-amber-500 uppercase tracking-[0.2em]">Yeni Görsel</span>
                        <div className="h-[1px] flex-1 bg-slate-100 mx-4"></div>
                    </div>
                    
                    <label className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-dashed border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition-all cursor-pointer flex flex-col items-center justify-center group/add shadow-sm hover:border-amber-400">
                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mb-4 group-hover/add:scale-110 group-hover/add:bg-amber-500 group-hover/add:text-white transition-all shadow-sm">
                            <Plus size={32} />
                        </div>
                        <p className="text-xs text-amber-600 font-black uppercase tracking-widest">Görsel Ekle</p>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(null, e)} 
                        />
                    </label>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 flex gap-5 items-start">
                <AlertCircle size={24} className="text-amber-500 shrink-0" />
                <div className="space-y-1">
                    <p className="text-sm font-black text-amber-800 uppercase tracking-tight">Önemli Tavsiye</p>
                    <p className="text-xs text-amber-700/70 font-bold uppercase tracking-tighter leading-relaxed">
                        En iyi görünüm için dikey (9:16 veya 3:4) formatta, yüksek kaliteli ve iştah açıcı görseller tercih edin. 
                        TV ekranı saniyeler içinde otomatik olarak güncellenecektir. İstediğiniz kadar görsel ekleyebilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
}
