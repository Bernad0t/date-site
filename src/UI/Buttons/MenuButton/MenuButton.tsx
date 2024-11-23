import { InputHTMLAttributes } from "react";

import css from "./but.module.css"

interface props extends InputHTMLAttributes<HTMLButtonElement>{
    active: boolean
}

export default function MenuButton({active, onClick, children}: props){
    return(
        <button onClick={onClick} className={active ? css.active : css.not_active}>{children}</button>
    )
}