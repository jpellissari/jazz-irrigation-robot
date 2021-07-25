import { IDomainError } from '../../../core/errors/domain-error'

export class InvalidHeadingError extends Error implements IDomainError {
  constructor () {
    super('Invalid heading')
    this.name = 'InvalidHeadingError'
  }
}
