import { Garden } from '../../domain/garden/garden';
import { IGetGardenRepository } from '../get-garden';
import { ISaveGardenRepository } from '../save-garden';

export class GardenRepository
  implements ISaveGardenRepository, IGetGardenRepository
{
  private garden: Garden;

  async get(): Promise<Garden> {
    return this.garden;
  }

  async save(garden: Garden): Promise<void> {
    this.garden = garden;
  }
}
