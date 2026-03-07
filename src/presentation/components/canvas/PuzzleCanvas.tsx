import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { usePuzzleStore } from '../../store';
import { useRaycastLoop } from '../../hooks/useRaycastLoop';
import { useCanvasSize } from '../../hooks/useCanvasSize';
import { rotateMirrorCase, slideMirrorCase } from '../../../container';
import { MirrorNode } from './MirrorNode';
import { CrystalNode } from './CrystalNode';
import { LightRayLayer } from './LightRayLayer';
import { RotationWheel } from './RotationWheel';
import { RaySegment } from '../../../domain/physics/RaycastEngine';
import { CoordinateSystem } from '../../../domain/value-objects/CoordinateSystem';

interface WheelState {
    mirrorId: string;
    angle: number;
}

export const PuzzleCanvas: React.FC = () => {
    const puzzle = usePuzzleStore((s) => s.activePuzzle);
    const status = usePuzzleStore((s) => s.status);
    const snapMode = usePuzzleStore((s) => s.snapMode);
    const commitMirrorAngle = usePuzzleStore((s) => s.commitMirrorAngle);
    const committedAngles = usePuzzleStore((s) => s.committedAngles);
    const setSnapMode = usePuzzleStore((s) => s.setSnapMode);

    // Renders every size tick
    const coords = useCanvasSize(puzzle?.gridSize.cols || 6, puzzle?.gridSize.rows || 8);

    // -- Ephemeral State (Zustand Dışı 60FPS Data) --
    const isDirtyRef = useRef(true); // Illk render pası için kirli
    const [segments, setSegments] = useState<RaySegment[]>([]);
    const [fills, setFills] = useState<Map<string, number>>(new Map());

    // -- UI State (Wheel Component) --
    const [wheelState, setWheelState] = useState<WheelState | null>(null);

    // useRaycastLoop'un DOM tetiklemeli callback'leri
    const handleDrawUpdate = useCallback((newSegs: RaySegment[], newFills: Map<string, number>) => {
        setSegments(newSegs);
        setFills(newFills);
    }, []);

    const handleWin = useCallback(() => {
        // usePuzzleStore().onPuzzleSolved cagrilacak
        usePuzzleStore.getState().onPuzzleSolved(fills);
    }, [fills]);

    // Hook -> loop basliyor
    const { setEphemeralAngle, ephemeralAngles } = useRaycastLoop({
        coords,
        isDirtyRef,
        onDrawUpdate: handleDrawUpdate,
        onWin: handleWin,
        onSnapChange: (snap) => {
            /* Haptic servisi cagirisi RotationWheel icinden state'lere bagli gerceklesebilir 
               veya useRaycastLoop icinden firlatilir. (Mimari metinde onSnapChange ici tarifli) */
        }
    });

    if (!puzzle || !coords) return null;

    const stageWidth = coords.offsetX * 2 + coords.cellSize * puzzle.gridSize.cols;
    const stageHeight = coords.offsetY * 2 + coords.cellSize * puzzle.gridSize.rows;

    const handleSelectMirror = (mirrorId: string) => {
        if (status !== 'PLAYING') return;
        const mirror = puzzle.mirrors.find(m => m.id === mirrorId);
        if (mirror && mirror.type === 'ROTATE' && mirror.isMovable) {
            setWheelState({ mirrorId, angle: ephemeralAngles[mirrorId] ?? mirror.angleDegrees });
        }
    };

    const handleWheelRotate = (rawDegrees: number) => {
        if (!wheelState) return;
        // RotateMirrorUseCase kullanarak Snap kontrolü yap (Domain Mantigi)
        const stateUpdate = rotateMirrorCase.execute(puzzle, wheelState.mirrorId, rawDegrees, coords, snapMode);

        // Sadece aciyi raycastLoop'a ver
        setEphemeralAngle(wheelState.mirrorId, stateUpdate.snapResult?.finalAngle ?? rawDegrees);
        setWheelState({ ...wheelState, angle: rawDegrees }); // Ekrandaki dondurulen ok
    };

    const handleWheelUp = () => {
        if (!wheelState) return;
        // Gercek store commit:
        commitMirrorAngle(wheelState.mirrorId, ephemeralAngles[wheelState.mirrorId]);
        setWheelState(null); // kapat
    };

    const handleDragEnd = (mirrorId: string, col: number, row: number) => {
        if (status !== 'PLAYING') return;
        // Store uzerinden SlideMirrorUseCase tetikle. 
        // Konva nesne snap islemine useCase icinde collision tespiti de eklenmis oldu
        // (Not: Store commit karsilikli tasarlanmadi, UseCase store icine gomme veya burada setPuzzle gerekebilir. 
        // Mimari sadeligi adina: puzzleStore.setPuzzle yazilmamis! Bu metin guncellemesinde bunu Store'a loadPuzzle gibi yansitiriz.)
        const updated = slideMirrorCase.execute(puzzle, mirrorId, { col, row }, coords);
        if (updated.puzzle !== puzzle) {
            usePuzzleStore.getState().loadPuzzle(updated.puzzle);
        }
    };

    return (
        <div style={{ position: 'relative', width: stageWidth, height: stageHeight, margin: '0 auto' }}>

            {/* Konva Katmanı */}
            <Stage width={stageWidth} height={stageHeight}>
                {/* Background / Grid Layer */}
                <Layer>
                    {/* Arkaplan */}
                    <Rect x={0} y={0} width={stageWidth} height={stageHeight} fill="var(--bg-primary)" />
                    {/* Ortalanmış Grid Göstergesi (Opsiyonel Çizgiler) */}
                    <Rect
                        x={coords.offsetX} y={coords.offsetY}
                        width={coords.cellSize * puzzle.gridSize.cols}
                        height={coords.cellSize * puzzle.gridSize.rows}
                        stroke="rgba(255,255,255,0.1)" strokeWidth={1}
                    />
                </Layer>

                {/* Işınlar */}
                <LightRayLayer segments={segments} worldId={puzzle.worldId} />

                {/* Nesneler */}
                <Layer>
                    {/* Kristaller */}
                    {puzzle.crystals.map(c => (
                        <CrystalNode key={c.id} crystal={c} coords={coords} fillLevel={fills.get(c.id) ?? 0} />
                    ))}

                    {/* Aynalar */}
                    {(() => {
                        const targetCrystal = puzzle.crystals.find(c => c.isTarget);
                        const crystalPixelPos = targetCrystal ? coords.gridToPixel(targetCrystal.position) : undefined;
                        return puzzle.mirrors.map(m => {
                            const isSelected = wheelState?.mirrorId === m.id;
                            let drawAngle = m.angleDegrees;
                            if (isSelected && ephemeralAngles[m.id] !== undefined) {
                                drawAngle = ephemeralAngles[m.id];
                            } else if (committedAngles[m.id] !== undefined) {
                                drawAngle = committedAngles[m.id];
                            }

                            return (
                                <MirrorNode
                                    key={m.id}
                                    mirror={m}
                                    coords={coords}
                                    tempAngle={drawAngle}
                                    isSelected={isSelected}
                                    crystalPixelPos={crystalPixelPos}
                                    onSelect={() => handleSelectMirror(m.id)}
                                    onDragEnd={(col, row) => handleDragEnd(m.id, col, row)}
                                />
                            );
                        });
                    })()}
                </Layer>
            </Stage>

            {/* Absolute HTML Katmanı (RotationWheel) */}
            {wheelState && (
                <WheelOverlay
                    mirrorId={wheelState.mirrorId}
                    ephemeralAngle={wheelState.angle}
                    coords={coords}
                    puzzle={puzzle}
                    snapMode={snapMode}
                    onRotate={handleWheelRotate}
                    onMouseUp={handleWheelUp}
                    onToggleSnap={() => setSnapMode(snapMode === 'GUIDED' ? 'FREE' : 'GUIDED')}
                />
            )}
        </div>
    );
};

/* Ikinci kucuk bilesen - Wheel Position hesaplamalari icin */
const WheelOverlay: React.FC<any> = ({ mirrorId, ephemeralAngle, coords, puzzle, snapMode, onRotate, onMouseUp, onToggleSnap }) => {
    const mirror = puzzle.mirrors.find((m: any) => m.id === mirrorId);
    if (!mirror) return null;

    const pixelPos = coords.gridToPixel(mirror.position);

    // Spawn kurali: Ust/Alt bosluk kontrolu
    const canvasHeight = coords.offsetY * 2 + coords.cellSize * puzzle.gridSize.rows;
    const spawnBelow = pixelPos.y < canvasHeight / 2;
    const wheelY = spawnBelow
        ? pixelPos.y + coords.cellSize * 1.8
        : pixelPos.y - coords.cellSize * 1.8;
    const wheelX = pixelPos.x;

    return (
        <RotationWheel
            x={wheelX}
            y={wheelY}
            currentAngle={ephemeralAngle}
            isFreeMode={snapMode === 'FREE'}
            onRotate={onRotate}
            onMouseUp={onMouseUp}
            onToggleSnap={onToggleSnap}
        />
    );
};
