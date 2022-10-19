import { useState } from 'react'
import { PokemonTable } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <PokemonTable />
    </div>
  )
}

export default App
