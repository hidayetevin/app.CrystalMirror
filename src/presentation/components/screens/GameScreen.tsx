import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePuzzleStore } from '../../store';
import { Header } from '../ui/Header';
import { PuzzleCanvas } from '../canvas/PuzzleCanvas';
import { BannerAdContainer } from '../ads/BannerAdContainer';
import { VictoryModal } from '../modals/VictoryModal';
import { adService } from '../../../container';

interface Props {
    onBack: () => void;
    onNextLevel?: () => void;
}

export const GameScreen: React.FC<Props> = ({ onBack, onNextLevel }) => {
    const { t } = useTranslation();
    const puzzle = usePuzzleStore((s) => s.activePuzzle);
    const status = usePuzzleStore((s) => s.status);
    const tick = usePuzzleStore((s) => s.tick);

    useEffect(() => {
        // Timer interval
        const timer = setInterval(() => {
            if (usePuzzleStore.getState().status === 'PLAYING') {
                tick();
            }
        }, 1000);

        // AdMob Banner'ı Göster
        adService.showBanner();

        return () => {
            clearInterval(timer);
            adService.hideBanner();
        };
    }, [tick]);

    if (!puzzle) return null;

    return (
        <div className="flex flex-col w-full min-h-screen bg-[var(--bg-primary)] text-white font-[Rajdhani] select-none" data-world={puzzle.worldId}>
            {/* Oyun Alanı */}
            <Header onBack={onBack} title={t('ui.level_title', { level: puzzle.levelNumber })} />

            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                {/* Glow efekti (arkaplan) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--bg-secondary)_0%,_transparent_60%)] opacity-30 pointer-events-none"></div>

                {/* Ana Render Bileşeni */}
                <PuzzleCanvas />
            </div>

            {/* Kazanma Durumu (Modal gibi üstüne biner) */}
            {status === 'SOLVED' && (
                <VictoryModal
                    onNextLevel={onNextLevel ? onNextLevel : onBack}
                    onHome={onBack}
                />
            )}

            {/* Banner Reklam Alanı Çerçevesi (Altta yer ayırıyoruz) */}
            <div className="h-[60px] bg-black/50 border-t border-[var(--ui-accent)]/20 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                <BannerAdContainer />
            </div>
        </div>
    );
};
