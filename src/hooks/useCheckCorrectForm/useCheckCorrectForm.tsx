import { useEffect, useState } from "react"

import css from "./useCorrect.module.css"

interface props{
    data: any
    keys: string[]
    CheckDataCorrect: (data: any, keys: string[]) => string
}

function GetMessage(message: string){
    return(
        <div className={css.message}>{message}</div>
    )
}

export default function useCheckCorrectForm({data, keys, CheckDataCorrect}: props){
    const [message, setMessage] = useState("") 

    useEffect(() => {
        setMessage(CheckDataCorrect(data, keys))
    }, [data])
    return(
        {node: GetMessage(message), correct: message.length === 0}
    )
}