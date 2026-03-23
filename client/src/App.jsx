import { useState } from 'react'
import './css/App.css'
import Card from './components/Card'
import CardDisplay from './components/CardDisplay'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Main Basic Page</h1>
      <CardDisplay>
        <Card title="Testing"></Card>
        <Card title="Testing 2"></Card>
      </CardDisplay>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
