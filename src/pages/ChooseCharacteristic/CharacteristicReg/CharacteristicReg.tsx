import { useEffect, useState } from "react";
import Characteristics from "../../../components/characteristics/characteristics";
import WrapperPages from "../../../components/WrapperPages/WrapperPages";
import LoadingComponent from "../../../components/LoadingComponent";
import { CharacteristicsDTO } from "../../../sqhemas/props/characteristics";
import get_answers, { set_answers } from "../../../api/Queries/profile/process_answers";
import ButtonRed from "../../../UI/Buttons/ButtonRed/ButtonRed";
import ToMainMenuBatton from "../../../UI/Buttons/ToMainMenu/ToMainManuButton";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../UI/Buttons/BackButton/BackButton";
import { PathMains } from "../../../sqhemas/enums";

interface props_base{
    path: string
    answers: CharacteristicsDTO[] | undefined
    setAnswers: React.Dispatch<React.SetStateAction<CharacteristicsDTO[] | undefined>>
    submit(setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void>
}

export default function CharacteristicReg(){
    const [answers, setAnswers] = useState<CharacteristicsDTO[] | undefined>(undefined)

    useEffect(() => {
        get_answers(null)
        .then((data) => {
            setAnswers(data)
        })
    }, [])

    async function submit(setLoading: React.Dispatch<React.SetStateAction<boolean>>){
        answers && 
        await set_answers(answers, setLoading)
        return
    }

    return(
        <CharacteristicsBase path="/" answers={answers} setAnswers={setAnswers} submit={submit}/>
    )
}

export function CharacteristicsProfile(){
    const [answers, setAnswers] = useState<CharacteristicsDTO[] | undefined>(undefined)

    useEffect(() => {
        get_answers(null)
        .then((data) => {
            setAnswers(data)
        })
    }, [])

    async function submit(setLoading: React.Dispatch<React.SetStateAction<boolean>>){
        answers && 
        await set_answers(answers, setLoading)
        return
    }

    return(
        <CharacteristicsBase path={PathMains.profile} answers={answers} setAnswers={setAnswers} submit={submit}/>
    )
}

function CharacteristicsBase({path, answers, setAnswers, submit}: props_base){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(answers === undefined)
    return(
        <WrapperPages>
            <div>
                {path === '/' ? <ToMainMenuBatton onClick={() => navigate(path)}/> : <BackButton onClick={() => navigate(path)}/>}
            </div>
            <div style={{marginLeft: "50px", height: "40px", alignItems: "center", display: "flex"}}>
                <b>ваша анкета не будет в рекомендациях при пустом списке ответов!</b>
            </div>
            <Characteristics answersUser={answers} setAnswersUser={setAnswers} setLoading={setLoading}/> {/* забыл про importance*/}
            <LoadingComponent loading={loading}>
                <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "10px"}}>
                    <div style={{width: "150px", height: "30px"}}>
                        <ButtonRed onClick={() => submit(setLoading).then(() => navigate(path))}>Сохранить</ButtonRed>
                    </div>
                </div>
            </LoadingComponent>
        </WrapperPages>
    )
}