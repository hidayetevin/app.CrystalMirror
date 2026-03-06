import React from 'react';
import { usePuzzleStore } from '../../store';
import { HintButton } from './HintButton';

interface Props {
    title: string;
    onBack: () => void;
}

export const Header: React.FC<Props> = ({ title, onBack }) => {
    const elapsedSeconds = usePuzzleStore(s => s.elapsedSeconds);
    const status = usePuzzleStore(s => s.status);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent border-b border-white/10 z-10">

            {/* Sol: Geri Butonu */}
            <button
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10"
            >
                <span className="text-xl -ml-1">←</span>
            </button>

            {/* Orta: Başlık ve Süre */}
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-[Cinzel_Decorative] tracking-widest font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--crystal-glow)]">
                    {title}
                </h1>
                <div className={`text-sm tracking-wider font-mono ${status === 'SOLVED' ? 'text-[var(--ui-accent)] font-bold drop-shadow-[0_0_5px_var(--ui-accent)]' : 'text-white/60'}`}>
                    {formatTime(elapsedSeconds)}
                </div>
            </div>

            {/* Sağ: İpucu Butonu */}
            <div className="w-auto min-w-[40px] flex justify-end">
                {status === 'PLAYING' && <HintButton />}
            </div>

        </div>
    );
};
