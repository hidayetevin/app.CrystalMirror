/**
 * Immutable 2D vector value object.
 * Domain-layer — zero 3rd-party imports.
 */
export class Vector2D {
  constructor(readonly x: number, readonly y: number) {}

  add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }

  scale(s: number): Vector2D {
    return new Vector2D(this.x * s, this.y * s);
  }

  normalize(): Vector2D {
    const len = Math.sqrt(this.x ** 2 + this.y ** 2);
    if (len === 0) return new Vector2D(0, 0);
    return new Vector2D(this.x / len, this.y / len);
  }

  dot(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Yansıma: R = D - 2(D·N)N
   * normal: birim normal vektör (normalize edilmiş olmalı)
   */
  reflect(normal: Vector2D): Vector2D {
    const d = 2 * this.dot(normal);
    return new Vector2D(this.x - d * normal.x, this.y - d * normal.y);
  }

  /** İki vektör arasındaki açı (radyan) */
  angleTo(v: Vector2D): number {
    return Math.atan2(v.y - this.y, v.x - this.x);
  }

  /** İki nokta arası Öklid mesafesi */
  distanceTo(v: Vector2D): number {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  equals(v: Vector2D): boolean {
    return this.x === v.x && this.y === v.y;
  }

  toString(): string {
    return `Vector2D(${this.x.toFixed(3)}, ${this.y.toFixed(3)})`;
  }
}
