import { IControllerError } from '../../core/errors/controller-error';

export class GardenNotCreatedError extends Error implements IControllerError {
  constructor() {
    super('Garden not created');
    this.name = 'GardenNotCreatedError';
  }
}
