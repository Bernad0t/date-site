import { InputHTMLAttributes } from "react";
import css from "./area.module.css"

export default function MyTextArea({...props}: InputHTMLAttributes<HTMLTextAreaElement>){
    return(
        <textarea value={props.value} className={css.textarea} style={props.style} placeholder={props.placeholder} onChange={props.onChange}/>
    )
}