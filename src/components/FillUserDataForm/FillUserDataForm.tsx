import css from "./user.module.css"

import MyInputBase from "../../UI/MyInput/MyInputBase/MyInputBase";
import MySelect from "../../UI/MySelect/MySelect";
import { Gender } from "../../sqhemas/enums";
import MyTextArea from "../../UI/MyTextArea/MyTextArea";
import { UserCreate } from "../../sqhemas/props/props";
import { useAppDispatch } from "../../hooks/useStore/useStore";
import { changeField } from "../../store/features/newUserSlice";

interface props_field{
    name: string
    value: string | number | undefined
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function OneField({name, value, onchange}: props_field){
    return(
        <div className={css.one_characteristic}>
            <div className={css.name}>
                {name}
            </div>
            <div className={css.field}>
                <MyInputBase value={value ? value : ""} placeholder={name.toLowerCase()} onChange={e => onchange(e)}/>
            </div>
        </div>
    )
}

export default function FillUserDataForm({user} : {user: UserCreate}){
    const placeholder: string = "Расскажите о своих увлечениях, что для вас важно, что хотели бы видеть в собеседнике"
    const dispatch = useAppDispatch()

    const set_fields = [
        {name: "Введите имя", value: user.name, onchange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeField({...user, name: e.target.value}))},
        {name: "Введите возраст", value: user.age, onchange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeField({...user, age: Number(e.target.value)}))}
    ]

    return(
        <div style={{width: "100%"}}>
            {set_fields.map(set => <OneField name={set.name} value={set.value} onchange={set.onchange}/>)}
            <div className={css.one_characteristic}>
                <div className={css.name}>
                    Выберете ваш пол
                </div>
                <div className={css.field}>
                    <MySelect onChange={e => dispatch(changeField({...user, gender: Gender[e.target.value as keyof typeof Gender]}))}>
                        <option disabled selected>Пол</option>
                        <option value={"male"}>{Gender.male.valueOf()}</option>
                        <option value={"female"}>{Gender.female.valueOf()}</option>
                    </MySelect>
                </div>
            </div>
            <div className={css.one_characteristic}>
                <div className={css.name}>
                    Придумайте описание для вашей анкеты
                </div>
                <div className={css.field} style={{height: "auto"}}>
                    <MyTextArea value={user.description} onChange={e => dispatch(changeField({...user, description: e.target.value}))}
                        placeholder={placeholder}/>
                </div>
            </div>
        </div>
    )
}