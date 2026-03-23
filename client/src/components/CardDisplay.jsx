import '../css/CardDisplay.css'

function CardDisplay(props) {

    return (
        <div className='display'>
            {props.children}
        </div>
    )
}

export default CardDisplay