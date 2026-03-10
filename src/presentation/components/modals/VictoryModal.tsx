import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePuzzleStore, useProgressStore, useEconomyStore } from '../../store';
import { PuzzleResult } from '../../../application/dto';
import { starRatingCalculator, saveProgressCase, shareResultCase, adService } from '../../../container';

interface Props {
    onNextLevel: () => void;
    onHome: () => void;
}

export const VictoryModal: React.FC<Props> = ({ onNextLevel, onHome }) => {
    const { t } = useTranslation();
    const { activePuzzle, elapsedSeconds, hintsUsed, moves } = usePuzzleStore();
    const [stars, setStars] = useState<number>(0);
    const [earnedCoins, setEarnedCoins] = useState<number | null>(null);

    useEffect(() => {
        if (!activePuzzle) return;

        // Yapiyi UseCase veya Calculator uzerinden guncelliyoruz
        const calculatedStars = starRatingCalculator.calculate(
            elapsedSeconds,
            hintsUsed,
            activePuzzle.timeLimit
        );

        setStars(calculatedStars);

        // Ilerlemeyi Kaydet (SaveProgressUseCase cagirilarak Store durtulur)
        const result: PuzzleResult = {
            puzzleId: activePuzzle.id,
            levelNumber: activePuzzle.levelNumber,
            stars: calculatedStars,
            timeSeconds: elapsedSeconds,
            totalMoves: moves.length,
            hintsUsed,
            moves
        };

        // Veritabanina kaydet
        saveProgressCase.execute(result).then(({ coinsEarned }) => {
            // Global Progress Store update tetikle
            useProgressStore.getState().loadAllProgress();

            // Ekonomiyi Guncelle
            useEconomyStore.getState().addCoins(coinsEarned);
            setEarnedCoins(coinsEarned);
        });

    }, [activePuzzle, elapsedSeconds, hintsUsed, moves]);

    const handleShare = () => {
        if (activePuzzle) {
            shareResultCase.execute({
                puzzleId: activePuzzle.id,
                levelNumber: activePuzzle.levelNumber,
                stars: stars as any,
                timeSeconds: elapsedSeconds,
                totalMoves: moves.length,
                hintsUsed,
                moves
            });
        }
    };

    const handleNext = () => {
        // Interstitial Rasyosu - her bolum bitisinde 1/3 ihtimalle reklam (Ornek Kullanim)
        if (Math.random() < 0.33) {
            adService.showInterstitial().finally(onNextLevel);
        } else {
            onNextLevel();
        }
    };

    // Zaman Formatla (01:25)
    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="w-11/12 max-w-sm bg-gradient-to-b from-[#1a1a2e] to-black border border-[var(--ui-accent)]/50 rounded-2xl p-6 flex flex-col items-center shadow-[0_0_40px_var(--crystal-glow)] animate-scale-up">

                <h2 className="text-3xl font-[Cinzel_Decorative] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--crystal-glow)] mb-6">
                    {t('level.complete').toUpperCase()}
                </h2>

                {/* Yıldızlar (Basit Animasyon) */}
                <div className="flex gap-2 mb-6">
                    {[1, 2, 3].map((s, index) => (
                        <span
                            key={s}
                            className="text-6xl filter drop-shadow-[0_0_15px_#FFD700]"
                            style={{
                                color: s <= stars ? '#FFD700' : 'rgba(255,255,255,0.1)',
                                animation: s <= stars ? `pop 0.5s ease-out ${index * 0.2}s both` : 'none'
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 w-full mb-8 flex justify-around text-center">
                    <div>
                        <div className="text-xs text-white/50 tracking-widest">{t('level.time_label')}</div>
                        <div className="text-xl font-bold">{formatTime(elapsedSeconds)}</div>
                    </div>
                    <div>
                        <div className="text-xs text-white/50 tracking-widest">{t('level.hints_label')}</div>
                        <div className="text-xl font-bold">{hintsUsed}</div>
                    </div>
                    {earnedCoins !== null && (
                        <div className="animate-scale-up" style={{ animationDelay: '0.8s' }}>
                            <div className="text-xs text-[#FFD700] tracking-widest">COINS</div>
                            <div className="text-xl font-bold text-[#FFD700]">+{earnedCoins}</div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col w-full gap-3">
                    <button
                        onClick={handleNext}
                        className="w-full py-4 bg-[var(--ui-accent)] hover:bg-[var(--ui-accent)]/80 text-[var(--bg-primary)] rounded-lg text-lg uppercase font-bold tracking-widest transition-all shadow-[0_0_15px_var(--ui-accent)]"
                    >
                        {t('level.next')}
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm uppercase tracking-wider transition-all"
                        >
                            {t('ui.share')}
                        </button>
                        <button
                            onClick={onHome}
                            className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm uppercase tracking-wider transition-all"
                        >
                            {t('ui.menu')}
                        </button>
                    </div>
                </div>

            </div>

            <style>{`
        @keyframes pop {
           0% { transform: scale(0); opacity: 0; }
           70% { transform: scale(1.2); opacity: 1; }
           100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
           from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes scale-up {
           from { transform: scale(0.9); opacity: 0; }
           to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-up { animation: scale-up 0.4s ease-out; }
      `}</style>
        </div>
    );
};
