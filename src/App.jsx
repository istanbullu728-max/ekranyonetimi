import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomerDisplay from './pages/CustomerDisplay';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import useStore from './store/useStore';
import { useEffect } from 'react';

// Create a singleton broadcast channel
const bc = new BroadcastChannel('doner_signage_channel');

// Simple Protected Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const syncState = useStore((state) => state.syncState);

  useEffect(() => {
    // Listen for messages from other tabs (Admin panel updating Customer display)
    bc.onmessage = (event) => {
      if (event.data && event.data.type === 'SYNC_STATE') {
        syncState(event.data.payload);
      }
    };

    // Subscribing to zustand changes to broadcast them
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (JSON.stringify(state) !== JSON.stringify(prevState)) {
        bc.postMessage({ type: 'SYNC_STATE', payload: state });
      }
    });

    return () => {
      bc.close();
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
