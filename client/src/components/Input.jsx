import "../css/Input.css"
import { useEffect, useState } from "react"

function HiddenInput(props) {
    const [input, setInput] = useState(props.value)

    return (
        <input id={props.id} value={input} onChange={(e)=> setInput(e.target.value)} className={`hidden ${props.className? props.className: ""}`} placeholder={props.placeholder}/>
    )
}

export {HiddenInput}