import { IDomainError } from '../../../core/errors/domain-error'

export class InvalidSizeError extends Error implements IDomainError {
  constructor () {
    super('Invalid size')
    this.name = 'InvalidSizeError'
    this.message = 'Size must be greater than 0'
  }
}
