import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerDisplay from './pages/CustomerDisplay';
import AdminDashboard from './pages/AdminDashboard';
import useStore from './store/useStore';
import { useEffect } from 'react';

// Create a singleton broadcast channel
const bc = new BroadcastChannel('doner_signage_channel');

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
      // Very basic diff check to prevent infinite loops:
      // In a real app we'd want more granular syncing, but the whole state is relatively small.
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
        <Route path="/" element={<CustomerDisplay />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
