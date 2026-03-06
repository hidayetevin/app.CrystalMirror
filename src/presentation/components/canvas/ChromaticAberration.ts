import { Vector2D } from '../../../domain/value-objects/Vector2D';
import { RaySegment } from '../../../domain/physics/RaycastEngine';

export interface AberrationLine {
    points: number[];
    color: string;
    opacity: number;
    strokeWidth: number;
}

interface AberrationConfig {
    offset: number;     // PIXEL_OFFSET
    opacity: number;    // %25 vb
    onlyAfterBounce: boolean;
}

export const ChromaticAberration = {
    buildAberrationLines(
        segment: RaySegment,
        config: AberrationConfig
    ): AberrationLine[] {
        const dir = new Vector2D(
            segment.end.x - segment.start.x,
            segment.end.y - segment.start.y
        ).normalize();

        // Yönün %90 derecelik dik normali
        const normal = new Vector2D(-dir.y, dir.x);

        // Kırmızı kanal (Pozitif offset)
        const redPoints = [
            segment.start.x + normal.x * config.offset, segment.start.y + normal.y * config.offset,
            segment.end.x + normal.x * config.offset, segment.end.y + normal.y * config.offset
        ];

        const bluePoints = [
            segment.start.x - normal.x * config.offset, segment.start.y - normal.y * config.offset,
            segment.end.x - normal.x * config.offset, segment.end.y - normal.y * config.offset
        ];

        return [
            { points: redPoints, color: '#FF0000', opacity: config.opacity, strokeWidth: 1.5 },
            { points: bluePoints, color: '#00FFFF', opacity: config.opacity, strokeWidth: 1.5 },
        ];
    }
};
