import { useState } from 'react'
import '../css/Card.css'

function Card({title}) {
    return (
        <div className='card'>
            <h1>{title}</h1>
            <p>Hello</p>
        </div>
    )
}

export default Card