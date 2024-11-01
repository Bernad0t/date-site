import { useEffect, useState } from "react";
import useCheckCorrectForm from "../../hooks/useCheckCorrectForm/useCheckCorrectForm";
import { UserData, UserPropsClient } from "../../sqhemas/props";
import ButtonForm from "../../UI/Buttons/ButtonForm/ButtonForm";
import useGetUserData from "../../hooks/useGetDataApi/useGetUserData";
import { useParams } from "react-router-dom";
import { CreateEmptyUserData } from "../../utils/CreateEmptyObj";
import FillUserDataForm from "../../components/FillUserDataForm/FillUserDataForm";

function submit(){

}

export default function FillUserDataReg(){ // добавить 3 точки, означающие прогресс регистрации
    const params = useParams()

    const [user, setUser] = useState<UserData>(CreateEmptyUserData(Number(params.id)))
    const [loading, setLoading] = useState(true)

    useGetUserData(Number(params.id), setLoading, setUser)

    return(
        <div>
            <FillUserDataForm user={user} setUser={setUser}/>
            <div style={{width: "80%", height: "30px"}}>
                <ButtonForm active={true} onClick={() => submit()}>Сохранить</ButtonForm> 
            </div>
        </div>
    )
}