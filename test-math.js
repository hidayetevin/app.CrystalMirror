class Vector2D {
    constructor(x, y) { this.x = x; this.y = y; }
    dot(v) { return this.x * v.x + this.y * v.y; }
    reflect(normal) {
        const d = 2 * this.dot(normal);
        return new Vector2D(this.x - d * normal.x, this.y - d * normal.y);
    }
    normalize() {
        const len = Math.sqrt(this.x ** 2 + this.y ** 2);
        if (len === 0) return new Vector2D(0, 0);
        return new Vector2D(this.x / len, this.y / len);
    }
}

const dir = new Vector2D(1, 0);

for (let radDeg of [100, 120, 60]) {
    const rad = (radDeg * Math.PI) / 180;
    const n1 = new Vector2D(-Math.sin(rad), Math.cos(rad));
    const n2 = new Vector2D(Math.sin(rad), -Math.cos(rad));
    const normal = dir.dot(n1) < 0 ? n1 : n2;
    const ref = dir.reflect(normal).normalize();
    console.log(`Angle: ${radDeg}, Normal: ${normal.x.toFixed(3)}, ${normal.y.toFixed(3)} -> Ref: ${ref.x.toFixed(3)}, ${ref.y.toFixed(3)}`);
}

