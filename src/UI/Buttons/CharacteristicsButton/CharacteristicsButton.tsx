import { InputHTMLAttributes } from "react";
import image from "../../../assets/characteristics.png"
import BaseImgButton from "../BaseImgButton/BaseImgButton";

export default function CharacteristicsButton({...props}: InputHTMLAttributes<HTMLImageElement>){
    return (
        <BaseImgButton src={image} {...props}/>
    )
}