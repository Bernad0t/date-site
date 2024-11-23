import { InputHTMLAttributes } from "react";
import image from "../../../assets/refactor.png"
import BaseImgButton from "../BaseImgButton/BaseImgButton";

export default function RefactorButton({...props}: InputHTMLAttributes<HTMLImageElement>){
    return (
        <BaseImgButton src={image} {...props}/>
    )
}