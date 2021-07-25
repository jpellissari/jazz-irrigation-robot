import { IDomainError } from '../../../core/errors/domain-error'

export class MissingIrrigablePatchError extends Error implements IDomainError {
  constructor () {
    super('Missing Irrigable Patch')
    this.name = 'MissingIrrigablePatchError'
    this.message = 'At least one patch must be irrigable'
  }
}
