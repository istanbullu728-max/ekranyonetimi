import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultCategories, defaultProducts, defaultCampaigns } from './defaultData';

const useStore = create(
    persist(
        (set, get) => ({
            categories: defaultCategories,
            products: defaultProducts,
            campaigns: defaultCampaigns,
            settings: {
                theme: 'dark-wood',
                activeCampaignId: null, // Computed active campaign
            },
            showcaseImages: [
                { id: 1, url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', active: true },
                { id: 2, url: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&q=80', active: true },
                { id: 3, url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', active: true }
            ],

            // Category Actions
            addCategory: (category) => set((state) => ({
                categories: [...state.categories, category]
            })),
            deleteCategory: (id) => set((state) => ({
                categories: state.categories.filter(c => c.id !== id),
                // Optionally remove or unassign products here if we wanted
                products: state.products.filter(p => p.categoryId !== id)
            })),

            // Product Actions
            setProducts: (products) => set({ products }),
            updateProduct: (id, updates) => set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
            })),
            addProduct: (product) => set((state) => ({
                products: [...state.products, product]
            })),
            deleteProduct: (id) => set((state) => ({
                products: state.products.filter(p => p.id !== id)
            })),

            // Campaign Actions
            setCampaigns: (campaigns) => set({ campaigns }),
            addCampaign: (campaign) => set((state) => ({
                campaigns: [...state.campaigns, campaign]
            })),
            updateCampaign: (id, updates) => set((state) => ({
                campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c)
            })),
            deleteCampaign: (id) => set((state) => ({
                campaigns: state.campaigns.filter(c => c.id !== id)
            })),

            // Showcase Actions
            addShowcaseImage: (image) => set((state) => ({
                showcaseImages: [...state.showcaseImages, image]
            })),
            updateShowcaseImage: (id, url) => set((state) => ({
                showcaseImages: state.showcaseImages.map(img => 
                    img.id === id ? { ...img, url } : img
                )
            })),
            removeShowcaseImage: (id) => set((state) => ({
                showcaseImages: state.showcaseImages.filter(img => img.id !== id)
            })),

            hasHydrated: false,
            setHasHydrated: (val) => set({ hasHydrated: val }),

            // Synchronize state across tabs (Customer Display <-> Admin)
            syncState: (data) => {
                if (!data) return;
                set((state) => ({
                    ...state,
                    categories: data.categories || state.categories,
                    products: data.products || state.products,
                    campaigns: data.campaigns || state.campaigns,
                    showcaseImages: data.showcaseImages || state.showcaseImages,
                    settings: data.settings || state.settings
                }));
            },
        }),
        {
            name: 'doner-signage-storage',
            onRehydrateStorage: () => (state) => {
                state.setHasHydrated(true);
            }
        }
    )
);

export default useStore;
