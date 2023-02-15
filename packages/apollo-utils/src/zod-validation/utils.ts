import { z } from 'zod'
import { ValidationErrorMap } from './types'

export function createValidator<S extends z.ZodTypeAny>(schema: S) {
  return {
    validate: <E>(entity: E) => {
      const validation = schema.safeParse(entity)
      if (validation.success) return undefined
      return new Map(
        validation.error.errors.map((error) => [
          error.path[0] as keyof E,
          { message: error.message, code: error.code },
        ])
      ) as ValidationErrorMap<E>
    },
  }
}
