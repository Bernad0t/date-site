import css from "./img.module.css"
import image from "../../assets/no_image.jpg"
import { InputHTMLAttributes } from "react"

interface props extends InputHTMLAttributes<HTMLImageElement>{
    my_src: string | null | undefined
}

export default function WrapperImage({my_src, ...props}: props){
    return(
        <div className={css.wrapper}>
            <img src={my_src === null || !my_src ? image : my_src} alt={props.alt} className={css.css_img}/>
        </div>
    )
}