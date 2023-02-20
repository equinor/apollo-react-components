import { describe, expect, it } from 'vitest'
import { examplePerson, personSchema } from '../test-data/person'
import { createValidator } from './utils'

const validator = createValidator(personSchema)

describe('Test validator creation', () => {
  it('should return undefined on valid data', () => {
    const errors = validator.validate(examplePerson)
    expect(errors).toBeUndefined()
  })
  it('should return errors on invalid name and age', () => {
    const errors = validator.validate({ ...examplePerson, name: '', age: 200 })
    expect(errors?.has('name')).toBeTruthy()
    expect(errors?.has('age')).toBeTruthy()
  })
})
