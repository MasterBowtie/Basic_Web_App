import { useEffect } from "react"
import { useApi } from "../utils/api"


function ExpenseItem(props) {
    const api = useApi();

    useEffect(() => {
        const controller = new AbortController()
    
        api.post("expense/id", {id: props.id})
            .then(res => {
                console.log(res)
            }).catch(err => {
                if (err.name !== "AbortError") {
                    console.error(err)
                }
            })


        return () => {controller.abort()}
    }, [])

    return (
    <div>
        {props.id}
    </div>)
}

export {ExpenseItem}