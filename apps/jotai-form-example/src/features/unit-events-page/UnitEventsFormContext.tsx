import { TableRowWrapperProps } from '@equinor/apollo-components'
import { zodResolver } from '@hookform/resolvers/zod'
import { unitEventSchema } from 'mock-data'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormsCache, UnitEvent } from './types'
import { omit } from './utils'

interface UnitEventFormContextValues {
  setEditMode: (editMode: boolean) => void
}

const UnitEventFormContext = createContext<UnitEventFormContextValues>({
  setEditMode: () => null,
})

type TickerRowWrapperProps = {
  onRemove: (id: string) => void
  formsCache: FormsCache<UnitEvent>
  setFormsCache: Dispatch<SetStateAction<FormsCache<UnitEvent>>>
} & TableRowWrapperProps<UnitEvent>

export function UnitEventFormWrapper({
  row,
  children,
  onRemove,
  formsCache,
  setFormsCache,
}: TickerRowWrapperProps) {
  const { id, original } = row

  const newForm = useForm({
    defaultValues: original,
    resolver: zodResolver(unitEventSchema),
    shouldFocusError: true,
  })

  const form = useMemo(() => formsCache[id] ?? newForm, [formsCache[id], newForm, original])

  // Update defaultValues on remoteChange
  useEffect(() => {
    form.setValue('_hasRemoteChange', original._hasRemoteChange)
  }, [original._hasRemoteChange])

  useEffect(() => {
    // Bypass check for new rows as they are not added to forms cache
    if (form.getValues('_isNew')) return

    // Check whether there are mismatch between form edit mode and forms cache
    const hasCachedEntry = Boolean(formsCache[id])
    if (hasCachedEntry !== form.getValues('_editMode')) {
      form.setValue('_editMode', hasCachedEntry)
    }
  }, [formsCache[id]])

  const setEditMode = (newEditMode: boolean) => {
    // Clear remote change state on edit click
    original._hasRemoteChange = false

    if (newEditMode) {
      setFormsCache((old) => ({ ...old, [id]: newForm }))
      form.reset(original)
    } else {
      if (form.getValues('_isNew')) onRemove(row.id)
      setFormsCache((old) => omit(old, id))
      form.reset(original)
    }
    form.setValue('_editMode', newEditMode)
  }

  return (
    <UnitEventFormContext.Provider value={{ setEditMode }}>
      <FormProvider {...form}>{children}</FormProvider>
    </UnitEventFormContext.Provider>
  )
}

export const useUnitEventFormContext = () => useContext(UnitEventFormContext)
