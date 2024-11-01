import { InputHTMLAttributes } from "react";

export default function MyTextArea({...props}: InputHTMLAttributes<HTMLTextAreaElement>){
    return(
        <textarea value={props.value} style={props.style} placeholder={props.placeholder} onChange={props.onChange}/>
    )
}