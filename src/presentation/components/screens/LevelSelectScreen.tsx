import { useProgressStore, usePuzzleStore } from '../../store';
import { allLevels, soundService } from '../../../container';
import { Puzzle } from '../../../domain/entities/Puzzle';

interface Props {
    worldId: string;
    onSelectLevel: (puzzle: Puzzle) => void;
    onBack: () => void;
}

export const LevelSelectScreen: React.FC<Props> = ({ worldId, onSelectLevel, onBack }) => {
    const { isLevelUnlocked, levelProgress } = useProgressStore();
    const worldLevels = allLevels.filter(l => l.worldId === worldId);

    // Dünya özelliklerini CSS tabanlı almak için
    const worldName = worldId === 'forest' ? 'Orman Işığı' : worldId === 'glacier' ? 'Buzul Kristali' : 'Şelale Sırrı';

    const handleLevelClick = (puzzle: Puzzle) => {
        if (isLevelUnlocked(worldId, puzzle.levelNumber)) {
            soundService.playCrystalHit();
            onSelectLevel(puzzle);
        } else {
            soundService.playNudge();
        }
    };

    return (
        <div className="flex flex-col w-full h-screen bg-[#0D0D12] text-white font-[Rajdhani] overflow-y-auto" data-world={worldId}>
            {/* Custom Theme Background Layer */}
            <div className="fixed inset-0 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] opacity-30 pointer-events-none"></div>

            <div className="relative z-10 flex items-center p-6 pt-10 mb-4">
                <button onClick={onBack} className="p-2 bg-white/10 rounded-full active:bg-white/20">
                    ← Geri
                </button>
                <h1 className="flex-1 text-center text-2xl font-[Cinzel_Decorative] drop-shadow-[0_0_10px_var(--crystal-glow)]">
                    {worldName}
                </h1>
                <button
                    onClick={() => usePuzzleStore.getState().setShowTutorial(true)}
                    className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500 flex items-center justify-center hover:bg-blue-500/40 hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                >
                    ?
                </button>
            </div>

            <div className="relative z-10 grid grid-cols-4 sm:grid-cols-5 gap-4 p-6">
                {worldLevels.map((puzzle) => {
                    const unlocked = isLevelUnlocked(worldId, puzzle.levelNumber);
                    const progress = levelProgress[puzzle.id];
                    const stars = progress?.stars || 0;

                    return (
                        <div
                            key={puzzle.id}
                            onClick={() => handleLevelClick(puzzle)}
                            className={`aspect-square rounded-xl flex flex-col items-center justify-center border transition-all ${unlocked
                                ? 'bg-white/10 border-white/30 cursor-pointer active:scale-95 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]'
                                : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'
                                }`}
                        >
                            {unlocked ? (
                                <>
                                    <span className="text-2xl font-bold mb-1">{puzzle.levelNumber}</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3].map(s => (
                                            <span key={s} className="text-xs" style={{ color: s <= stars ? '#FFD700' : 'rgba(255,255,255,0.2)' }}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <span className="text-xl">🔒</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
