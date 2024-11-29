import { useEffect, useState } from "react";
import { WayAnswerDTO, CharacteristicsDTO } from "../../sqhemas/props/characteristics";
import MyCircleButton from "../../UI/Buttons/CircleButton/MyCircleButton";
import css from "./caharacteristics.module.css"
import getCharacteristicsList from "../../api/Queries/profile/get_all_characteristics";

interface props_characteristic{
    answersUser: WayAnswerDTO[] | undefined
    setAnswersUser: React.Dispatch<React.SetStateAction<WayAnswerDTO[] | undefined>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Characteristics({answersUser, setAnswersUser, setLoading}: props_characteristic){
    const [characteristics, setCharacteristics] = useState<CharacteristicsDTO[] | undefined>()
    
    useEffect(() => {
        setLoading(true)
        getCharacteristicsList()
        .then(data => {
            setCharacteristics(data)
        })
        .finally(() => setLoading(false))
    }, [])
    console.log(answersUser, "answ")
    function CharacteristicIsChoosen(characteristic: CharacteristicsDTO){
        const answ_list = answersUser?.find(ans => ans.characteristic_id === characteristic.id)
        return answ_list !== undefined
    }

    return(
        <div className={css.contain_one_char}>
            {characteristics?.map(char => OneCharacteristic(char, answersUser, setAnswersUser, CharacteristicIsChoosen(char)))}
        </div>
    )
}

function OneCharacteristic(characteristic: CharacteristicsDTO, answersUser: WayAnswerDTO[] | undefined, setAnswersUser:
        React.Dispatch<React.SetStateAction<WayAnswerDTO[] | undefined>>, choosen: boolean){
    function ChooseBack(changed_answer: WayAnswerDTO | undefined){
        if (answersUser && changed_answer){
            if (answersUser?.find(ans => ans.id === changed_answer?.id))
                setAnswersUser(answersUser.filter(answ => answ.id !== changed_answer?.id))
            else
                setAnswersUser([...answersUser, changed_answer])
        }
        else if (changed_answer)
            setAnswersUser([changed_answer])
    }
    
    return(
        <div style={{width: "100%", borderBottom: choosen ? "1px solid indianred": "1px solid #AFAFAF"}} className={css.one_char}>
            <div>
                {characteristic.name}
            </div>
            <div className={css.contain_answers}>
                {ChooseAnswer(characteristic.answers, answersUser?.filter(ans => ans.characteristic_id === characteristic.id), ChooseBack)}
            </div>
        </div>
    )
}

function ChooseAnswer(answers: WayAnswerDTO[], selected_answers: WayAnswerDTO[] | undefined, 
        ChooseBack: (changed_answer: WayAnswerDTO | undefined) => void){

    function AnsIsSelected(answer: string | undefined): boolean{
        return answer !== undefined && selected_answers !== undefined && selected_answers.find(answ => answ.answer === answer) !== undefined
    }

    return(
        <div>
            {answers.map(ans => OneButChoose(AnsIsSelected(ans.answer), ans.answer, (name: string) => ChooseBack(answers.find(ans => ans.answer === name))))}
        </div>
    )
}

function OneButChoose(selected: boolean, name: string, CallBack: (name: string) => void){
    return(
        <div onClick={() => CallBack(name)} className={css.one_but}>
            <div className={css.choose}>
                <div style={{minHeight: "calc(100% + 0px)", minWidth: "10px", backgroundColor: selected ? "indianred" : "#AFAFAF", position: "absolute"}}></div>
                <div style={{position: "absolute"}}>
                    <MyCircleButton selected={selected}/>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: "center", paddingLeft: "60px"}}>
                {name}
            </div>
        </div>
    )
}