import React, { memo } from 'react';
import { Group, Line } from 'react-konva';
import { CoordinateSystem } from '../../../domain/value-objects/CoordinateSystem';
import { Mirror } from '../../../domain/entities/Mirror';
import { Vector2D } from '../../../domain/value-objects/Vector2D';

interface Props {
    mirror: Mirror;
    coords: CoordinateSystem;
    isSelected?: boolean;
    isHinted?: boolean;
    crystalPixelPos?: Vector2D; // Hedef kristal piksel konumu (engel çizimi için)
    onSelect?: () => void;
    onDragEnd?: (col: number, row: number) => void;
    tempAngle?: number; // Sürükleme (rotation wheel) anında sadece o kare için açı
}

export const MirrorNode: React.FC<Props> = memo(({
    mirror, coords, isSelected, isHinted, crystalPixelPos, onSelect, onDragEnd, tempAngle
}) => {
    const pixelPos = coords.gridToPixel(mirror.position);
    const drawAngle = tempAngle !== undefined ? tempAngle : mirror.angleDegrees;
    const isSlide = mirror.type === 'SLIDE';
    const isFinisher = mirror.isFinisher === true;

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
            onMouseDown={onSelect}
            onTouchStart={onSelect}
            onDragEnd={(e) => {
                if (!isSlide || !onDragEnd) return;
                const px = new Vector2D(e.target.x(), e.target.y());
                const cell = coords.pixelToGrid(px);
                onDragEnd(cell.col, cell.row);
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
                stroke={isSelected ? '#FFD700' : isHinted ? '#4CAF50' : '#80DEEA'}
                strokeWidth={isSelected ? 6 : 4}
                rotation={drawAngle}
                shadowColor={isSelected ? '#FFD700' : 'transparent'}
                shadowBlur={isSelected ? 10 : 0}
                lineCap="round"
            />

            {/* Yeşil Engel Çubuğu — bitirici olmayan aynalarda kristale bakan tarafta */}
            {blockerPoints && (
                <Line
                    points={blockerPoints}
                    stroke="#4CAF50"
                    strokeWidth={3}
                    shadowColor="#4CAF50"
                    shadowBlur={8}
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
