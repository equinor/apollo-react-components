import { z } from 'zod'
import { ValidationErrorMap } from './types'

export function createValidator<S extends z.ZodTypeAny>(schema: S) {
  return {
    validate: <E extends z.infer<typeof schema>>(entity: E) => {
      const validation = schema.safeParse(entity)
      if (validation.success) return undefined
      return prepareErrors<E>(validation)
    },
    validateAsync: async <E extends z.infer<typeof schema>>(entity: z.infer<typeof schema>) => {
      const validation = await schema.safeParseAsync(entity)
      if (validation.success) return undefined
      return prepareErrors<E>(validation)
    },
    getSchema() {
      return schema
    },
  }
}

function prepareErrors<E extends Record<string, unknown>>(errorValidation: z.SafeParseError<E>) {
  return new Map(
    errorValidation.error.errors.map((error) => [
      error.path[0] as keyof E,
      { message: error.message, code: error.code },
    ])
  ) as ValidationErrorMap<E>
}
