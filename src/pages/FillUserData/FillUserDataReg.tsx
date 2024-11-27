import { useEffect, useState } from "react";
import ButtonForm from "../../UI/Buttons/ButtonForm/ButtonForm";
import FillUserDataFormReg from "../../components/FillUserDataForm/FillUserDataForm";
import { useAppSelector } from "../../hooks/useStore/useStore";
import { selectCreateUser } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { GetPathAuthorization } from "../../utils/GetPath";
import { DoAuthorization, PathProfileCharacteristics } from "../../sqhemas/enums";
import WrapperPages from "../../components/WrapperPages/WrapperPages";
import BackButton from "../../UI/Buttons/BackButton/BackButton";
import useCheckCorrectForm from "../../hooks/useCheckCorrectForm/useCheckCorrectForm";
import CheckCorrectForm from "../../utils/CheckCorrectForm";
import { RegQuery } from "../../api/Queries/Authorization/auth";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorMessage from "../../components/ErrorMessage";

export default function FillUserDataReg(){ // добавить 3 точки, означающие прогресс регистрации
    const user = useAppSelector(selectCreateUser)
    const navigate = useNavigate()
    const keys: string[] = Object.keys(user).slice(4, ) // not [mail log pas]
    const correctForm = useCheckCorrectForm({data: user, keys: keys, CheckDataCorrect: CheckCorrectForm})
    const [errorMessage, setErrorMessage ] = useState<string>("") 
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.login.length === 0)
            navigate(GetPathAuthorization(DoAuthorization.do_reg))
    }, [])

    function submit(){
        RegQuery(user, setLoading)
        .then(() => navigate(PathProfileCharacteristics.reg))
        .catch(error => {
            if (error.status === 400)
                setErrorMessage("Такой пользователь существует")
            else if (error.status === 422)
                setErrorMessage("Некорректные данные")
            else
                setErrorMessage("Что-то пошло не так")
        })
    }

    return(
        <WrapperPages>
                <BackButton onClick={() => navigate(GetPathAuthorization(DoAuthorization.do_reg))}/>
                <LoadingComponent loading={loading}>
                    <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div style={{width: "60%"}}>
                            <FillUserDataFormReg user={user}/>
                            <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                                <div style={{width: "80%", height: "30px"}}>
                                    <ButtonForm active={correctForm.correct} disabled={!correctForm.correct} onClick={() => submit()}>Зарегистрироваться</ButtonForm> 
                                    {correctForm.node}
                                    <ErrorMessage message={errorMessage}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoadingComponent>
        </WrapperPages>
    )
}