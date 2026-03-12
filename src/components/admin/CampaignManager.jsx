import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Clock, Percent, Megaphone, Power, PowerOff, Sparkles, X } from 'lucide-react';

export default function CampaignManager() {
    const { campaigns, categories, addCampaign, deleteCampaign, updateCampaign } = useStore();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        discountPercent: 10,
        startHour: '12:00',
        endHour: '14:00',
        targetCategory: null, 
        active: true
    });

    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) return;

        addCampaign({
            ...formData,
            id: uuidv4(),
            discountPercent: Number(formData.discountPercent)
        });

        setFormData({
            title: '',
            description: '',
            discountPercent: 10,
            startHour: '12:00',
            endHour: '14:00',
            targetCategory: null,
            active: true
        });
        setIsFormOpen(false);
    };

    const handleToggleActive = (campaign) => {
        updateCampaign(campaign.id, { active: !campaign.active });
    };

    const handleDelete = (id) => {
        if (window.confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) {
            deleteCampaign(id);
        }
    };

    return (
        <div className="flex flex-col gap-10 pb-20">

            {/* Header / New Campaign Bar */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                <div className="flex-1">
                    <h2 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-4">
                        <Sparkles className="text-amber-500" size={32} /> 
                        Otomatik Kampanyalar
                    </h2>
                    <p className="text-slate-500 max-w-xl text-sm leading-relaxed font-medium">
                        Zamanlanmış kampanyalar müşteri ekranında (TV) otomatik olarak devreye girer. 
                        İndirimli fiyatlar anlık olarak hesaplanır ve yayınlanır.
                    </p>
                </div>
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-amber-500 text-black rounded-2xl font-bold shadow-xl shadow-amber-500/10 hover:bg-amber-400 transition-all text-lg"
                >
                    <Plus size={24} /> Yeni Kampanya Oluştur
                </button>
            </div>

            {/* List Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-4 px-2">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Aktif & Planlanan Kampanyalar</h3>
                    <div className="h-px flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {campaigns.length === 0 ? (
                        <div className="col-span-full h-64 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 bg-white">
                             <Megaphone size={48} className="mb-4 opacity-20" />
                             <p className="font-bold italic uppercase tracking-widest text-xs">Henüz tanımlanmış bir kampanya bulunmuyor.</p>
                        </div>
                    ) : (
                        campaigns.map(campaign => {
                            const targetName = campaign.targetCategory
                                ? categories.find(c => c.id === campaign.targetCategory)?.name
                                : 'Tüm Ürünler';

                            return (
                                <div
                                    key={campaign.id}
                                    className={`group bg-white border-2 rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 hover:shadow-xl ${
                                        campaign.active ? 'border-amber-500/20 shadow-sm' : 'border-slate-100 opacity-60 grayscale-[0.8]'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-black text-2xl text-slate-800 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{campaign.title}</h4>
                                                {campaign.active && (
                                                    <span className="animate-pulse flex h-2 w-2 rounded-full bg-green-500"></span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed font-medium italic">{campaign.description || 'Açıklama belirtilmemiş'}</p>
                                        </div>
                                        <div className="bg-amber-500/10 text-amber-600 px-4 py-2 rounded-2xl font-black text-xl border border-amber-500/20">
                                            %{campaign.discountPercent}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                                            <Clock size={18} className="text-amber-500/50" />
                                            <div>
                                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Zaman Aralığı</div>
                                                <div className="text-sm font-black text-slate-800">{campaign.startHour} - {campaign.endHour}</div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                                            <Megaphone size={18} className="text-amber-500/50" />
                                            <div>
                                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Kapsam</div>
                                                <div className="text-sm font-black text-slate-800">{targetName}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                        <button
                                            onClick={() => handleToggleActive(campaign)}
                                            className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                                                campaign.active
                                                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                            }`}
                                        >
                                            {campaign.active ? <><PowerOff size={14} /> Durdur</> : <><Power size={14} /> Aktifleştir</>}
                                        </button>

                                        <button
                                            onClick={() => handleDelete(campaign.id)}
                                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all ml-4"
                                            title="Kampanyayı Sil"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Campaign Creation Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsFormOpen(false)}></div>
                    <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
                        <button 
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600">
                                <Megaphone size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800">Yeni Kampanya</h3>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">TV ekranınız için yeni bir fırsat planlayın.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Kampanya Adı *</label>
                                <input
                                    type="text" required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all placeholder:text-slate-300 font-bold"
                                    placeholder="Örn: Öğle Menüsü Fırsatı"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Açıklama</label>
                                <textarea
                                    rows="2"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all resize-none placeholder:text-slate-300 font-medium"
                                    placeholder="Müşteri ekranında görünecek kısa metin..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">İndirim Oranı (%) *</label>
                                    <div className="relative">
                                        <Percent size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="number" required min="1" max="99"
                                            value={formData.discountPercent}
                                            onChange={e => setFormData({ ...formData, discountPercent: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-mono font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Kapsam</label>
                                    <select
                                        value={formData.targetCategory || ''}
                                        onChange={e => setFormData({ ...formData, targetCategory: e.target.value === '' ? null : e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all appearance-none cursor-pointer font-bold"
                                    >
                                        <option value="" className="bg-white">Tüm Ürünler</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id} className="bg-white">Sadece {c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Başlangıç Saati</label>
                                    <input
                                        type="time" required
                                        value={formData.startHour}
                                        onChange={e => setFormData({ ...formData, startHour: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-mono appearance-none font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 ml-1 uppercase tracking-widest">Bitiş Saati</label>
                                    <input
                                        type="time" required
                                        value={formData.endHour}
                                        onChange={e => setFormData({ ...formData, endHour: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-mono appearance-none font-bold"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-4 rounded-2xl shadow-xl shadow-amber-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-lg mt-4"
                            >
                                <Percent size={24} /> Kampanyayı Yayınla
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

