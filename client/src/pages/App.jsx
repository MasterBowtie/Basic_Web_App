import { useState, useEffect } from 'react'
import '../css/App.css'
import { Card, CardMasonry} from '../components/Cards'
import {BudgetDialog, BudgetCard} from './Budget'
import { useApi } from '../utils/api'
import { SVGPlus } from '../components/SVG'



function App() {
  const [active, setActive] = useState(true);
  const [budets, setBudgets] = useState([])
  const [budgetActive, setBudget] = useState(false)
  const [budgetId, setBudgetId] = useState(0)
  const api = useApi();

  useEffect(() => {
    console.log("FETCH: budget_ids")
    // const controller = new AbortController()
    api.get(`budget/ids?active=${active}`)
      .then((res) => {
        setBudgets(res);
      }).catch(err => {
        // if (err.name !== "AbortError") {
          console.error(err)
        // }
      }) 
    
    return () => {
      // controller.abort();
      }
  }, [active])


  return (
    <div id='App'>
      <BudgetDialog open={budgetActive} onClose={()=> setBudget(false)} budgetId={budgetId}/>

      <h1>Main Basic Page</h1>

      <CardMasonry>


        {budets.map((t, i)=> 
          <BudgetCard key={t.budget_id} budgetId={t.budget_id} onClick={() => {setBudget(true); setBudgetId(t.budget_id)}}/>
        )}
        <Card style={{display: "flex", justifyContent: "center"}}>
          <SVGPlus style={{fill: "#000000"}} className={"SVGButton"} onClick={()=> {
            setActive(!active);
            console.log("Active:", active)
            }}/>
        </Card>
      </CardMasonry>
    </div>
  )
}

export default App
