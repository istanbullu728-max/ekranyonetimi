import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Clock, Percent } from 'lucide-react';

export default function CampaignManager() {
    const { campaigns, categories, addCampaign, deleteCampaign, updateCampaign } = useStore();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        discountPercent: 10,
        startHour: '12:00',
        endHour: '14:00',
        targetCategory: null, // null means all categories
        active: true
    });

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
        <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-10">

            {/* Header Info */}
            <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-6 text-amber-500/80">
                <h2 className="text-xl font-bold mb-2 text-amber-500">Otomatik Kampanya Yönetimi</h2>
                <p className="text-sm">
                    Buradan ayarladığınız kampanyalar, belirtilen saat aralıklarında müşteri ekranında otomatik olarak devreye girer ve fiyatları yüzde üzerinden indirir. Ekran sağ sütununda duyurusu döner.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Form Column */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1f1f1f] border border-white/10 rounded-xl p-6 sticky top-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Plus size={18} className="text-amber-500" /> Yeni Kampanya
                        </h3>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Kampanya Adı *</label>
                                <input
                                    type="text" required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                                    placeholder="Örn: Öğle Menüsü Fırsatı"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Açıklama</label>
                                <textarea
                                    rows="2"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                                    placeholder="Müşteri ekranında görünecek metin..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">İndirim Oranı (%) *</label>
                                <div className="relative">
                                    <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="number" required min="1" max="99"
                                        value={formData.discountPercent}
                                        onChange={e => setFormData({ ...formData, discountPercent: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Başlangıç Saati</label>
                                    <input
                                        type="time" required
                                        value={formData.startHour}
                                        onChange={e => setFormData({ ...formData, startHour: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 color-scheme-dark"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Bitiş Saati</label>
                                    <input
                                        type="time" required
                                        value={formData.endHour}
                                        onChange={e => setFormData({ ...formData, endHour: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 color-scheme-dark"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Hangi Ürünlere Uygulansın?</label>
                                <select
                                    value={formData.targetCategory || ''}
                                    onChange={e => setFormData({ ...formData, targetCategory: e.target.value === '' ? null : e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                                >
                                    <option value="">Tüm Ürünler</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>Sadece {c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold py-2.5 rounded-lg shadow mt-2 hover:from-amber-500 hover:to-amber-400 transition-colors"
                            >
                                Kampanya Oluştur
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        Mevcut Kampanyalar ({campaigns.length})
                    </h3>

                    {campaigns.length === 0 ? (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
                            Henüz tanımlı kampanya yok.
                        </div>
                    ) : (
                        campaigns.map(campaign => {
                            const targetName = campaign.targetCategory
                                ? categories.find(c => c.id === campaign.targetCategory)?.name
                                : 'Tüm Ürünler';

                            return (
                                <div
                                    key={campaign.id}
                                    className={`bg-[#1f1f1f] border rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors ${campaign.active ? 'border-amber-500/50' : 'border-white/10 opacity-70 grayscale'
                                        }`}
                                >

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-lg">{campaign.title}</h4>
                                            {!campaign.active && <span className="text-[10px] bg-gray-700 font-bold px-2 py-0.5 rounded uppercase">Pasif</span>}
                                        </div>
                                        <p className="text-sm text-gray-400 mb-3">{campaign.description || 'Açıklama yok'}</p>

                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-1 rounded flex items-center gap-1">
                                                <Percent size={12} /> {campaign.discountPercent} İndirim
                                            </span>
                                            <span className="bg-white/5 text-gray-300 border border-white/10 px-2 py-1 rounded flex items-center gap-1">
                                                <Clock size={12} /> {campaign.startHour} - {campaign.endHour}
                                            </span>
                                            <span className="bg-white/5 text-gray-300 border border-white/10 px-2 py-1 rounded">
                                                Tümleyen: {targetName}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 sm:self-stretch pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4 w-full sm:w-auto justify-end">
                                        <button
                                            onClick={() => handleToggleActive(campaign)}
                                            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${campaign.active
                                                    ? 'bg-red-900/20 text-red-500 hover:bg-red-900/40'
                                                    : 'bg-green-900/20 text-green-500 hover:bg-green-900/40'
                                                }`}
                                        >
                                            {campaign.active ? 'Durdur' : 'Aktifleştir'}
                                        </button>

                                        <button
                                            onClick={() => handleDelete(campaign.id)}
                                            className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors ml-2"
                                            title="Sil"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                </div>
                            )
                        })
                    )}
                </div>

            </div>
        </div>
    );
}
