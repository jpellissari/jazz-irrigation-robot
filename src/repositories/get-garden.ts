import { Garden } from '../domain/garden/garden';

export interface IGetGardenRepository {
  get(): Promise<Garden>;
}
