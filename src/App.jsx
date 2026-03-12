import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomerDisplay from './pages/CustomerDisplay';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import useStore from './store/useStore';
import { useEffect, Component } from 'react';

// Error Boundary for better debugging and safety
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("App Crash:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">Sistem Hatası</h1>
            <p className="text-slate-500 mb-8 max-w-md">Uygulama yüklenirken bir sorun oluştu. Lütfen verilerinizi kontrol edin veya sayfayı yenileyin.</p>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Ayarları Sıfırla ve Yeniden Başlat</button>
            {this.state.error && <pre className="mt-8 p-4 bg-red-50 text-red-500 text-[10px] rounded-xl text-left overflow-auto max-w-full">{this.state.error.toString()}</pre>}
        </div>
      );
    }
    return this.props.children;
  }
}

// Simple Protected Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const syncState = useStore((state) => state.syncState);

  useEffect(() => {
    // Isolated safety block for BroadcastChannel
    let bcInstance = null;
    try {
      if (typeof window !== 'undefined' && window.BroadcastChannel) {
        bcInstance = new BroadcastChannel('doner_signage_channel');
      }
    } catch (e) {
      console.warn("BroadcastChannel initialization failed", e);
    }

    if (bcInstance) {
      // Listen for messages from other tabs (Admin panel updating Customer display)
      bcInstance.onmessage = (event) => {
        if (event.data && event.data.type === 'SYNC_STATE') {
          console.log("Received SYNC_STATE broadcast:", event.data.payload);
          syncState(event.data.payload);
        }
      };
    }

    // Subscribing to zustand changes to broadcast them (Sync ONLY data)
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (!bcInstance) return;
      
      try {
        // Only broadcast if actual meaningful data changed
        const hasProductsChanged = JSON.stringify(state.products) !== JSON.stringify(prevState.products);
        const hasCampaignsChanged = JSON.stringify(state.campaigns) !== JSON.stringify(prevState.campaigns);
        
        if (hasProductsChanged || hasCampaignsChanged) {
          const snapshot = {
            categories: state.categories,
            products: state.products,
            campaigns: state.campaigns,
            showcaseImages: state.showcaseImages,
            settings: state.settings
          };
          console.log("Broadcasting SYNC_STATE due to changes:", { hasProductsChanged, hasCampaignsChanged });
          bcInstance.postMessage({ 
            type: 'SYNC_STATE', 
            payload: snapshot
          });
        }
      } catch (e) {
        console.error("Broadcast failed", e); // Silent fail for broadcast, don't crash the whole app
      }
    });

    return () => {
      if (bcInstance) {
        try { bcInstance.close(); } catch (e) { console.error("Error closing BroadcastChannel:", e); }
      }
      unsubscribe();
    };
  }, [syncState]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
