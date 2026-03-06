import React, { memo } from 'react';
import { Circle, Group, Line } from 'react-konva';
import { CoordinateSystem } from '../../../domain/value-objects/CoordinateSystem';
import { Crystal } from '../../../domain/entities/Crystal';

interface Props {
    crystal: Crystal;
    coords: CoordinateSystem;
    fillLevel: number; // 0.0 - 1.0 (Ref veya Store'dan gelir)
}

export const CrystalNode: React.FC<Props> = memo(({ crystal, coords, fillLevel }) => {
    const pixelPos = coords.gridToPixel(crystal.position);
    const radius = coords.cellSize * 0.35; // Collision detector ile eşleşmeli

    // Renk belirleme
    const baseColor = crystal.color === 'RED' ? '#FF4444' :
        crystal.color === 'BLUE' ? '#4488FF' :
            crystal.color === 'YELLOW' ? '#FFCC00' :
                crystal.color === 'PRISM' ? '#E1BEE7' : '#FFFFFF';

    const isFilled = fillLevel >= 1.0;

    return (
        <Group x={pixelPos.x} y={pixelPos.y}>
            <Circle
                x={0}
                y={0}
                radius={radius}
                stroke={crystal.isTarget ? '#FFD700' : '#333'}
                strokeWidth={crystal.isTarget ? 3 : 1}
                fill={isFilled ? baseColor : 'transparent'}
                shadowColor={isFilled ? baseColor : 'transparent'}
                shadowBlur={isFilled ? 20 : 0}
            />

            {/* Eğer prizma ise ufak bir çokgen ikon */}
            {crystal.color === 'PRISM' && (
                <Line
                    points={[0, -radius * 0.6, radius * 0.6, radius * 0.4, -radius * 0.6, radius * 0.4]}
                    closed
                    stroke={isFilled ? '#FFFFFF' : '#E1BEE7'}
                    strokeWidth={2}
                    opacity={0.7}
                />
            )}
        </Group>
    );
});

CrystalNode.displayName = 'CrystalNode';
