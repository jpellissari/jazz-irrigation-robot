import { Garden } from '../../domain/garden/garden';
import { ISaveGardenRepository } from '../save-garden';

export class GardenRepository implements ISaveGardenRepository {
  private garden: Garden;

  async save(garden: Garden): Promise<void> {
    this.garden = garden;
  }
}
