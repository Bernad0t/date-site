import { useEffect, useState } from "react";
import Characteristics from "../../../components/characteristics/characteristics";
import WrapperPages from "../../../components/WrapperPages/WrapperPages";
import LoadingComponent from "../../../components/LoadingComponent";
import { CharacteristicsDTO } from "../../../sqhemas/props/characteristics";
import get_answers, { set_answers } from "../../../api/Queries/profile/process_answers";
import ButtonRed from "../../../UI/Buttons/ButtonRed/ButtonRed";
import ToMainMenuBatton from "../../../UI/Buttons/ToMainMenu/ToMainManuButton";
import { useNavigate } from "react-router-dom";

export default function CharacteristicReg(){
    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState<CharacteristicsDTO[] | undefined>([])

    const navigate = useNavigate()
    useEffect(() => {
        get_answers(setLoading)
        .then((data) => {
            setAnswers(data)
        })
    }, [])

    function submit(){
        answers && 
        set_answers(answers, setLoading)
        .then(() => navigate("/"))
    }

    return(
        <WrapperPages>
            <div>
                <ToMainMenuBatton onClick={() => navigate("/")}/>
            </div>
            <Characteristics answersUser={answers} setAnswersUser={setAnswers} setLoading={setLoading}/> {/* забыл про importance*/}
            <LoadingComponent loading={loading}>
                <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "10px"}}>
                    <div style={{width: "150px", height: "30px"}}>
                        <ButtonRed onClick={submit}>Сохранить</ButtonRed>
                    </div>
                </div>
            </LoadingComponent>
        </WrapperPages>
    )
}