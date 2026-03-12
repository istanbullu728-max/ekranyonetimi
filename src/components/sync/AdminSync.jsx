import React, { useEffect, useState, useRef } from 'react';
import useStore from '../../store/useStore';
import { Peer } from 'peerjs';
import { Wifi, WifiOff } from 'lucide-react';

export default function AdminSync() {
    const { adminPairCode, setAdminPairCode } = useStore();
    const [isConnected, setIsConnected] = useState(false);
    const [inputCode, setInputCode] = useState(adminPairCode || '');
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    // We use refs to avoid re-triggering effect on state mutations
    const connRef = useRef(null);
    const peerRef = useRef(null);

    useEffect(() => {
        if (!adminPairCode) return;

        // Reset errors
        setErrorMsg('');

        // Initialize Peer
        const peer = new Peer();
        peerRef.current = peer;

        peer.on('open', () => {
            const conn = peer.connect(`doner-akis-prod-${adminPairCode}`);
            connRef.current = conn;

            conn.on('open', () => {
                setIsConnected(true);
                setErrorMsg('');
                // Immediately send current state to TV
                const state = useStore.getState();
                conn.send({
                    categories: state.categories,
                    products: state.products,
                    campaigns: state.campaigns,
                    showcaseImages: state.showcaseImages,
                    settings: state.settings
                });
            });

            conn.on('close', () => {
                setIsConnected(false);
                connRef.current = null;
            });
            
            conn.on('error', (err) => {
                 setIsConnected(false);
                 connRef.current = null;
                 setErrorMsg('Ağ hatası: Gecikme veya paket kaybı.');
            });
        });

        peer.on('error', (err) => {
             console.error('PeerJS Admin Error:', err);
             // E.g. peer unavailble
             setIsConnected(false);
             setErrorMsg('Kod hatalı veya TV kapalı.');
        });

        return () => {
            peer.destroy();
            connRef.current = null;
            setIsConnected(false);
        };
    }, [adminPairCode]);

    // Push local state to TV whenever it changes
    useEffect(() => {
        const unsubscribe = useStore.subscribe((state) => {
            if (isConnected && connRef.current && connRef.current.open) {
                // Prevent cyclic/huge payloads
                const payload = {
                    categories: state.categories,
                    products: state.products,
                    campaigns: state.campaigns,
                    showcaseImages: state.showcaseImages,
                    settings: state.settings
                };
                connRef.current.send(payload);
            }
        });

        return () => unsubscribe();
    }, [isConnected]);

    const handleConnect = () => {
        if (inputCode.trim().length === 4) {
            setAdminPairCode(inputCode.trim());
        } else {
            setErrorMsg('Lütfen 4 haneli geçerli bir kod girin.');
        }
    };

    const handleDisconnect = () => {
        setAdminPairCode(null);
        setInputCode('');
        if (peerRef.current) {
            peerRef.current.destroy();
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[100]">
            <button 
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all ${isConnected ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
                {isConnected ? <Wifi size={18} className="animate-pulse" /> : <WifiOff size={18} />}
                {isConnected ? 'TV BAĞLI' : 'CİHAZ EŞLEŞTİR'}
            </button>

            {isPanelOpen && (
                <div className="absolute bottom-20 left-0 bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 w-[340px] animate-in slide-in-from-bottom-4">
                    <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tighter">TV Eşleştirme</h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">Değişikliklerin ekrana anında yansıması için TV köşesindeki kodu girin.</p>
                    
                    {errorMsg && (
                        <div className="mb-4 bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl text-xs font-bold uppercase tracking-widest text-center">
                            {errorMsg}
                        </div>
                    )}

                    {isConnected ? (
                        <div className="space-y-4 text-center">
                            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl flex flex-col items-center justify-center gap-2">
                                <span className="font-mono text-4xl font-black tracking-widest">{adminPairCode}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest bg-green-200/50 px-3 py-1 rounded-full text-green-800">Aktif Bağlantı</span>
                            </div>
                            <button onClick={handleDisconnect} className="w-full bg-slate-100 text-slate-500 font-bold px-4 py-4 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors uppercase text-xs tracking-widest">
                                Bağlantıyı Kes
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                maxLength={4}
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
                                placeholder="0000"
                                className="flex-1 text-center font-mono text-3xl font-black tracking-widest text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl px-2 py-4 outline-none focus:border-[#FF5722] transition-colors"
                            />
                            <button onClick={handleConnect} className="bg-[#FF5722] text-white px-6 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-[#FF5722]/30 hover:bg-[#e64a19] transition-colors">
                                Ekle
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
