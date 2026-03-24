import { useState, useEffect } from 'react'
import './css/App.css'
import { Card, CardDisplay, CardInput } from './components/Cards'
import { Accordian } from './components/Accordian'


function App() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState([])

  return (
    <>
      <h1>Main Basic Page</h1>

      <div>
        <button onClick={() => {
          setCount((count) => count + 1)
          setCards([...cards, `Title ${count+1}`])
          }}>
          count is {count}
        </button>
      </div>
      <CardDisplay>
        {cards.map((t, i)=> 
          <Card key={t}>
            <CardInput name={`Title ${t}`} value={t} className={"header"}/>
            <Accordian>
              <div style={{display: 'flex', gap: "1em"}}>
                <p>body</p>
                <p>part 1</p>
              </div>
              <p>body</p>
              <p>body</p>
            </Accordian>
          </Card>
        )}
      </CardDisplay>
    </>
  )
}

export default App
