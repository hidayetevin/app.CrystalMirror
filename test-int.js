class Vector2D {
    constructor(x, y) { this.x = x; this.y = y; }
    dot(v) { return this.x * v.x + this.y * v.y; }
    reflect(normal) {
        const d = 2 * this.dot(normal);
        return new Vector2D(this.x - d * normal.x, this.y - d * normal.y);
    }
}

function raySegmentIntersection(origin, direction, segment) {
    const dx = segment.end.x - segment.start.x;
    const dy = segment.end.y - segment.start.y;

    const denom = direction.x * dy - direction.y * dx;
    if (Math.abs(denom) < 1e-10) return null;

    const tx = segment.start.x - origin.x;
    const ty = segment.start.y - origin.y;

    const t = (tx * dy - ty * dx) / denom;
    const s = (tx * direction.y - ty * direction.x) / denom;

    if (t < 0.001 || s < 0 || s > 1) return null;

    return {
        point: new Vector2D(origin.x + t * direction.x, origin.y + t * direction.y),
        t, s
    };
}

const origin = new Vector2D(50, 100);
const direction = new Vector2D(1, 0); // (1, 0)
const angleDegrees = 115;
const rad = angleDegrees * Math.PI / 180;
const center = new Vector2D(350, 100);
const halfLen = 45;

const segment = {
    start: new Vector2D(
        center.x - Math.cos(rad) * halfLen,
        center.y - Math.sin(rad) * halfLen
    ),
    end: new Vector2D(
        center.x + Math.cos(rad) * halfLen,
        center.y + Math.sin(rad) * halfLen
    )
};

console.log("Segment:", segment);

const hit = raySegmentIntersection(origin, direction, segment);
console.log("Hit:", hit);

if (hit) {
    const n1 = new Vector2D(-Math.sin(rad), Math.cos(rad));
    const n2 = new Vector2D(Math.sin(rad), -Math.cos(rad));
    const normal = direction.dot(n1) < 0 ? n1 : n2;
    console.log("Normal:", normal);
    const ref = direction.reflect(normal);
    console.log("Reflected:", ref);
}

