import { createGardenRepositorySingleton } from '../../../repositories/implementations';
import { CreateGardenController } from './create-garden-controller';
import { CreateGardenUseCase } from './create-garden-use-case';

const createGardenUseCase = new CreateGardenUseCase(
  createGardenRepositorySingleton,
);

const createGardenController = new CreateGardenController(createGardenUseCase);

export { createGardenController };
