import { InputHTMLAttributes } from "react";
import image from "../../../assets/back_button.png"
import BaseImgButton from "../BaseImgButton/BaseImgButton";

export default function BackButton({...props}: InputHTMLAttributes<HTMLImageElement>){
    return(
        <BaseImgButton src={image} {...props}/>
    )
}