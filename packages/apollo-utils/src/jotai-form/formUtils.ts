import { atom, PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { type AtomFamily } from 'jotai/vanilla/utils/atomFamily'
import { createValidator } from '../zod-validation'
import { FormFamilyParam, FormState } from './types'

export function createFormFamily<E>() {
  return atomFamily(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_param: FormFamilyParam) => atom<FormState<E> | undefined>(undefined),
    (a, b) => a.id === b.id
  )
}

type FormFamily<T> = AtomFamily<FormFamilyParam, PrimitiveAtom<FormState<T> | undefined>>
type FormValidator = ReturnType<typeof createValidator>

type UseFormFamilyUtilsOptions = {
  validator?: FormValidator
}

export function useFormFamilyUtils<T>(
  family: FormFamily<T>,
  options: UseFormFamilyUtilsOptions = {}
) {
  return {
    useFormStateAtom: (param: FormFamilyParam) => useAtom(family(param)),
    useFormState: (param: FormFamilyParam) => useAtomValue(family(param)),
    useUpdateFormMutation: (param: FormFamilyParam) => {
      return useFormFamilyMutation(family, param, options.validator)
    },
    useFormMutations(param: FormFamilyParam) {
      const mutateAtom = useSetAtom(family(param))

      return {
        update: useFormFamilyMutation(family, param, options.validator),
        initializeForm: (entity: T) =>
          mutateAtom({
            status: 'editing',
            values: entity,
            isValid: true,
          }),
        resetForm: () => mutateAtom(undefined),
      }
    },
  }
}

export function useFormFamilyMutation<T>(
  family: FormFamily<T>,
  param: FormFamilyParam,
  validator?: FormValidator
) {
  const mutate = useSetAtom(family(param))
  return (update: Partial<T>) => {
    return mutate((previous) => {
      if (!previous) return

      const updatedValues = {
        ...previous.values,
        ...update,
      }
      const errors = validator?.validate(updatedValues)

      return {
        status: 'editing',
        values: updatedValues,
        errors,
        isValid: !errors,
      }
    })
  }
}
