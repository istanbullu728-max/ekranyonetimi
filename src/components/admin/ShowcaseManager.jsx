import React from 'react';
import useStore from '../../store/useStore';
import { Upload, X, ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

export default function ShowcaseManager() {
    const { showcaseImages, updateShowcaseImage } = useStore();

    const handleImageUpload = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Dosya boyutu 2MB'dan küçük olmalıdır.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                updateShowcaseImage(id, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-10 pb-20">
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-black text-white mb-3 flex items-center justify-center md:justify-start gap-4">
                        <Sparkles className="text-amber-500" size={32} /> 
                        Vitrin Görselleri
                    </h2>
                    <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
                        TV ekranının sağ tarafında (%30) dönecek olan 3 ana görseli buradan yönetin. 
                        Yüklediğiniz görseller anında canlı yayına geçer.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-3xl border border-white/5">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Canlı Senkronizasyon Aktif</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {showcaseImages.map((img, index) => (
                    <div key={img.id} className="group flex flex-col gap-4">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-xs font-black text-gray-600 uppercase tracking-[0.2em]">{index + 1}. Görsel</span>
                            <div className="h-[1px] flex-1 bg-white/5 mx-4"></div>
                        </div>
                        
                        <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-dashed border-white/10 bg-[#262626] hover:border-amber-500/30 transition-all group/box shadow-2xl">
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
                                    <ImageIcon className="w-16 h-16 text-gray-700 mb-4 group-hover/box:text-amber-500 transition-colors" />
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Görsel Yükle</p>
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
            </div>

            <div className="bg-[#262626] border border-white/5 rounded-3xl p-6 flex gap-4 items-start">
                <AlertCircle size={24} className="text-amber-500 shrink-0" />
                <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-300">Önemli Tavsiye</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        En iyi görünüm için dikey (9:16 veya 3:4) formatta, yüksek kaliteli ve iştah açıcı görseller tercih edin. 
                        TV ekranı saniyeler içinde otomatik olarak güncellenecektir.
                    </p>
                </div>
            </div>
        </div>
    );
}
