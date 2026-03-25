import "../css/Dialog.css"

function Dialog(props) {
    return (
        <dialog open={props.open}>
            {props.children}
        </dialog>
    )
}

export {Dialog}