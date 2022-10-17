import { useState } from 'react'
import { Button } from 'ui'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>DataGrid Library</h1>
      <div>
        <Button />
      </div>
    </div>
  )
}

export default App
