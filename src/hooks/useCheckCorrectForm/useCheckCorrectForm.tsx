import { useEffect, useState } from "react"

import css from "./useCorrect.module.css"

interface props{
    data: any
    CheckDataCorrect: (data: any) => string
}

function GetMessage(message: string){
    return(
        <div className={css.message}>{message}</div>
    )
}

export default function useCheckCorrectForm({data, CheckDataCorrect}: props){
    const [message, setMessage] = useState("") 

    useEffect(() => {
        setMessage(CheckDataCorrect(data))
    }, [data])
    return(
        {node: GetMessage(message), correct: message.length === 0}
    )
}