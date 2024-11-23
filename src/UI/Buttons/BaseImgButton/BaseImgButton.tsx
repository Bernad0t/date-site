import { InputHTMLAttributes } from "react";
import css from "./but.module.css"

export default function BaseImgButton({...props}: InputHTMLAttributes<HTMLImageElement>){
    return(
        <div style={{position: "relative"}}>
            <div style={{position: "absolute", left: "5px", top: "5px"}}>
                <img src={props.src} alt="back" style={props.style ? props.style : {width: "30px"}} onClick={props.onClick} className={css.but}/>
            </div>
        </div>
    )
}