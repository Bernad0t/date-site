import { InputHTMLAttributes } from "react";
import ButtonForm from "../ButtonForm/ButtonForm";

export default function ButtonRed({ onClick, children, ...props}: InputHTMLAttributes<HTMLButtonElement>){
    return(
        <ButtonForm active={true} onClick={onClick} {...props}>{children}</ButtonForm>
    )
}