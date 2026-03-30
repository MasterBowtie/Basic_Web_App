import { useState, useEffect } from 'react'
import '../css/App.css'
import { Card, CardMasonry} from '../components/Cards'
import { Accordian } from '../components/Accordian'
import { SVGGlass, SVGPlus, SVGX } from '../components/SVG'
import { HiddenInput } from '../components/Input'
import { Dialog } from '../components/Dialog'
import {Budget, BudgetCard} from './Budget'
import { useApi } from '../utils/api'



function App() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState([])
  const [budets, setBudgets] = useState([])
  const [budgetActive, setBudget] = useState(false)
  const [budgetId, setBudgetId] = useState(0)
  const api = useApi();

  useEffect(() => {
    const controller = new AbortController()
    api.get("budget")
    .then((res) => {console.log(res)})
    .catch(err => {
        if (err.name !== "AbortError") {
          console.error(err)
        }
      })

    api.get("budget/ids")
      .then((res) => {
        setBudgets(res);
      }).catch(err => {
        if (err.name !== "AbortError") {
          console.error(err)
        }
      }) 
    
    return () => {controller.abort();}
  }, [])


  return (
    <div id='App'>
      <Dialog open={budgetActive}>
        <Budget onClose={()=> setBudget(false)} budgetId={budgetId}/>
      </Dialog>
      <h1>Main Basic Page</h1>

      <CardMasonry>


        {budets.map((t, i)=> 
          <Card key={t.budget_id}>
            <div className='card-header'>
              <p className={"header"}>{t.budget_name}</p>
              <SVGGlass className={"toggle"} onClick={()=> {setBudget(true); setBudgetId(t.budget_id)}}/>
            </div>
          </Card>
        )}
        {/* <Card style={{display: "flex", justifyContent: "center"}}>
          <SVGPlus style={{fill: "#000000"}} className={"SVGButton"} onClick={()=> {
            setCount((count) => count + 1); 
            setCards([...cards, `card-${count}`])
            }}/>
        </Card> */}
      </CardMasonry>
    </div>
  )
}

export default App
