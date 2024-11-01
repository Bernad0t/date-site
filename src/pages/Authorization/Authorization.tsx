import { useState } from "react";
import { CreateEmptyDataForm } from "../../utils/CreateEmptyObj";
import AuthForm from "../../components/AuthorizationForm/AuthorizationForm";
import AuthNavButtons from "../../components/NavigateBauttons/AuthNavButtons";
import WrapperPages from "../../components/WrapperPages/WrapperPages";

import css from "./Auth.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { DoAuthorization } from "../../sqhemas/enums";
import { AuthQuery as AuthApi, RegQuery as RegApi } from "../../api/Queries/Authorization/auth";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorMessage from "../../components/ErrorMessage";
import { GetPathRegCharacteristics } from "../../utils/GetPath";

function RegistrationComp(){
    const [data, setData] = useState(CreateEmptyDataForm())
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [errorMes, setErrorMes] = useState("")
    
    function Submit(){
        console.log("reg")
        RegApi(data, setLoading)
        .then((id) => navigate(GetPathRegCharacteristics(id)))
        .catch((error) => {
            console.log(error, "error")
            if (error.status && error.status === 400)
                setErrorMes("Пользователь уже существует")
            else
                setErrorMes("что-то пошло не так")
        })
    }
    
    return(
        <LoadingComponent loading={loading}>
            <>
                <AuthForm data={{...data}} setData={setData} submit={() => Submit()} nameSubmit="Зарегистрироваться"/>
                <ErrorMessage message={errorMes}/>
            </>
        </LoadingComponent>
    )
}

function AuthorizationComp(){
    const [data, setData] = useState(CreateEmptyDataForm())
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [errorMes, setErrorMes] = useState("")

    function Submit(){
        AuthApi(data, setLoading)
        .then(() => navigate("/"))
        .catch((error) => {
            if (error.status.code == 400)
                setErrorMes("Неверный логин, пароль или почта")
            else
                setErrorMes("что-то пошло не так")
            
        })
    }
    
    return(
        <LoadingComponent loading={loading}>
            <>
                <AuthForm data={{...data}} setData={setData} submit={Submit} nameSubmit="войти"/>
                <ErrorMessage message={errorMes}/>
            </>
        </LoadingComponent>
    )
}

export default function AuthorizationPage(){
    const params = useParams()
    return(
        <WrapperPages>
            <div style={{width: "60%", height: "40vh"}}>
                <div className={css.nav_buttons}>
                    <AuthNavButtons/>
                </div>
                <div className={css.form} style={{display: params.do === DoAuthorization.do_auth ? "" : "none"}}>
                    {AuthorizationComp()}
                </div>
                <div className={css.form} style={{display: params.do === DoAuthorization.do_reg ? "" : "none"}}>
                    {RegistrationComp()}
                </div>
            </div>
        </WrapperPages>
    )
}