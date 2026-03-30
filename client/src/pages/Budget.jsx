import { useEffect, useState } from "react";
import "../css/Dialog.css"
import { HiddenInput } from "../components/Input";
import { SVGX } from "../components/SVG";
import { useApi } from '../utils/api'

function Budget(props) {
    const api = useApi();
    const [title, setTitle] = useState("");


    useEffect(() => {
        if (!props.budgetId) {
            return;
        }
        if (props.budgetId === 0) {
            setTitle("New Title")
        }

        api.post("budget/id", {id: props.budgetId})
            .then((res) => {
                // TODO: Implement fields
                //budget_id:
                //budget_name:
                //budget_period:
                //budget_limit:
                //budget_start:
                //budget_end:
                //budget_active:
                setTitle(res.budget_name)
            })
        // TODO: query expenses


    },[props.budgetId])

    function Save(close) {
        console.log(`Saving ${props.title}...`)
        if (close) {
            props.onClose();
        }
        return;
    }
    return(
        <div className="dialog body">
        <div className='dialog header'>
          <HiddenInput value={title} className="header"/>
          <p>Period</p>
          <p>Spent/Alloted</p>
          <SVGX onClick={props.onClose} className={"toggle"} style={{alignSelf: "flex-start"}}/>
        </div>
        <div>
            Expenses go here
        </div>
        <div className="dialog footer">
            <button>Disable</button>
            <button onClick={() => Save(false)}>Save</button>
            <button onClick={() => Save(true)}>Save & Exit</button>
            <button onClick={props.onClose}>Exit</button>
        </div>
        </div>
    )
}

function BudgetCard(props) {
    return (
    <>
            <Accordian>
              <div style={{display: 'flex', gap: "1em"}}>
                <p>body</p>
                <p>part 1</p>
              </div>
              <p>body</p>
              <p>body</p>
            </Accordian>
    </>)
}

export { Budget, BudgetCard }