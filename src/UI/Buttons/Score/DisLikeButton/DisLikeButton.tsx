import { InputHTMLAttributes } from "react";
import ScoreBase from "../ScoreBase/ScoreBase";
import image from "../../../../assets/dislike.png"

export default function DisLikeButton({onClick}: InputHTMLAttributes<HTMLImageElement>){
    return(
        <ScoreBase src={image} onClick={onClick} style={{backgroundColor: "indianred"}}/>
    )
}