import React, { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import { Peer } from 'peerjs';

export default function DisplaySync() {
    const { tvPairCode, setTvPairCode, syncState } = useStore();
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
        // Generate a 4 digit code if not exists
        let code = tvPairCode;
        if (!code) {
           code = Math.floor(1000 + Math.random() * 9000).toString();
           setTvPairCode(code);
        }

        const peer = new Peer(`doner-akis-prod-${code}`);

        peer.on('open', (id) => {
            console.log('TV Ready to receive connection on:', id);
        });

        peer.on('connection', (conn) => {
            setIsConnected(true);
            conn.on('data', (data) => {
                // When admin pushes state, sync it locally
                syncState(data);
            });
            conn.on('close', () => {
                setIsConnected(false);
            });
            conn.on('error', () => {
                setIsConnected(false);
            });
        });

        peer.on('error', (err) => {
            console.error('PeerJS TV Sync Error:', err);
            // If the ID is taken or network fails, we'll lose connection tracking but keep UI running.
            setIsConnected(false);
        });

        return () => {
            setIsConnected(false);
            peer.destroy();
        };
    }, [tvPairCode, setTvPairCode, syncState]);

    return (
        <div className="fixed bottom-6 right-6 z-[100] bg-black/80 backdrop-blur-xl text-white px-6 py-3 rounded-2xl flex items-center gap-4 text-sm shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 group cursor-default hover:bg-black transition-colors">
            <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] leading-tight mb-1 group-hover:text-amber-500 transition-colors">TV Eşleştirme Kodu</span>
                <span className="font-mono text-2xl font-black text-white tracking-[0.2em]">{tvPairCode || 'YÜKLENİYOR'}</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-[#22c55e] shadow-[0_0_15px_#22c55e]' : 'bg-[#FF5722] shadow-[0_0_15px_#FF5722] animate-pulse'}`}></div>
        </div>
    );
}
