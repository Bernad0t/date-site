import MyInputBase from "../../UI/MyInput/MyInputBase/MyInputBase"
import { AuthPlasceHolders } from "../../sqhemas/enums"

import css from "./form.module.css"

import ButtonForm from "../../UI/Buttons/ButtonForm/ButtonForm"
import useCheckCorrectForm from "../../hooks/useCheckCorrectForm/useCheckCorrectForm"
import {  UserCreate } from "../../sqhemas/props/props"
import CheckCorrectForm from "../../utils/CheckCorrectForm"
import { useAppDispatch, useAppSelector } from "../../hooks/useStore/useStore"
import { changeField } from "../../store/features/newUserSlice"
import { selectCreateUser } from "../../store/store"

interface props{
    submit: () => void
    nameSubmit: string
}

function OneField(value: string | number | undefined, key: string, callBack: (key: string, newValue: string) => void){
    return(
        <div style={{width: "100%", height: "30px", marginBottom: "10px"}}>
            <MyInputBase type={key === "password" ? "password" : ""} value={value}
             placeholder={AuthPlasceHolders[key as keyof typeof AuthPlasceHolders]} onChange={(e) => callBack(key, e.target.value)}/>
        </div>
    )
}

export default function AuthForm({submit, nameSubmit}: props){
    const data: UserCreate = useAppSelector(selectCreateUser)
    console.log(data, "data")
    const keys: string[] = Object.keys(data).slice(0, 3) // [mail log pas]
    const dispatch = useAppDispatch()
    const correctForm = useCheckCorrectForm({data: data, keys: keys, CheckDataCorrect: CheckCorrectForm})
    function Change(key: string, value: string){
        dispatch(changeField({...data, [key]: value}))
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