import { InputHTMLAttributes } from "react";
import image from "../../../assets/add.png"
import BaseImgButton from "../BaseImgButton/BaseImgButton";

export default function AddButton({onChange, ...props}: InputHTMLAttributes<HTMLInputElement>){
    return (
        <label>
            <BaseImgButton src={image} style={props.style}/>
            <input type="file" style={{display:"none"}} onChange={onChange}/>
        </label>
    )
}