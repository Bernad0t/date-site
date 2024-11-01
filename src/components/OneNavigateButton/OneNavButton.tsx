import { InputHTMLAttributes } from "react"

export default function NavButton({className, children, onClick}: InputHTMLAttributes<HTMLButtonElement>){
    return(
        <button type="button" name="button" className={className} onClick={onClick}> 
            {children}
        </button>
    )
}