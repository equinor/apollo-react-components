import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { editsAtom } from './PokemonTable'

export const PokemonEditableNameCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue()
  const [value, setValue] = useState('')

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const [edits] = useAtom(editsAtom)
  const id = row.id
  if ((edits as any)[id]) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onBlur={() => {
          console.log(row.index, column.id, value)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          table.options?.meta?.updateData(row.index, column.id, value)
        }}
      />
    )
  }
  return getValue()
}
