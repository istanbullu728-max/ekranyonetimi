import { useEffect, useRef } from 'react';
import { Peer } from 'peerjs';
import useStore from '../store/useStore';

const TV_BASE_ID = 'doner-akis-tv-v4';
const MAX_CHANNELS = 5; // allow up to 5 concurrent TV screens

export function useAutoSyncDisplay() {
    const syncState = useStore(state => state.syncState);

    // 1. Same-Device Fallback (LocalStorage event)
    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === 'doner-signage-storage' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    if (parsed && parsed.state) {
                        syncState(parsed.state);
                    }
                } catch(err) {
                    console.error('Storage sync parse error', err);
                }
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [syncState]);

    // 2. PeerJS Network Sync (Cross-Device)
    useEffect(() => {
        if (!syncState) return;

        let peer = null;
        let channelIndex = 1;
        let reconnectTimeout = null;

        const connectToChannel = (index) => {
            if (peer) {
                peer.destroy();
                peer = null;
            }

            const currentId = `${TV_BASE_ID}-${index}`;
            console.log(`[Sync] TV Ekranı kanal atanıyor: ${currentId}`);
            
            peer = new Peer(currentId, { debug: 0 });

            peer.on('open', (id) => {
                console.log(`[Sync] TV Hazır. Canlı ağ bağlantısı açıldı: (${id})`);
            });

            peer.on('connection', (conn) => {
                conn.on('data', (data) => {
                    if (data && data.type === 'SYNC_STATE' && data.payload) {
                        console.log(`[Sync] Telefondan canlı veri alındı.`);
                        syncState(data.payload);
                    }
                });
            });

            peer.on('error', (err) => {
                if (err.type === 'unavailable-id') {
                    console.log(`[Sync] ${currentId} meşgul, sonraki kanala geçiliyor...`);
                    channelIndex = (channelIndex % MAX_CHANNELS) + 1;
                    reconnectTimeout = setTimeout(() => connectToChannel(channelIndex), 1000);
                } else {
                    console.error('[Sync] PeerJS Hatası:', err.type);
                    reconnectTimeout = setTimeout(() => connectToChannel(channelIndex), 3000);
                }
            });

            peer.on('disconnected', () => {
                console.log('[Sync] Ağ bağlantısı koptu, yeniden deneniyor...');
                if (!peer.destroyed) {
                    setTimeout(() => peer.reconnect(), 2000);
                }
            });
        };

        connectToChannel(channelIndex);

        return () => {
            if (peer) peer.destroy();
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
        };
    }, [syncState]);
}

export function useAutoSyncAdmin() {
    const categories = useStore(state => state.categories);
    const products = useStore(state => state.products);
    const campaigns = useStore(state => state.campaigns);
    const showcaseImages = useStore(state => state.showcaseImages);
    const settings = useStore(state => state.settings);
    
    const peerRef = useRef(null);
    const connsRef = useRef({}); 
    const lastStateStr = useRef('');
    const retryInterval = useRef(null);

    const getPayload = () => ({
        categories: useStore.getState().categories,
        products: useStore.getState().products,
        campaigns: useStore.getState().campaigns,
        showcaseImages: useStore.getState().showcaseImages,
        settings: useStore.getState().settings
    });

    useEffect(() => {
        const peer = new Peer({ debug: 0 });
        peerRef.current = peer;

        const broadcastToAllChannels = () => {
            if (!peer || peer.disconnected || peer.destroyed) return;

            for (let i = 1; i <= MAX_CHANNELS; i++) {
                const targetId = `${TV_BASE_ID}-${i}`;
                
                if (connsRef.current[targetId] && connsRef.current[targetId].open) {
                    continue; // Already connected
                }

                const conn = peer.connect(targetId, { reliable: true });
                
                conn.on('open', () => {
                    console.log(`[Sync] TV Kanalına Bağlandı: ${targetId}`);
                    connsRef.current[targetId] = conn;
                    
                    // Immediately push current state
                    conn.send({ type: 'SYNC_STATE', payload: getPayload() });
                });

                conn.on('close', () => {
                    delete connsRef.current[targetId];
                });

                conn.on('error', () => {
                    delete connsRef.current[targetId];
                });
            }
        };

        peer.on('open', () => {
            broadcastToAllChannels();
            // Continuously scan for new TVs
            retryInterval.current = setInterval(broadcastToAllChannels, 3000);
        });

        return () => {
            if (retryInterval.current) clearInterval(retryInterval.current);
            Object.values(connsRef.current).forEach(c => c.close());
            if (peer) peer.destroy();
        };
    }, []);

    // Push new state to all connected TVs when changes occur
    useEffect(() => {
        const payload = { categories, products, campaigns, showcaseImages, settings };
        const stateStr = JSON.stringify(payload);
        
        if (stateStr !== lastStateStr.current) {
            lastStateStr.current = stateStr;
            let activeConns = 0;
            
            Object.values(connsRef.current).forEach(conn => {
                if (conn && conn.open) {
                    conn.send({ type: 'SYNC_STATE', payload });
                    activeConns++;
                }
            });
            console.log(`[Sync] Değişiklik ${activeConns} TV ekranına gönderildi.`);
        }
    }, [categories, products, campaigns, showcaseImages, settings]);
}
