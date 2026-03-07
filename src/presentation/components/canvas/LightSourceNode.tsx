import React, { memo, useEffect, useRef } from 'react';
import { Circle, Group, Line } from 'react-konva';
import Konva from 'konva';
import { CoordinateSystem } from '../../../domain/value-objects/CoordinateSystem';
import { LightSource } from '../../../domain/entities/LightSource';

interface Props {
    lightSource: LightSource;
    coords: CoordinateSystem;
}

export const LightSourceNode: React.FC<Props> = memo(({ lightSource, coords }) => {
    const pixelPos = coords.gridToPixel(lightSource.position);
    const radius = coords.cellSize * 0.25;

    // Renk belirleme (ışık kaynağının rengine göre)
    const baseColor = lightSource.color === 'RED' ? '#FF4444' :
        lightSource.color === 'BLUE' ? '#4488FF' :
            lightSource.color === 'YELLOW' ? '#FFCC00' : '#FFFFFF';

    // Animasyon ref'leri
    const outerGlowRef = useRef<Konva.Circle | null>(null);
    const coreGlowRef = useRef<Konva.Circle | null>(null);

    useEffect(() => {
        // Işık kaynağı sürekli parlar (pulsing animasyonu)
        const DURATION = 2000;

        const anim = new Konva.Animation((frame) => {
            if (!frame) return;
            // 0 ile 1 arasında sürekli gidip gelen bir değer (sine wave)
            const t = (Math.sin(frame.time / (DURATION / Math.PI)) + 1) / 2;

            if (outerGlowRef.current) {
                // Dış hale büyüyüp küçülür
                const scale = 1 + (t * 0.4);
                outerGlowRef.current.scaleX(scale);
                outerGlowRef.current.scaleY(scale);
                outerGlowRef.current.opacity(0.3 - (t * 0.1));
            }

            if (coreGlowRef.current) {
                // İç çekirdek yoğunluğu hafif değişir
                coreGlowRef.current.shadowBlur(15 + (t * 10));
            }
        }, outerGlowRef.current?.getLayer() ?? undefined);

        anim.start();

        return () => {
            anim.stop();
        };
    }, []);

    // Işık kaynağının yönüne işaret eden kısa bir çubuk (optional)
    const dirLength = radius * 1.5;
    const dirLine = [0, 0, lightSource.direction.x * dirLength, lightSource.direction.y * dirLength];

    // Merkezdeki beyaz çekirdek (çok parlak)
    const coreRadius = radius * 0.4;

    return (
        <Group x={pixelPos.x} y={pixelPos.y}>
            {/* Dış yayılan dalga (animated) */}
            <Circle
                ref={outerGlowRef}
                x={0}
                y={0}
                radius={radius * 1.5}
                fill={baseColor}
                opacity={0.2}
                listening={false}
            />

            {/* Dış çerçeve */}
            <Circle
                x={0}
                y={0}
                radius={radius}
                stroke={baseColor}
                strokeWidth={2}
                opacity={0.8}
                shadowColor={baseColor}
                shadowBlur={10}
            />

            {/* Yön gösterici uç */}
            <Line
                points={dirLine}
                stroke={baseColor}
                strokeWidth={3}
                lineCap="round"
                opacity={0.9}
                shadowColor={baseColor}
                shadowBlur={5}
            />

            {/* İç ateş çekirdeği (animated glow) */}
            <Circle
                ref={coreGlowRef}
                x={0}
                y={0}
                radius={coreRadius}
                fill="#FFFFFF"
                shadowColor={baseColor}
                shadowBlur={20}
            />
        </Group>
    );
});

LightSourceNode.displayName = 'LightSourceNode';
