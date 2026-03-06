/**
 * Geliştirme/Web ortamı için titreşim mock'u.
 */
import { HapticEvent, IHapticService } from './HapticService';

export class MockHapticService implements IHapticService {
    async trigger(_event: HapticEvent): Promise<void> { }
    setEnabled(_enabled: boolean): void { }
}
