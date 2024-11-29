import { InputHTMLAttributes } from "react";
import ScoreBase from "../ScoreBase/ScoreBase";
import image from "../../../../assets/like.png"

export default function LikeButton({onClick}: InputHTMLAttributes<HTMLImageElement>){
    return(
        <ScoreBase src={image} onClick={onClick} style={{backgroundColor: "#07f"}}/>
    )
}