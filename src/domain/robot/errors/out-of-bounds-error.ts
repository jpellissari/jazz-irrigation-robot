import { IDomainError } from '../../../core/errors/domain-error';

export class OutOfBoundsError extends Error implements IDomainError {
  constructor() {
    super('Out Of Bounds');
    this.name = 'OutOfBoundsError';
  }
}
