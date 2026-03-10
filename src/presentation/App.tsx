import React, { useState } from 'react';
import { SplashScreen } from './components/screens/SplashScreen';
import { WorldSelectScreen } from './components/screens/WorldSelectScreen';
import { LevelSelectScreen } from './components/screens/LevelSelectScreen';
import { GameScreen } from './components/screens/GameScreen';
import { DailyChallengeScreen } from './components/screens/DailyChallengeScreen';
import { ShopScreen } from './components/screens/ShopScreen';
import { HowToPlayModal } from './components/ui/HowToPlayModal';
import { usePuzzleStore, useEconomyStore, useProgressStore } from './store';

export const App: React.FC = () => {
    const [screen, setScreen] = useState<'splash' | 'world' | 'level' | 'game' | 'daily' | 'shop'>('splash');
    const [selectedWorld, setSelectedWorld] = useState<string>('forest');
    const loadPuzzle = usePuzzleStore(s => s.loadPuzzle);
    const hasSeenTutorial = usePuzzleStore(s => s.hasSeenTutorial);
    const setShowTutorial = usePuzzleStore(s => s.setShowTutorial);

    React.useEffect(() => {
        // Uygulama açılışında oyun ilerlemesini ve ekonomiyi yükle
        useProgressStore.getState().loadAllProgress();
        useEconomyStore.getState().loadEconomy();
    }, []);

    React.useEffect(() => {
        // Otomatik tutorial gösterme mantığı (sadece oyun başladığında - splash ekranı geçildikten sonra - 1 kez göster)
        if (!hasSeenTutorial && screen === 'world') {
            setShowTutorial(true);
        }
    }, [hasSeenTutorial, screen, setShowTutorial]);

    return (
        <div className="w-full h-screen overflow-hidden text-white bg-black select-none touch-none">
            {screen === 'splash' && (
                <SplashScreen
                    onStartClick={() => setScreen('world')}
                    onShopClick={() => setScreen('shop')}
                    onDailyClick={() => setScreen('daily')}
                />
            )}

            {screen === 'world' && (
                <WorldSelectScreen
                    onBack={() => setScreen('splash')}
                    onSelectWorld={(w) => {
                        setSelectedWorld(w);
                        setScreen('level');
                    }}
                />
            )}

            {screen === 'level' && (
                <LevelSelectScreen
                    worldId={selectedWorld}
                    onBack={() => setScreen('world')}
                    onSelectLevel={(puzzle) => {
                        loadPuzzle(puzzle);
                        setScreen('game');
                    }}
                />
            )}

            {screen === 'game' && <GameScreen onBack={() => setScreen('level')} />}
            {screen === 'daily' && <DailyChallengeScreen onBack={() => setScreen('splash')} />}
            {screen === 'shop' && <ShopScreen onBack={() => setScreen('splash')} />}

            <HowToPlayModal />
        </div>
    );
};
