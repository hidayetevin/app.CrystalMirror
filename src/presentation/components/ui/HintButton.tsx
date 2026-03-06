import React from 'react';
import { usePuzzleStore } from '../../store';

export const HintButton: React.FC = () => {
    const { requestHint, isHintLoading, hintData } = usePuzzleStore();

    if (hintData) {
        // Ipucu zaten alinmissa (ok, hintCalculator sonucu alinmissa) butonu gizle veya aktif goster
        return (
            <div className="text-[var(--ui-accent)] text-lg animate-pulse" title="İpucu aktif! Işıklandırılmış aynayı çevir...">
                💡
            </div>
        );
    }

    return (
        <button
            onClick={requestHint}
            disabled={isHintLoading}
            title="Reklam izleyerek ipucu al"
            className={`px-3 py-1.5 rounded-full border text-sm font-bold flex items-center transition-all ${isHintLoading
                    ? 'bg-gray-800 text-gray-500 border-gray-600 cursor-not-allowed'
                    : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/50 hover:bg-[#FFD700]/30 shadow-[0_0_10px_rgba(255,215,0,0.3)]'
                }`}
        >
            {isHintLoading ? (
                <span className="animate-spin text-lg mr-1">⏳</span>
            ) : (
                <span className="text-lg mr-1">💡</span>
            )}
            <span className="hidden sm:inline">{isHintLoading ? 'Yükleniyor' : 'İpucu Al'}</span>
        </button>
    );
};
