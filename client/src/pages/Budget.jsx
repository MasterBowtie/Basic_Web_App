import { useEffect, useState } from "react";
import "../css/Dialog.css"
import { HiddenInput } from "../components/Input";
import { SVGX } from "../components/SVG";

function Budget(props) {
    function Save(close) {
        console.log(`Saving ${props.title}...`)
        if (close) {
            props.onClose();
        }
        return;
    }
    return(
        <div className="dialog body">
        <div className='dialog header'>
          <HiddenInput value={props.title} className="header"/>
          <p>Period</p>
          <p>Spent/Alloted</p>
          <SVGX onClick={props.onClose} className={"toggle"} style={{alignSelf: "flex-start"}}/>
        </div>
        <div>
            Expenses go here
        </div>
        <div className="dialog footer">
            <button>Disable</button>
            <button onClick={() => Save(false)}>Save</button>
            <button onClick={() => Save(true)}>Save & Exit</button>
            <button onClick={props.onClose}>Exit</button>
        </div>
        </div>
    )
}

export default Budget