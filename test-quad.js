class Vector2D {
    constructor(x, y) { this.x = x; this.y = y; }
    dot(v) { return this.x * v.x + this.y * v.y; }
    reflect(normal) {
        const d = 2 * this.dot(normal);
        return new Vector2D(this.x - d * normal.x, this.y - d * normal.y);
    }
}

for (let deg = 0; deg <= 360; deg += 30) {
    const rad = deg * Math.PI / 180;
    const n1 = new Vector2D(-Math.sin(rad), Math.cos(rad));
    const n2 = new Vector2D(Math.sin(rad), -Math.cos(rad));
    const rayDir = new Vector2D(1, 0);
    const normal = rayDir.dot(n1) < 0 ? n1 : n2;
    const r = rayDir.reflect(normal);
    console.log(`Angle ${deg} -> R = (${r.x.toFixed(2)}, ${r.y.toFixed(2)})`);
}
