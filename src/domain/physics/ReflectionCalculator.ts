/**
 * Düzlem aynada yansıma açısı hesaplama.
 * R = D - 2(D·N)N
 * Domain-layer — zero 3rd-party imports.
 */
import { Vector2D } from '../value-objects/Vector2D';

/**
 * Gelen ışın yönünden yansıyan ışın yönünü hesaplar.
 * @param incident - Gelen ışın yön vektörü (normalize edilmiş olmalı)
 * @param normal   - Ayna yüzeyine dik birim normal
 * @returns Yansıyan ışın yön vektörü (normalize edilmiş)
 */
export function calculateReflection(
    incident: Vector2D,
    normal: Vector2D
): Vector2D {
    return incident.reflect(normal).normalize();
}
