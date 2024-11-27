import css from "./user.module.css"

import MyInputBase from "../../UI/MyInput/MyInputBase/MyInputBase";
import MySelect from "../../UI/MySelect/MySelect";
import { Gender } from "../../sqhemas/enums";
import MyTextArea from "../../UI/MyTextArea/MyTextArea";
import { UserCreate } from "../../sqhemas/props/props";
import { useAppDispatch } from "../../hooks/useStore/useStore";
import { changeField } from "../../store/features/newUserSlice";
import { props_field, props_fill_form } from "../../sqhemas/props/fill_data";

function OneField({name, value, onchange}: props_field){
    return(
        <div className={css.one_characteristic}>
            <div className={css.name}>
                {name}
            </div>
            <div className={css.field}>
                <MyInputBase value={value ? value : ""} placeholder={name.toLowerCase()} onChange={e => onchange(e.target.value)}/>
            </div>
        </div>
    )
}

export function FillUserData({set_fields, user}: props_fill_form){
    const placeholder: string = "Расскажите о своих увлечениях, что для вас важно, что хотели бы видеть в собеседнике"
    const names_map = ["Введите имя", "Введите возраст"]
    return(
        <div style={{width: "100%"}}>
            {set_fields.map(set => names_map.find(name => name === set.name) !== undefined &&  <OneField name={set.name} value={set.value} onchange={set.onchange}/>)}
            <div className={css.one_characteristic}>
                <div className={css.name}>
                    Выберете ваш пол
                </div>
                <div className={css.field}>
                    <MySelect onChange={e => set_fields.find(set => set.name === "select")?.onchange(e.target.value)}>
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
                    <MyTextArea value={user.description} onChange={e => set_fields.find(set => set.name === "textarea")?.onchange(e.target.value)}
                        placeholder={placeholder}/>
                </div>
            </div>
        </div>
    )
}

export default function FillUserDataFormReg({user} : {user: UserCreate}){
    const dispatch = useAppDispatch()

    const set_fields: props_field[] = [
        {name: "Введите имя", value: user.name, onchange: (e: string | number | undefined) => dispatch(changeField({...user, name: String(e)}))},
        {name: "Введите возраст", value: user.age, onchange: (e: string | number | undefined) => dispatch(changeField({...user, age: Number(e)}))},
        {name: "select", value: undefined, onchange: (e: string | number | undefined) => dispatch(changeField({...user, gender: Gender[e as keyof typeof Gender]}))},
        {name: "textarea", value: user.description, onchange: (e: string | number | undefined) => dispatch(changeField({...user, description: String(e)}))}
    ]

    return(
        <FillUserData user={user} set_fields={set_fields}/>
    )
}