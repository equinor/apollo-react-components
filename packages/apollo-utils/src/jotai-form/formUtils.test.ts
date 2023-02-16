import { renderHook } from '@testing-library/react-hooks'
import { useAtomValue } from 'jotai'
import { describe, expect, it } from 'vitest'
import { examplePerson, Person } from '../test-data/person'
import { createFormFamily, useFormFamilyUtils } from './formUtils'

describe('Test createFormFamily', () => {
  it('should create a family', () => {
    const family = createFormFamily<Person>()
    expect(family).toBeTruthy()
  })
  it('should initialize atom as undefined', () => {
    const family = createFormFamily<Person>()
    const { result } = renderHook(() => useAtomValue(family(examplePerson)))
    expect(result.current).toBeUndefined()
  })
})

function initFormUtils() {
  const family = createFormFamily<Person>()
  return useFormFamilyUtils(family)
}

describe('Test useFormFamilyUtils', () => {
  it('should initialize form as valid with values', () => {
    const utils = initFormUtils()
    renderHook(() => utils.useFormMutations(examplePerson).initializeForm(examplePerson))
    const { result } = renderHook(() => utils.useFormState(examplePerson))
    expect(result.current?.isValid).toBeTruthy()
    expect(result.current).toStrictEqual({
      status: 'editing',
      values: examplePerson,
      isValid: true,
    })
  })
})
