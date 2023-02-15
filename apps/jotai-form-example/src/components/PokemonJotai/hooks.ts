import { useSetAtom } from 'jotai'
import { addPokemonFormAtom, deletePokemonFormAtom, updatePokemonFormAtom } from './atoms'

export function usePokemonFormActions() {
  const editForm = useSetAtom(addPokemonFormAtom)
  const cancelForm = useSetAtom(deletePokemonFormAtom)
  const updateForm = useSetAtom(updatePokemonFormAtom)

  return {
    editForm,
    cancelForm,
    updateForm,
  }
}
