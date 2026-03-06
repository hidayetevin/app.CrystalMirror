import { useRef, useEffect, MutableRefObject } from 'react';
import { usePuzzleStore } from '../store';
import { raycastEngine, winChecker, checkWinConditionCase, hapticService } from '../../container';
import { Mirror } from '../../domain/entities/Mirror';
import { RaySegment, TraceResult } from '../../domain/physics/RaycastEngine';
import { SnapResult } from '../../domain/rules/MagneticSnapService';

interface RaycastLoopProps {
    // Animasyon döngüsünde değişiklik yapıp yapmayacağını kontrol eden flag (Performans)
    isDirtyRef: MutableRefObject<boolean>;
    onDrawUpdate: (segments: RaySegment[], fills: Map<string, number>) => void;
    onWin: () => void;
    onSnapChange: (result: SnapResult) => void;
}

export function useRaycastLoop({
    isDirtyRef,
    onDrawUpdate,
    onWin,
    onSnapChange
}: RaycastLoopProps) {
    const storePuzzle = usePuzzleStore((s) => s.activePuzzle);
    const status = usePuzzleStore((s) => s.status);
    const committedAngles = usePuzzleStore((s) => s.committedAngles);

    // Anlık ayna açıları (Zustand yerine burada yaşar)
    const ephemeralAngles = useRef<Record<string, number>>({});
    const hasWonRef = useRef(false);
    const lockRef = useRef(false);

    // Store'daki "committed" açılar geldiğinde temp stateleri eşitle
    useEffect(() => {
        if (storePuzzle && status === 'PLAYING') {
            ephemeralAngles.current = { ...committedAngles };
            hasWonRef.current = false;
            lockRef.current = false;
            isDirtyRef.current = true;
        }
    }, [storePuzzle?.id, status, committedAngles, isDirtyRef]);

    // Ana çizim döngüsü (60fps hedefli, ama sadece isDirty true iken izler)
    useEffect(() => {
        let rafId: number;

        const tick = () => {
            // Optimizasyon: Yalnızca kirli ise veya oyun devam ediyorsa
            if (!isDirtyRef.current || !storePuzzle || lockRef.current) {
                rafId = requestAnimationFrame(tick);
                return;
            }

            // Geçici puzzle kopyasını ephemeral açılarıyla birleştir
            const tempMirrors: Mirror[] = storePuzzle.mirrors.map(m => ({
                ...m,
                angleDegrees: ephemeralAngles.current[m.id] ?? m.angleDegrees
            }));

            const activePuzzle = { ...storePuzzle, mirrors: tempMirrors };

            // Işın izleme (Hesaplama maliyeti, ancak DOM/React re-render işlemi YOK)
            let traceRes: TraceResult = { segments: [], crystalFills: new Map() };

            try {
                traceRes = raycastEngine.trace(activePuzzle);
                isDirtyRef.current = false; // Temizlendi

                onDrawUpdate(traceRes.segments, traceRes.crystalFills);

                // Kazanma kontrolünü yap
                const isWon = winChecker.check(activePuzzle, traceRes.crystalFills);
                if (isWon && !hasWonRef.current && status === 'PLAYING') {
                    hasWonRef.current = true;
                    lockRef.current = true;
                    // Hook'u kullanan parent'a kazanma durumu bildir.
                    // O da puzzleStore'u son duruma iter ve Zustand action çağırır.
                    onWin();
                }

            } catch (err) {
                console.error("Raycast error:", err);
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [storePuzzle, isDirtyRef, onDrawUpdate, onWin, status]);

    // Dışarıya sunulan manipülasyon yordamı (Sürklemelerde çağrılır)
    const setEphemeralAngle = (mirrorId: string, angle: number) => {
        ephemeralAngles.current[mirrorId] = angle;
        isDirtyRef.current = true;
    };

    return {
        setEphemeralAngle,
        get ephemeralAngles() { return ephemeralAngles.current; }
    };
}
