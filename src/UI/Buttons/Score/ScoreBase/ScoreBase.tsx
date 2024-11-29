import { InputHTMLAttributes } from "react";

import css from "./css.module.css"

export default function ScoreBase({src, onClick, style}: InputHTMLAttributes<HTMLImageElement>){
    return(
        <div className={css.base} style={style}>
            <img src={src} alt="button" onClick={onClick}/>
        </div>
    )
}