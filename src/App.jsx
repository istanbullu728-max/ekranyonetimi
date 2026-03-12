import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomerDisplay from './pages/CustomerDisplay';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import useStore from './store/useStore';
import { useEffect } from 'react';

// Create a singleton broadcast channel
// Safe Broadcast Channel utility
const getBroadcastChannel = () => {
  if (typeof window !== 'undefined' && window.BroadcastChannel) {
    try {
      return new BroadcastChannel('doner_signage_channel');
    } catch (e) {
      console.error('BroadcastChannel failed:', e);
      return null;
    }
  }
  return null;
};

const bc = getBroadcastChannel();

// Simple Protected Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const syncState = useStore((state) => state.syncState);

  useEffect(() => {
    if (!bc) return;

    // Listen for messages from other tabs (Admin panel updating Customer display)
    bc.onmessage = (event) => {
      if (event.data && event.data.type === 'SYNC_STATE') {
        syncState(event.data.payload);
      }
    };

    // Subscribing to zustand changes to broadcast them (Sync ONLY data)
    const unsubscribe = useStore.subscribe((state, prevState) => {
      // Create data-only snapshot for broadcast
      const snapshot = {
        categories: state.categories,
        products: state.products,
        campaigns: state.campaigns,
        showcaseImages: state.showcaseImages,
        settings: state.settings
      };
      
      // Simple equality check to minimize broadcasts
      if (JSON.stringify(state.products) !== JSON.stringify(prevState.products) ||
          JSON.stringify(state.campaigns) !== JSON.stringify(prevState.campaigns)) {
        bc.postMessage({ type: 'SYNC_STATE', payload: snapshot });
      }
    });

    return () => {
      if (bc) bc.close();
      unsubscribe();
    };
  }, [syncState]);

  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
