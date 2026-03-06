import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Layer, Line, Group, Rect } from 'react-konva';
import { RaySegment } from '../../../domain/physics/RaycastEngine';
import { ChromaticAberration, AberrationLine } from './ChromaticAberration';

interface Props {
    segments: RaySegment[];
    worldId: string; // 'forest' | 'glacier' | 'waterfall'
}

export const LightRayLayer: React.FC<Props> = React.memo(({ segments, worldId }) => {
    // Dünyaya göre offset ayarı (CSS değişkenlerini simüle et, çünkü Konva canvas içinde)
    const abOffset = worldId === 'glacier' ? 2 : worldId === 'waterfall' ? 1.5 : 1;

    // Performans için glow rengi hex matrisi
    const hexMap: Record<string, string> = {
        'WHITE': '#FFFFFF',
        'RED': '#FF0000',
        'BLUE': '#00FFFF',
        'YELLOW': '#FFD700',
        'PRISM': '#E1BEE7'
    };

    const drawArray = useMemo(() => {
        const list: React.ReactNode[] = [];

        segments.forEach((seg, i) => {
            const color = hexMap[seg.color] || '#FFFFFF';
            const key = `ray_${i}_${seg.start.x}_${seg.end.x}`;

            const points = [seg.start.x, seg.start.y, seg.end.x, seg.end.y];

            // Sadece sekme (bounce) sonrası efektleri uygula
            const applyAberration = i > 0 && true; // confige bağlayabiliriz 'onlyAfterBounce'

            if (applyAberration) {
                const abs = ChromaticAberration.buildAberrationLines(seg, {
                    offset: abOffset, opacity: 0.25, onlyAfterBounce: true
                });

                abs.forEach((ab, j) => {
                    list.push(
                        <Line
                            key={`${key}_ab_${j}`}
                            points={ab.points}
                            stroke={ab.color}
                            strokeWidth={ab.strokeWidth}
                            opacity={ab.opacity}
                            tension={0}
                            globalCompositeOperation="screen"
                        />
                    );
                });
            }

            // Ana Işın (Center)
            list.push(
                <Line
                    key={key}
                    points={points}
                    stroke={color}
                    strokeWidth={applyAberration ? 2.5 : 3.5}
                    shadowColor={color}
                    shadowBlur={applyAberration ? 12 : 20}
                    shadowOpacity={0.8}
                    lineCap="round"
                    opacity={0.92}
                />
            );
        });

        return list;
    }, [segments, abOffset]); // Sadece veriler değişirse React Konva Tree'yi sıfırdan kurar

    return <Layer>{drawArray}</Layer>;
});

LightRayLayer.displayName = 'LightRayLayer';
