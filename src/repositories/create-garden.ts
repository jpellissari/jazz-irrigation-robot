import { createGardenDTO } from '../domain/garden/garden';

export interface ICreateGardenRepository {
  create(gardenData: createGardenDTO): Promise<void>;
}
