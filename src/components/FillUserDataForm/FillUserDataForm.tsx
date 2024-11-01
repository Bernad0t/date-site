import { SetStateAction } from "react";
import { UserData, UserPropsClient } from "../../sqhemas/props";

import css from "./user.module.css"

import MyInputBase from "../../UI/MyInput/MyInputBase/MyInputBase";
import MySelect from "../../UI/MySelect/MySelect";
import { Gender } from "../../sqhemas/enums";
import MyTextArea from "../../UI/MyTextArea/MyTextArea";

export default function FillUserDataForm({user, setUser} : UserPropsClient){
    const placeholder: string = "Расскажите о своих увлечениях, что для вас важно, что хотели бы видеть в собеседнике"

    return(
        <div style={{width: "100%"}}>
            <div className={css.one_characteristic}>
                <div className={css.name}>
                    Введите имя
                </div>
                <div>
                    <MyInputBase value={user.name} placeholder="Ваше имя" onChange={e => setUser({...user, name: e.target.value})}/>
                </div>
            </div>
            <div className={css.one_characteristic}>
                <div className={css.name}>
                    Введите возраст
                </div>
                <div className={css.field}>
                    <MyInputBase value={user.name} placeholder="Ваше имя" onChange={e => setUser({...user, age: Number(e.target.value)})}/>
                </div>
            </div>
            <div className={css.one_characteristic}>
                <div className={css.name}>
                    Выберете ваш пол
                </div>
                <div className={css.field}>
                    <MySelect onChange={e => setUser({...user, gender: Gender[e.target.value as keyof typeof Gender]})}>
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
                <div className={css.field}>
                    <MyTextArea value={user.description} onChange={e => setUser({...user, description: e.target.value})}
                        placeholder={placeholder}/>
                </div>
            </div>
        </div>
    )
}