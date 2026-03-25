import { useState, useEffect } from 'react'
import '../css/App.css'
import { Card, CardMasonry} from '../components/Cards'
import { Accordian } from '../components/Accordian'
import { SVGGlass, SVGPlus, SVGX } from '../components/SVG'
import { HiddenInput } from '../components/Input'
import { Dialog } from '../components/Dialog'
import Budget from './Budget'



function App() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState([])
  const [budgetActive, setBudget] = useState(false)
  const [budgetTitle, setBudgetTitle] = useState("")

  // Push Title to Budget on give card


  return (
    <div id='App'>
      <Dialog open={budgetActive}>
        <Budget onClose={()=> setBudget(false)} title={budgetTitle}/>
      </Dialog>
      <h1>Main Basic Page</h1>

      <CardMasonry>
        {cards.map((t, i)=> 
          <Card key={t}>
            <div className='cardHeader'>
              <HiddenInput id={`input-${t}`} value={`Title ${i}`} className={"header"}/>
              <SVGGlass className={"toggle"} onClick={()=> {setBudget(true); setBudgetTitle(document.getElementById(`input-${t}`).value);console.log(budgetTitle);}}/>
            </div>
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
            setCards([...cards, `card-${count}`])
            }}/>
        </Card>
      </CardMasonry>
    </div>
  )
}

export default App
