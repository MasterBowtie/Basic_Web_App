import { useState } from "react";
import { HiddenInput } from "../components/Input";
import { SVGX } from "../components/SVG";

function Budget(props) {

    return(
        <div className='dialogHeader header'>
          <HiddenInput value={props.title} className="header"/>
          <p>Period</p>
          <p>Spent/Alloted</p>
          <SVGX onClick={props.onClose} className={"toggle"} style={{alignSelf: "flex-start"}}/>
        </div>

    )
}

export default Budget