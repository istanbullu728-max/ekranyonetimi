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

            // Actions
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

            // Synchronize state across tabs (Customer Display <-> Admin)
            syncState: (newState) => set(() => newState),
        }),
        {
            name: 'doner-signage-storage',
        }
    )
);

export default useStore;
