import { useState } from "react";
// import { CreateEmptyDataForm, CreateEmptyNewUserData } from "../../utils/CreateEmptyObj";
import AuthForm from "../../components/AuthorizationForm/AuthorizationForm";
import AuthNavButtons from "../../components/NavigateBauttons/AuthNavButtons";
import WrapperPages from "../../components/WrapperPages/WrapperPages";

import css from "./Auth.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { DoAuthorization } from "../../sqhemas/enums";
// import { AuthQuery as AuthApi, RegQuery as RegApi } from "../../api/Queries/Authorization/auth";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorMessage from "../../components/ErrorMessage";
import { GetPathRegCharacteristics } from "../../utils/GetPath";
import { AuthQuery } from "../../api/Queries/Authorization/auth";
import { useAppSelector } from "../../hooks/useStore/useStore";
import { selectCreateUser } from "../../store/store";

function RegistrationComp(){
    const navigate = useNavigate()
    
    function Submit(){
        navigate(GetPathRegCharacteristics())
    }
    
    return(
            <AuthForm submit={() => Submit()} nameSubmit="Далее"/>
    )
}

function AuthorizationComp(){
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [errorMes, setErrorMes] = useState("")

    const data = useAppSelector(selectCreateUser)

    function Submit(){
        AuthQuery(data, setLoading)
        .then(() => navigate("/"))
        .catch((error) => {
            console.log(error, "error")
            if (error.status === 400)
                setErrorMes("Неверный логин, пароль или почта")
            else
                setErrorMes("что-то пошло не так")
            
        })
    }
    
    return(
        <LoadingComponent loading={loading}>
            <>
                <AuthForm submit={Submit} nameSubmit="войти"/>
                <ErrorMessage message={errorMes}/>
            </>
        </LoadingComponent>
    )
}

export default function AuthorizationPage(){
    const params = useParams()
    return(
        <WrapperPages>
            <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
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
            </div>
        </WrapperPages>
    )
}