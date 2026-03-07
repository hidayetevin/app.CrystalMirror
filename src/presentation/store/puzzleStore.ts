import { create } from 'zustand';
import { Puzzle } from '../../domain/entities/Puzzle';
import { PuzzleStatus } from '../../domain/value-objects/PuzzleStatus';
import { SnapMode } from '../../domain/rules/MagneticSnapService';
import { HintDTO } from '../../application/dto';
import { useHintCase } from '../../container';
import { CoordinateSystem } from '../../domain/value-objects/CoordinateSystem';

export interface MoveRecord {
    wasHint: boolean;
    mirrorId: string;
    timeSeconds: number;
}

export interface PuzzleState {
    activePuzzle: Puzzle | null;
    committedAngles: Record<string, number>; // mirrorId -> angle
    status: PuzzleStatus;
    moves: MoveRecord[];
    elapsedSeconds: number;
    hintsUsed: number;
    isHintLoading: boolean;
    hintData: HintDTO | null;
    snapMode: SnapMode;
    showTutorial: boolean;
    hasSeenTutorial: boolean;

    loadPuzzle: (puzzle: Puzzle) => void;
    commitMirrorAngle: (mirrorId: string, angle: number) => void;
    onPuzzleSolved: (fills: Map<string, number>) => void;
    requestHint: (coords: CoordinateSystem) => Promise<void>;
    tick: () => void;
    resetPuzzle: () => void;
    setSnapMode: (mode: SnapMode) => void;
    setShowTutorial: (show: boolean) => void;
    markTutorialAsSeen: () => void;
}

export const usePuzzleStore = create<PuzzleState>((set, get) => ({
    activePuzzle: null,
    committedAngles: {},
    status: 'IDLE',
    moves: [],
    elapsedSeconds: 0,
    hintsUsed: 0,
    isHintLoading: false,
    hintData: null,
    snapMode: 'GUIDED',
    showTutorial: false,
    hasSeenTutorial: localStorage.getItem('tutorialSeen') === 'true',

    loadPuzzle: (puzzle) => {
        const committed: Record<string, number> = {};
        puzzle.mirrors.forEach((m) => {
            committed[m.id] = m.angleDegrees;
        });
        set({
            activePuzzle: puzzle,
            committedAngles: committed,
            status: 'PLAYING',
            moves: [],
            elapsedSeconds: 0,
            hintsUsed: 0,
            isHintLoading: false,
            hintData: null,
        });
    },

    commitMirrorAngle: (mirrorId, angle) => {
        set((state) => {
            if (state.status !== 'PLAYING') return state;
            const isHintUsed = state.hintData?.mirrorId === mirrorId && state.hintData?.suggestedAngle === angle;
            return {
                committedAngles: { ...state.committedAngles, [mirrorId]: angle },
                moves: [...state.moves, { wasHint: isHintUsed, mirrorId, timeSeconds: state.elapsedSeconds }],
                hintData: isHintUsed ? null : state.hintData, // Hint tüketildi
            };
        });
    },

    onPuzzleSolved: (_fills) => {
        set({ status: 'SOLVED' });
    },

    requestHint: async (coords: CoordinateSystem) => {
        const { activePuzzle, status, isHintLoading } = get();
        if (!activePuzzle || status !== 'PLAYING' || isHintLoading) return;

        set({ isHintLoading: true });
        try {
            // Container üzerinden Hint hesapla (AdMob Reward dahil)
            const hint = await useHintCase.execute(activePuzzle, coords);

            // Tüm aynalar için doğru açıyı uygula
            const angles = hint.mirrorAngles;
            for (const [mirrorId, angle] of Object.entries(angles)) {
                get().commitMirrorAngle(mirrorId, angle);
            }

            set({ hintData: null, hintsUsed: get().hintsUsed + 1 });
        } catch (e) {
            console.error('Hint alınamadı (reklam izlenmedi vs)', e);
        } finally {
            set({ isHintLoading: false });
        }
    },

    tick: () => {
        set((state) => {
            if (state.status !== 'PLAYING') return state;
            return { elapsedSeconds: state.elapsedSeconds + 1 };
        });
    },

    resetPuzzle: () => {
        const { activePuzzle } = get();
        if (activePuzzle) {
            get().loadPuzzle(activePuzzle);
        }
    },

    setSnapMode: (mode) => {
        set({ snapMode: mode });
    },

    setShowTutorial: (show) => {
        set({ showTutorial: show });
    },

    markTutorialAsSeen: () => {
        localStorage.setItem('tutorialSeen', 'true');
        set({ hasSeenTutorial: true });
    },
}));
