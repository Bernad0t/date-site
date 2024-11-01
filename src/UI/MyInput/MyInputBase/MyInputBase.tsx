import { InputHTMLAttributes } from "react";
import styleBase from "./MyInpotBase.module.css"

export default function MyInputBase({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input type={props.type} value={props.value} style={{...props.style}} className={styleBase.base} 
        placeholder={props.placeholder} onChange={props.onChange}/>
    )
}