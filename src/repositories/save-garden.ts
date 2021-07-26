import { Garden } from '../domain/garden/garden';

export interface ISaveGardenRepository {
  save(garden: Garden): Promise<void>;
}
