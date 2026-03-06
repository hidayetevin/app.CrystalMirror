import React, { useState } from 'react';
import { SplashScreen } from './components/screens/SplashScreen';
import { WorldSelectScreen } from './components/screens/WorldSelectScreen';
import { LevelSelectScreen } from './components/screens/LevelSelectScreen';
import { GameScreen } from './components/screens/GameScreen';
import { DailyChallengeScreen } from './components/screens/DailyChallengeScreen';
import { usePuzzleStore } from './store';

export const App: React.FC = () => {
    const [screen, setScreen] = useState<'splash' | 'world' | 'level' | 'game' | 'daily'>('splash');
    const [selectedWorld, setSelectedWorld] = useState<string>('forest');
    const loadPuzzle = usePuzzleStore(s => s.loadPuzzle);

    return (
        <div className="w-full h-screen overflow-hidden text-white bg-black select-none touch-none">
            {screen === 'splash' && (
                <SplashScreen
                    onStartClick={() => setScreen('world')}
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
        </div>
    );
};
