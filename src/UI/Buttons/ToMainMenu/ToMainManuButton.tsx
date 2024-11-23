import { InputHTMLAttributes } from "react";
import image from "../../../assets/main.png"
import BaseImgButton from "../BaseImgButton/BaseImgButton";

export default function ToMainMenuBatton({...props}: InputHTMLAttributes<HTMLImageElement>){
    return(
        <BaseImgButton src={image} {...props}/>
    )
}