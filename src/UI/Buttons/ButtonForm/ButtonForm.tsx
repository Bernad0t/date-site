import { InputHTMLAttributes } from "react";

import css from "./ButtonForm.module.css"

interface prop extends InputHTMLAttributes<HTMLButtonElement>{
    active: boolean
}

export default function ButtonForm({ style, onClick, children, active, ...props}: prop){
    return(
        <button style={style} className={active ? css.active : css.disable} onClick={onClick} disabled={props.disabled}>{children}</button>
    )
}