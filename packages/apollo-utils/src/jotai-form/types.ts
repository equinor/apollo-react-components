import { ValidationErrorMap } from '../zod-validation'

export type FormState<T> = {
  status: 'editing' | 'pending'
  values: T
  errors?: ValidationErrorMap<T>
  isValid?: boolean
}

export type FormFamilyParam = {
  id: number | string
} & Record<string, unknown>
