import { useEffect, useState } from "react";
import "../css/Dialog.css"
import { HiddenInput } from "../components/Input";
import { SVGX, SVGGlass } from "../components/SVG";
import { useApi } from '../utils/api'
import { Card } from "../components/Cards";
import { Accordian } from "../components/Accordian";
import { ExpenseItem } from "./Expense";


function capitalize(s)
{
    return s && String(s[0]).toUpperCase() + String(s).slice(1);
}

function BudgetDialog(props) {
    const api = useApi();
    const [title, setTitle] = useState("");
    const [period, setPeriod] = useState("");
    const [limit, setLimit] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [active, setActive] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const abortController = new AbortController();




    useEffect(() => {
        if (!props.budgetId) {
            return;
        }
        if (props.budgetId === 0) {
            setTitle("New Title")
        }

        api.post("budget/id", {id: props.budgetId})
        .then((res) => {
            setTitle(res.budget_name);
            setLimit(res.budget_limit);
            setPeriod(capitalize(res.budget_period));
            setActive(res.budget_active);
            setStart(res.budget_start);
            setEnd(res.budget_end);
        }).catch(err => {
            if (err.name !== "AbortError") {
                console.error(err);
            }
        })
        
        api.post("budget/expenses", {id: props.budgetId})
        .then((res) => {
            console.log("Expenses:", res)
            setExpenses(res);
        }).catch(err => {
            if (err.name !== "AbortError") {
                console.error(err);
            }
        })

        return () => {abortController.abort()}
    }, [props.budgetId])
    



    function Save(close) {
        console.log(`Saving ${props.title}...`)
        if (close) {
            props.onClose();
        }
        return;
    }

    function toggleActive() {
        if (active) {
            api.post("budget/disable", {id: props.budgetId})
                .then((res)=> {
                    // console.log("Response:", res)
                    setActive(res.budget_active)
                })
            } else {
                api.post("budget/enable", {id: props.budgetId})
                .then((res)=> {
                    // console.log("Response:", res)
                    setActive(res.budget_active)
                })
        }
    }

    return(
        <div className="dialog body">
        <div className='dialog header'>
            <HiddenInput value={title} className="header"/>
            <p>{period}</p>
            <p>Spent/{limit}</p>
            <SVGX onClick={props.onClose} className={"toggle"} style={{alignSelf: "flex-start"}}/>
        </div>
        <div>
            {expenses.map((e, i) => <ExpenseItem key={e.expense_id} id={e.expense_id}/>)}
        </div>
        <div className="dialog footer">
            <button onClick={() => {toggleActive()}}>{active? "Disable" : "Enable"}</button>
            <button onClick={() => Save(false)}>Save</button>
            <button onClick={() => Save(true)}>Save & Exit</button>
            <button onClick={props.onClose}>Exit</button>
        </div>
        </div>
    )
}

function BudgetCard(props) {
    const api = useApi();
    const [title, setTitle] = useState("");
    const [period, setPeriod] = useState("");
    const [limit, setLimit] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [active, setActive] = useState(0);
    const abortController = new AbortController();


    useEffect(() => {
        if (!props.budgetId) {
            return;
        }
        if (props.budgetId === 0) {
            setTitle("New Title")
        }
        
        api.post("budget/id", {id: props.budgetId})
        .then((res) => {
            setTitle(res.budget_name);
            setLimit(res.budget_limit);
            setPeriod(capitalize(res.budget_period));
            setActive(res.budget_active);
            setStart(res.budget_start);
            setEnd(res.budget_end);
        }).catch(err => {
            if (err.name !== "AbortError") {
                console.error(err);
            }
        })
        return () => {abortController.abort()}
    }, [])


    return (
        <Card>
            <div className="card-header">
                <p className="header">{title}</p>
                <SVGGlass className={"toggle"} onClick={props.onClick}/>
            </div>
            <p className="header">{limit}</p>
            {/* <Accordian>
              <div style={{display: 'flex', gap: "1em"}}>
                <p>body</p>
                <p>part 1</p>
              </div>
              <p>body</p>
              <p>body</p>
            </Accordian> */}
        </Card>
    )
}

export { BudgetDialog, BudgetCard }