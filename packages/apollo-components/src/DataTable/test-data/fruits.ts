import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { capitalizeHeader } from '../utils'

interface Fruit {
  id: number
  name: string
  latinName: string
  origin: string
}

export const fruitsData: Fruit[] = [
  {
    id: 1,
    name: 'Apple',
    latinName: 'Malus domestica',
    origin: 'Kazakhstan',
  },
  {
    id: 2,
    name: 'Banana',
    latinName: 'Musa × paradisiaca',
    origin: 'Southeast Asia',
  },
  {
    id: 3,
    name: 'Orange',
    latinName: 'Citrus × sinensis',
    origin: 'China',
  },
  {
    id: 4,
    name: 'Pear',
    latinName: 'Pyrus communis',
    origin: 'Central Europe, Eastern Europe',
  },
  {
    id: 5,
    name: 'Kiwi',
    latinName: 'Actinidia deliciosa',
    origin: 'China',
  },
  {
    id: 6,
    name: 'Mango',
    latinName: 'Mangifera indica',
    origin: 'India',
  },
]

const columnHelper = createColumnHelper<Fruit>()
export const fruitColumns: ColumnDef<Fruit, any>[] = [
  columnHelper.accessor('id', { header: capitalizeHeader }),
  columnHelper.accessor('name', { header: capitalizeHeader }),
  columnHelper.accessor('latinName', { header: 'Latin Name' }),
  columnHelper.accessor('origin', { header: 'Area of Origin' }),
]
