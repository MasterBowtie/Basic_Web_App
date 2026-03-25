import { useState } from 'react'
import '../css/Cards.css'

function Card(props) {
    return (
        <div className='card' style={props.style}>
            {props.children}
        </div>
    )
}


function CardMasonry(props) {

    return (
        <div className='masonry'>
            {props.children}
        </div>
    )
}

export {Card, CardMasonry}