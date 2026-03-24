import { Children, useState} from "react"
import "../css/Accordian.css"
import { SVGAccordianUp, SVGAccordianDown } from "./SVG"
function Accordian({children}) {
    const [active, setActive] = useState(false)



    return (
        <>
            <div className={`accordian ${active? "open": ""}`}>
                {children}
            </div>
            <p className="toggle" style={{textAlign: "center"}} onClick={()=> 
                setActive(!active)}
            >{active?  <SVGAccordianUp style={{height: "30px"}}/>: <SVGAccordianDown style={{height: "30px"}}/>}</p>
        </>
    )
}

export {Accordian}