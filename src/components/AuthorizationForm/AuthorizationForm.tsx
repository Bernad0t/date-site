import MyInputBase from "../../UI/MyInput/MyInputBase/MyInputBase"
import { AuthPlasceHolders } from "../../sqhemas/enums"

import css from "./form.module.css"

import ButtonForm from "../../UI/Buttons/ButtonForm/ButtonForm"
import useCheckCorrectForm from "../../hooks/useCheckCorrectForm/useCheckCorrectForm"
import {  dataForm } from "../../sqhemas/props"
import CheckCorrectForm from "../../utils/CheckCorrectForm"

interface props{
    data: dataForm
    setData: React.Dispatch<React.SetStateAction<dataForm>>
    submit: () => void
    nameSubmit: string
}

function OneField(value: string, key: string, callBack: (key: string, newValue: string) => void){
    return(
        <div style={{width: "100%", height: "30px", marginBottom: "10px"}}>
            <MyInputBase type={key === "password" ? "password" : ""} value={value}
             placeholder={AuthPlasceHolders[key as keyof typeof AuthPlasceHolders]} onChange={(e) => callBack(key, e.target.value)}/>
        </div>
    )
}

export default function AuthForm({data, setData, submit, nameSubmit}: props){
    const keys: string[] = Object.keys(data)

    const correctForm = useCheckCorrectForm({data: data, CheckDataCorrect: CheckCorrectForm})
    function Change(key: string, value: string){
        setData({...data, [key]: value})
    }
    return(
        <div>
            <div className={css.contain_fields}>
                {keys.map(key => OneField(data[key as keyof typeof data], key, Change))}
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <div style={{width: "80%", height: "30px"}}>
                    <ButtonForm active={correctForm.correct} onClick={() => submit()} disabled={!correctForm.correct}>{nameSubmit}</ButtonForm>
                    {correctForm.node}
                </div>
            </div>
        </div>
    )
}