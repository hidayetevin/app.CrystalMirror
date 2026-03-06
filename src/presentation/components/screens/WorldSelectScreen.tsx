import React, { useEffect } from 'react';
import { useProgressStore } from '../../store';
import { soundService } from '../../../container';

interface Props {
    onSelectWorld: (worldId: string) => void;
    onBack: () => void;
}

const WORLDS = [
    { id: 'forest', name: 'Orman Işığı', color: '#ADFF2F', icon: '🌲' },
    { id: 'glacier', name: 'Buzul Kristali', color: '#80DEEA', icon: '❄️' },
    { id: 'waterfall', name: 'Şelale Sırrı', color: '#CE93D8', icon: '🌊' }
];

export const WorldSelectScreen: React.FC<Props> = ({ onSelectWorld, onBack }) => {
    const { isLevelUnlocked, getWorldProgress, loadAllProgress } = useProgressStore();

    useEffect(() => {
        loadAllProgress();
    }, [loadAllProgress]);

    const handleWorldClick = (worldId: string) => {
        // Ilk bolum aciksa, dunya aciktir
        if (isLevelUnlocked(worldId, 1)) {
            soundService.playCrystalHit();
            onSelectWorld(worldId);
        } else {
            soundService.playNudge(); // Locked sesi
        }
    };

    return (
        <div className="flex flex-col w-full h-screen bg-[#0D0D12] text-white font-[Rajdhani] p-6 overflow-y-auto">
            <div className="flex items-center mb-8 pt-4">
                <button onClick={onBack} className="p-2 bg-white/10 rounded-full active:bg-white/20">
                    ← Geri
                </button>
                <h1 className="flex-1 text-center text-3xl font-[Cinzel_Decorative]">Dünyalar</h1>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            <div className="flex flex-col gap-6">
                {WORLDS.map((world, index) => {
                    const isUnlocked = isLevelUnlocked(world.id, 1);
                    const progress = getWorldProgress(world.id);
                    const percent = Math.round((progress.completed / progress.total) * 100);

                    return (
                        <div
                            key={world.id}
                            onClick={() => handleWorldClick(world.id)}
                            className={`relative overflow-hidden rounded-2xl p-6 border transition-all ${isUnlocked
                                    ? 'bg-white/5 border-white/20 active:scale-[0.98]'
                                    : 'bg-black/50 border-white/5 opacity-50'
                                }`}
                            style={{ boxShadow: isUnlocked ? `0 10px 30px ${world.color}15` : 'none' }}
                            data-world={world.id}
                        >
                            {!isUnlocked && (
                                <div className="absolute inset-0 z-20 flex flex-colItems-center justify-center bg-black/60 backdrop-blur-sm pt-8">
                                    <div className="text-4xl mb-2 text-center">🔒</div>
                                    <div className="text-sm tracking-widest text-white/70 text-center">ÖNCEKİ DÜNYAYI TAMAMLA</div>
                                </div>
                            )}

                            <div className="relative z-10 flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{world.icon}</span>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-wide" style={{ color: isUnlocked ? world.color : '#666' }}>
                                            {world.name}
                                        </h2>
                                        <div className="text-sm text-white/50">{progress.completed} / {progress.total} Bölüm</div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
                                <div
                                    className="h-full transition-all duration-1000 ease-out"
                                    style={{ width: `${percent}%`, backgroundColor: world.color, boxShadow: `0 0 10px ${world.color}` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
