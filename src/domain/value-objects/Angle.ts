/**
 * Açı değer nesnesi — derece/radyan dönüşümleri.
 * Domain-layer — zero 3rd-party imports.
 */
export class Angle {
    private constructor(private readonly _degrees: number) { }

    static fromDegrees(degrees: number): Angle {
        return new Angle(((degrees % 360) + 360) % 360); // 0-360 normalize
    }

    static fromRadians(radians: number): Angle {
        return Angle.fromDegrees((radians * 180) / Math.PI);
    }

    get degrees(): number {
        return this._degrees;
    }

    get radians(): number {
        return (this._degrees * Math.PI) / 180;
    }

    add(other: Angle): Angle {
        return Angle.fromDegrees(this._degrees + other._degrees);
    }

    negate(): Angle {
        return Angle.fromDegrees(360 - this._degrees);
    }

    equals(other: Angle): boolean {
        return Math.abs(this._degrees - other._degrees) < 0.001;
    }

    toString(): string {
        return `Angle(${this._degrees.toFixed(1)}°)`;
    }
}
