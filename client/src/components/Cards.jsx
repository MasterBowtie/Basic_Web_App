import { useState } from 'react'
import '../css/Cards.css'

function Card(props) {
    return (
        <div className='card' style={props.style}>
            {props.children}
        </div>
    )
}

function CardInput({name, value, className}) {
    const [input, setInput] = useState(value)

    return (
        <input value={input} onChange={(e)=> setInput(e.target.value)} className={className}/>
    )
}


function CardDisplay(props) {

    return (
        <div className='display'>
            {props.children}
        </div>
    )
}

export {Card, CardDisplay, CardInput}