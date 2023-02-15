export type ValidationErrorMap<T> = Map<keyof T, { message: string; code: string }>
