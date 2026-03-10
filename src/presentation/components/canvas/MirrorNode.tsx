import React, { memo } from 'react';
import { Group, Line } from 'react-konva';
import { CoordinateSystem } from '../../../domain/value-objects/CoordinateSystem';
import { Mirror } from '../../../domain/entities/Mirror';
import { Vector2D } from '../../../domain/value-objects/Vector2D';
import { useEconomyStore } from '../../store';

interface Props {
    mirror: Mirror;
    coords: CoordinateSystem;
    isSelected?: boolean;
    isHinted?: boolean;
    crystalPixelPos?: Vector2D; // Hedef kristal piksel konumu (engel çizimi için)
    onSelect?: (id: string) => void;
    onDragEnd?: (id: string, col: number, row: number) => void;
    tempAngle?: number; // Sürükleme (rotation wheel) anında sadece o kare için açı
}

export const MirrorNode: React.FC<Props> = memo(({
    mirror, coords, isSelected, isHinted, crystalPixelPos, onSelect, onDragEnd, tempAngle
}) => {
    const pixelPos = coords.gridToPixel(mirror.position);
    const drawAngle = tempAngle !== undefined ? tempAngle : mirror.angleDegrees;
    const isSlide = mirror.type === 'SLIDE';
    const isFinisher = mirror.isFinisher === true;

    // Alınan skin
    const mirrorSkin = useEconomyStore(s => s.equippedItems.mirrorSkin);

    const len = coords.cellSize * 0.9;
    const halfLen = coords.cellSize * 0.45;

    // Engel çubuğu geometrisi — bitirici olmayan aynalar ve kristal pozisyonu biliniyorsa
    let blockerPoints: number[] | null = null;
    if (!isFinisher && crystalPixelPos) {
        // Ayna → Kristal vektörü (Group local koordinat: merkez 0,0)
        const dx = crystalPixelPos.x - pixelPos.x;
        const dy = crystalPixelPos.y - pixelPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
            // Normalize yön (ayna → kristal)
            const nx = dx / dist;
            const ny = dy / dist;

            // Engel konumu: aynadan %40 ilerlemede (kristale yakın ama aynaya değil)
            const offsetDist = Math.min(dist * 0.4, coords.cellSize * 0.7);
            const bx = nx * offsetDist;
            const by = ny * offsetDist;

            // Engel yönü: ayna→kristal doğrultusuna DİK (90° döndür)
            const perpX = -ny;
            const perpY = nx;

            blockerPoints = [
                bx - perpX * halfLen,
                by - perpY * halfLen,
                bx + perpX * halfLen,
                by + perpY * halfLen,
            ];
        }
    }

    return (
        <Group
            x={pixelPos.x}
            y={pixelPos.y}
            draggable={isSlide && mirror.isMovable}
            onMouseDown={() => onSelect?.(mirror.id)}
            onTouchStart={() => onSelect?.(mirror.id)}
            onDragEnd={(e) => {
                if (!isSlide || !onDragEnd) return;
                const px = new Vector2D(e.target.x(), e.target.y());
                const cell = coords.pixelToGrid(px);
                onDragEnd(mirror.id, cell.col, cell.row);
                e.target.position({ x: coords.gridToPixel(cell).x, y: coords.gridToPixel(cell).y });
            }}
            dragBoundFunc={(pos) => pos}
        >
            {/* Etkileşim için kalın hit alanı */}
            <Line
                points={[-len / 2, 0, len / 2, 0]}
                stroke="transparent"
                strokeWidth={30}
                rotation={drawAngle}
            />

            {/* Görünür ayna çizgisi */}
            <Line
                points={[-len / 2, 0, len / 2, 0]}
                stroke={
                    isSelected
                        ? '#FFD700'
                        : isHinted
                            ? '#FFFFFF'          // İpucu → Parlak Beyaz
                            : isFinisher
                                ? '#39FF14'      // Bitirici → Neon Yeşil
                                : mirrorSkin === 'neon_mirror' ? '#FF2A85'
                                    : mirrorSkin === 'dark_mirror' ? '#0D0D12'
                                        : '#80DEEA'      // Normal → Cyan
                }
                strokeWidth={isSelected ? 6 : isHinted ? 6 : isFinisher ? 5 : mirrorSkin === 'dark_mirror' ? 6 : 4}
                rotation={drawAngle}
                shadowColor={
                    isSelected
                        ? '#FFD700'
                        : isHinted
                            ? '#CC44FF'          // İpucu → Mor glow
                            : isFinisher
                                ? '#39FF14'
                                : mirrorSkin === 'neon_mirror' ? '#FF2A85'
                                    : mirrorSkin === 'dark_mirror' ? '#9C27B0'
                                        : 'transparent'
                }
                shadowBlur={isSelected ? 10 : isHinted ? 25 : isFinisher ? 20 : mirrorSkin !== 'default_mirror' ? 15 : 0}
                lineCap="round"
            />
            {/* İpucu: ikinci glow katmanı (daha parlak görünsün) */}
            {isHinted && (
                <Line
                    points={[-len / 2, 0, len / 2, 0]}
                    stroke="#CC44FF"
                    strokeWidth={2}
                    rotation={drawAngle}
                    shadowColor="#CC44FF"
                    shadowBlur={15}
                    lineCap="round"
                    opacity={0.6}
                />
            )}

            {/* Yeşil Engel Çubuğu — bitirici olmayan aynalarda kristale bakan tarafta */}
            {blockerPoints && (
                <Line
                    points={blockerPoints}
                    stroke="#FF4444"
                    strokeWidth={3}
                    shadowColor="#FF0000"
                    shadowBlur={10}
                    lineCap="round"
                    opacity={0.9}
                />
            )}

            {/* Mekanik işareti */}
            {isSlide && (
                <Line points={[-10, -10, 10, 10, -10, 10, 10, -10]} stroke="#FFFFFF" strokeWidth={1} opacity={0.3} />
            )}
        </Group>
    );
});

MirrorNode.displayName = 'MirrorNode';
