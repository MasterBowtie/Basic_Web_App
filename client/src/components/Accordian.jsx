import { Children, useState} from "react"
import "../css/Accordian.css"
function Accordian({children}) {
    // const firstChild = Children.toArray(children)[0]
    // const rest = Children.toArray(children).slice(1);
    const [active, setActive] = useState(false)



    return (
        <>
            <div className={`accordian ${active? "open": ""}`}>
                {children}
            </div>
            <p className="toggle" onClick={()=> 
                setActive(!active)}
            >{active? "retract": "expand"}</p>
        </>
    )
}

export {Accordian}