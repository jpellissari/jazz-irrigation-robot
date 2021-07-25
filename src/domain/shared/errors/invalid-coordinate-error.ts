import { IDomainError } from '../../../core/errors/domain-error';

export class InvalidCoordinateError extends Error implements IDomainError {
  constructor() {
    super('Invalid coordinate');
    this.name = 'InvalidCoordinateError';
    this.message = 'Coordinate must not be negative';
  }
}
