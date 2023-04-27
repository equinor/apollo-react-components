import omit from 'lodash/omit'
import { useFormContext } from 'react-hook-form'
import { FormMeta } from './types'

// This file contains methods related to the FormMeta type

const formMeta: FormMeta = {
  _editMode: false,
  _isNew: false,
  _hasRemoteChange: false,
}

/**
 * Subscribes to the `_editMode` field in a `react-hook-form` context.
 *
 * @returns edit mode value
 */
export function useEditMode() {
  const { watch } = useFormContext<FormMeta>()
  return watch('_editMode') ?? false
}

/**
 * Subscribes to the `_hasRemoteChange` field in a `react-hook-form` context.
 *
 * @returns edit mode value
 */
export function useHasRemoteChange() {
  const { watch } = useFormContext<FormMeta>()
  return watch('_hasRemoteChange') ?? false
}

/**
 * @returns function getting is new meta
 */
export function useGetIsNew() {
  const { getValues } = useFormContext<FormMeta>()
  return () => getValues('_isNew') ?? false
}

export function useSetFormMeta<T extends FormMeta>() {
  const { setValue } = useFormContext<T>()
  return (newValues: Partial<T>) =>
    objectKeys(newValues).forEach((key) => newValues[key] && setValue(key, newValues[key]))
}

/**
 * ```
 * Object.keys()
 * ```
 * With better typing. Same uses.
 *
 * @param obj
 * @returns `Object.keys(obj)`
 */
function objectKeys<Obj>(obj: any): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[]
}

export function removeFormMeta<T extends FormMeta>(withFormMeta: T): Omit<T, keyof FormMeta> {
  return omit(withFormMeta, Object.keys(formMeta)) as Omit<T, keyof FormMeta>
}

export function addFormMeta<T>(withoutFormMeta: T): T & FormMeta {
  return { ...formMeta, ...withoutFormMeta }
}
