import { useEffect, useRef } from 'react';
import { Peer } from 'peerjs';
import useStore from '../store/useStore';

const TV_ID = 'ekranyonetimi-tv-demo-core-v2'; // Sabit ve benzersiz TV ID'si

export function useAutoSyncDisplay() {
    const syncState = useStore(state => state.syncState);

    useEffect(() => {
        if (!syncState) return;

        let peer = null;
        let reconnectTimeout = null;

        const initPeer = () => {
            peer = new Peer(TV_ID, {
                debug: 0,
            });

            peer.on('open', (id) => {
                console.log('Ekran senkronizasyona hazır. ID:', id);
            });

            peer.on('connection', (conn) => {
                conn.on('data', (data) => {
                    if (data && data.type === 'SYNC_STATE' && data.payload) {
                        syncState(data.payload);
                    }
                });
            });

            peer.on('disconnected', () => {
                console.log('PeerJS bağlantısı koptu. Yeniden bağlanılıyor...');
                if (!peer.destroyed) {
                    peer.reconnect();
                }
            });

            peer.on('error', (err) => {
                console.error('Ekran Sync Hatası:', err.type);
                if (err.type === 'unavailable-id') {
                    // ID zaten alınmış, muhtemelen açık başka bir ekran sekmesi var
                    reconnectTimeout = setTimeout(initPeer, 5000);
                } else if (err.type === 'network' || err.type === 'server-error' || err.type === 'peer-unavailable') {
                    reconnectTimeout = setTimeout(initPeer, 3000);
                }
            });
        };

        initPeer();

        return () => {
            if (peer) {
                peer.destroy();
            }
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }
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
    const connRef = useRef(null);
    const lastStateStr = useRef('');
    const retryInterval = useRef(null);

    // Initial Connection
    useEffect(() => {
        let peer = new Peer({ debug: 0 });
        peerRef.current = peer;

        const connectToTV = () => {
            if (!peer || peer.disconnected || peer.destroyed) return;
            if (connRef.current && connRef.current.open) return;

            const conn = peer.connect(TV_ID, { reliable: true });
            
            conn.on('open', () => {
                console.log('TV ekranına başarıyla bağlanıldı! Canlı güncellemeler aktif.');
                connRef.current = conn;
                
                // Send current state on first connection
                const payload = { 
                    categories: useStore.getState().categories, 
                    products: useStore.getState().products, 
                    campaigns: useStore.getState().campaigns, 
                    showcaseImages: useStore.getState().showcaseImages, 
                    settings: useStore.getState().settings 
                };
                conn.send({ type: 'SYNC_STATE', payload });
                lastStateStr.current = JSON.stringify(payload);
            });

            conn.on('close', () => {
                connRef.current = null;
            });
            
            conn.on('error', () => {
                connRef.current = null;
            });
        };

        peer.on('open', () => {
            connectToTV();
            retryInterval.current = setInterval(connectToTV, 3000);
        });

        return () => {
            if (retryInterval.current) clearInterval(retryInterval.current);
            if (peer) peer.destroy();
        };
    }, []);

    // Broadcast on State Changes
    useEffect(() => {
        if (!connRef.current || !connRef.current.open) return;
        
        const payload = { categories, products, campaigns, showcaseImages, settings };
        const stateStr = JSON.stringify(payload);
        
        if (stateStr !== lastStateStr.current) {
            connRef.current.send({ type: 'SYNC_STATE', payload });
            lastStateStr.current = stateStr;
        }
    }, [categories, products, campaigns, showcaseImages, settings]);
}
