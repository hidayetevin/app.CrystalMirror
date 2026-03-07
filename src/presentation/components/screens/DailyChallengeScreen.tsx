import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDailyStore, usePuzzleStore } from '../../store';
import { PuzzleCanvas } from '../canvas/PuzzleCanvas';
import { Header } from '../ui/Header';
import { VictoryModal } from '../modals/VictoryModal';
import { shareResultCase } from '../../../container';
import { PuzzleResult } from '../../../application/dto';

interface Props {
    onBack: () => void;
}

export const DailyChallengeScreen: React.FC<Props> = ({ onBack }) => {
    const { t } = useTranslation();
    const { loadToday, todayChallenge, completeToday } = useDailyStore();
    const { loadPuzzle, status, elapsedSeconds, hintsUsed, moves } = usePuzzleStore();

    useEffect(() => {
        loadToday();
    }, [loadToday]);

    useEffect(() => {
        if (todayChallenge && !todayChallenge.alreadyPlayed) {
            loadPuzzle(todayChallenge.puzzle);
        }
    }, [todayChallenge, loadPuzzle]);

    if (!todayChallenge) {
        return (
            <div className="flex w-full h-screen items-center justify-center bg-black text-white">
                <div className="animate-spin text-4xl">⏳</div>
            </div>
        );
    }

    const handleLevelComplete = () => {
        // Modaldaki buton tıklanınca calısacak
        if (todayChallenge.alreadyPlayed) return;

        const result: PuzzleResult = {
            puzzleId: `daily_${todayChallenge.dateKey}`,
            levelNumber: 0,
            stars: 3, // Günlük mücadele performansı bağımsız hesaplanabilir (TODO)
            timeSeconds: elapsedSeconds,
            totalMoves: moves.length,
            hintsUsed: hintsUsed,
            moves: moves
        };
        // Daily store a işlenir
        completeToday(result);
    };

    const shareDaily = async () => {
        // Wordle style paylasim
        let text = `💎 ${t('daily.title')}\n📅 ${todayChallenge.dateKey}\n⏱️ ${elapsedSeconds}s\n\n#CrystalMirror`;
        try {
            await shareResultCase.execute({
                puzzleId: 'daily', levelNumber: 0, stars: 3, timeSeconds: elapsedSeconds,
                totalMoves: moves.length, hintsUsed, moves
            });
        } catch (e) { /* fallback kullanilir iceride */ }
    };

    return (
        <div className="flex flex-col w-full h-screen bg-[#1A0A2E] text-white font-[Rajdhani] select-none" data-world="waterfall">
            <Header onBack={onBack} title={t('daily.title')} />

            {todayChallenge.alreadyPlayed ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-8xl mb-6 drop-shadow-[0_0_20px_var(--crystal-glow)]">✨</div>
                    <h2 className="text-3xl font-[Cinzel_Decorative] mb-4">{t('daily.completed')}</h2>
                    <p className="text-xl text-white/70 mb-8 max-w-sm">
                        {t('daily.completed_desc')}
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={shareDaily}
                            className="px-8 py-3 bg-[var(--ui-accent)] hover:bg-[var(--ui-accent)]/80 font-bold rounded shadow-[0_4px_15px_var(--ui-accent)] text-lg transition-all"
                        >
                            {t('daily.share')}
                        </button>
                        <button
                            onClick={onBack}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded font-bold text-lg"
                        >
                            {t('ui.return_back')}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center relative">
                    <PuzzleCanvas />
                    {status === 'SOLVED' && (
                        <VictoryModal
                            onNextLevel={handleLevelComplete}
                            onHome={onBack}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
