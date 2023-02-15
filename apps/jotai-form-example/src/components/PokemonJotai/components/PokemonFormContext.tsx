import { TableRowWrapperProps } from '@equinor/apollo-components'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Pokemon } from 'trpc-pokemon'
import { pokemonFormSchema } from '../atoms'

export function PokemonFormContext(props: TableRowWrapperProps<Pokemon>) {
  const methods = useForm({
    defaultValues: props.row.original,
    resolver: zodResolver(pokemonFormSchema),
  })

  return <FormProvider {...methods}>{props.children}</FormProvider>
}
