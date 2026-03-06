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
    onSelect?: () => void;
    onDragEnd?: (col: number, row: number) => void;
    tempAngle?: number; // Sürükleme (rotation wheel) anında sadece o kare için açı
}

export const MirrorNode: React.FC<Props> = memo(({
    mirror, coords, isSelected, isHinted, onSelect, onDragEnd, tempAngle
}) => {
    const pixelPos = coords.gridToPixel(mirror.position);
    // Eğer gesture varsa anlık açıyı (tempAngle) kullan, yoksa committed olanı
    const drawAngle = tempAngle !== undefined ? tempAngle : mirror.angleDegrees;
    const isSlide = mirror.type === 'SLIDE';

    // Çizgi boyutu
    const len = coords.cellSize * 0.9;

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
                // snap konumu geçici olarak kendi e.target'ini resetlesin, useCase handle edecek
                e.target.position({ x: coords.gridToPixel(cell).x, y: coords.gridToPixel(cell).y });
            }}
            dragBoundFunc={(pos) => {
                // Slide modunda sadece ortalanmış hücrelere git
                return pos;
            }}
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

            {/* Mekanik işareti veya eksenler */}
            {mirror.type === 'SLIDE' && (
                <Line points={[-10, -10, 10, 10, -10, 10, 10, -10]} stroke="#FFFFFF" strokeWidth={1} opacity={0.3} />
            )}
        </Group>
    );
});

MirrorNode.displayName = 'MirrorNode';
