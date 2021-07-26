import { createRobotRepositorySingleton } from '../../../repositories/implementations';
import { ResolvePathController } from './resolve-path-controller';
import { ResolvePathUseCase } from './resolve-path-use-case';

const resolvePathUseCase = new ResolvePathUseCase(
  createRobotRepositorySingleton,
);

const resolvePathController = new ResolvePathController(resolvePathUseCase);

export { resolvePathController };
