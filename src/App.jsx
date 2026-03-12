import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';

// Lazy load pages to prevent a single page crash from killing the whole app
const LandingPage = lazy(() => import('./pages/LandingPage'));
const CustomerDisplay = lazy(() => import('./pages/CustomerDisplay'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Login = lazy(() => import('./pages/Login'));

// Basic Loading Screen
const Fallback = () => (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-6 shadow-xl shadow-amber-500/10"></div>
        <h1 className="text-xl font-black uppercase tracking-[0.3em] text-slate-800">Menü Yükleniyor</h1>
        <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Lütfen bekleyin...</p>
    </div>
);

// Protected Route
const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
    const syncState = useStore((state) => state.syncState);
    const hasHydrated = useStore((state) => state.hasHydrated);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // EMERGENCY RESET: If the user adds ?reset=true to the URL, clear everything
        const params = new URLSearchParams(window.location.search);
        if (params.get('reset') === 'true') {
            localStorage.clear();
            window.location.href = window.location.origin;
            return;
        }

        let bc = null;
        try {
            if (window.BroadcastChannel) {
                bc = new BroadcastChannel('doner_signage_channel');
                bc.onmessage = (event) => {
                    if (event.data?.type === 'SYNC_STATE') {
                        syncState(event.data.payload);
                    }
                };
            }
        } catch (e) {
            console.error('Channel error:', e);
        }

        const unsubscribe = useStore.subscribe((state, prevState) => {
            if (!bc) return;
            try {
                // Only sync if actual data changed (categories, products, etc)
                const s1 = JSON.stringify({ p: state.products, c: state.campaigns });
                const s2 = JSON.stringify({ p: prevState.products, c: prevState.campaigns });
                
                if (s1 !== s2) {
                    bc.postMessage({ 
                        type: 'SYNC_STATE', 
                        payload: {
                            categories: state.categories,
                            products: state.products,
                            campaigns: state.campaigns,
                            showcaseImages: state.showcaseImages,
                            settings: state.settings
                        } 
                    });
                }
            } catch (e) {}
        });

        return () => {
            if (bc) bc.close();
            unsubscribe();
        };
    }, [syncState]);

    // Force wait for rehydration to prevent state flashes or empty starts
    if (!hasHydrated) return <Fallback />;

    return (
        <Suspense fallback={<Fallback />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/display" element={<CustomerDisplay />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/admin" 
                        element={
                            <PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        } 
                    />
                    {/* Fallback for unknown routes */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
