import { v4 as uuidv4 } from 'uuid';

export const defaultCategories = [
    { id: 'cat-durum', name: 'Dürüm', order: 1 },
    { id: 'cat-porsiyon', name: 'Porsiyon', order: 2 },
    { id: 'cat-pilavustu', name: 'Pilav Üstü', order: 3 },
    { id: 'cat-icecek', name: 'İçecekler & Tatlılar', order: 4 },
];

export const defaultProducts = [
    // Dürümler
    { id: uuidv4(), name: 'Tavuk Döner Dürüm', description: 'Özel sosuyla taptaze lögar ekmeğinde', price: 90, categoryId: 'cat-durum', image: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: false, isHot: true },
    { id: uuidv4(), name: 'Et Döner Dürüm', description: '%100 dana etinden yaprak döner', price: 140, categoryId: 'cat-durum', image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: false, isHot: true },
    { id: uuidv4(), name: 'Zurna Dürüm', description: '50cm özel lavaş içinde bol etli', price: 160, categoryId: 'cat-durum', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: true, isHot: true },

    // Porsiyon
    { id: uuidv4(), name: 'İskender', description: 'Pide üzerinde yoğurt ve özel tereyağlı sos', price: 220, categoryId: 'cat-porsiyon', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: true, isHot: true },
    { id: uuidv4(), name: 'Et Döner Porsiyon', description: 'Domates, biber ve sumaklı soğan ile', price: 180, categoryId: 'cat-porsiyon', image: 'https://images.unsplash.com/photo-1590846406792-0adc7f138fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: false, isHot: true },

    // Pilav Üstü
    { id: uuidv4(), name: 'Pilav Üstü Et', description: 'Tereyağlı pirinç pilavı üzerinde yaprak döner', price: 190, categoryId: 'cat-pilavustu', image: 'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: false, isHot: true },
    { id: uuidv4(), name: 'Pilav Üstü Tavuk', description: 'Tereyağlı pirinç pilavı üzerinde soslu tavuk', price: 140, categoryId: 'cat-pilavustu', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: false, isHot: true },

    // İçecek/Tatlı
    { id: uuidv4(), name: 'Açık Ayran', description: 'Yayık ayranı, bol köpüklü', price: 30, categoryId: 'cat-icecek', image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: false, isHot: false },
    { id: uuidv4(), name: 'Kutu İçecekler', description: 'Kola, Fanta, Sprite', price: 35, categoryId: 'cat-icecek', image: null, available: true, isChefPick: false, isHot: false },
    { id: uuidv4(), name: 'Fırın Sütlaç', description: 'Günlük taze', price: 65, categoryId: 'cat-icecek', image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: false, isHot: false },
    { id: uuidv4(), name: 'Künefe', description: 'Özel peyniri ve şerbetiyle', price: 90, categoryId: 'cat-icecek', image: 'https://images.unsplash.com/photo-1582236528751-26c71be3912d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', available: true, isChefPick: true, isHot: true },
];

export const defaultCampaigns = [
    { id: uuidv4(), title: 'Öğle Fırsatı', description: 'Tüm dürümlerde %15 indirim', discountPercent: 15, startHour: '11:00', endHour: '14:00', active: true, targetCategory: 'cat-durum' },
    { id: uuidv4(), title: 'Tatlı Saati', description: 'Künefe + Çay Menüsü', discountPercent: 20, startHour: '15:00', endHour: '18:00', active: true, targetCategory: null },
];
