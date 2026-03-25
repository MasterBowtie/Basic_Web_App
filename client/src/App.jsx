import { useState, useEffect } from 'react'
import './css/App.css'
import { Card, CardMasonry} from './components/Cards'
import { Accordian } from './components/Accordian'
import { SVGGlass, SVGPlus } from './components/SVG'
import { Dialog } from './components/Dialog'
import { HiddenInput } from './components/Input'


function App() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState([])
  const [dialogActive, setDialog] = useState(false)

  return (
    <div id='App'>
      <Dialog open={dialogActive}>
        <div>
          <HiddenInput value="Dialog Title" className="header"/>
        </div>
      </Dialog>
      <h1>Main Basic Page</h1>

      {/* <div>
        <button onClick={() => {
          setCount((count) => count + 1)
          setCards([...cards, `Title ${count+1}`])
          }}>
          count is {count}
        </button>
      </div> */}

      <CardMasonry>

        {cards.map((t, i)=> 
          <Card key={t}>
            <HiddenInput name={`Title ${t}`} value={t} classNames={"header testing"}/>
            <SVGGlass className={"toggle"} onClick={()=> setDialog(!dialogActive)}/>
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
        <Card style={{display: "flex", justifyContent: "center"}}>
          <SVGPlus style={{fill: "#000000"}} className={"SVGButton"} onClick={()=> {
            setCount((count) => count + 1); 
            setCards([...cards, `Title ${count+1}`])
            }}/>
        </Card>
      </CardMasonry>
    </div>
  )
}

export default App
