import { useEffect, useState } from "react";
import { WayAnswerDTO, CharacteristicsDTO } from "../../sqhemas/props/characteristics";
import MyCircleButton from "../../UI/Buttons/CircleButton/MyCircleButton";
import css from "./caharacteristics.module.css"
import getCharacteristicsList from "../../api/Queries/profile/get_all_characteristics";

interface props_characteristic{
    answersUser: CharacteristicsDTO[] | undefined
    setAnswersUser: React.Dispatch<React.SetStateAction<CharacteristicsDTO[] | undefined>>
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
        const answ_list = answersUser?.find(char => char.id === characteristic.id)?.answers
        return answ_list !== undefined && answ_list.length > 0
    }

    return(
        <div className={css.contain_one_char}>
            {characteristics?.map(char => OneCharacteristic(char, answersUser, setAnswersUser, CharacteristicIsChoosen(char)))}
        </div>
    )
}

function OneCharacteristic(characteristic: CharacteristicsDTO, answersUser: CharacteristicsDTO[] | undefined, setAnswersUser:
        React.Dispatch<React.SetStateAction<CharacteristicsDTO[] | undefined>>, choosen: boolean){
    function ChooseBack(changed_answer: WayAnswerDTO | undefined){
        let new_answ_arr: WayAnswerDTO[] = []
        const this_answer_arr = answersUser?.find(ans => ans.id === characteristic.id)?.answers
        if (changed_answer !== undefined){
            if (this_answer_arr?.find(ans => ans.id === changed_answer.id))
                new_answ_arr = this_answer_arr.filter(ans => ans.id !== changed_answer.id)
            else if (this_answer_arr !== undefined)
                new_answ_arr = [...this_answer_arr, changed_answer]
            else
                new_answ_arr = [changed_answer] 
            if (answersUser?.find(ans => ans.id === characteristic.id))
                setAnswersUser(answersUser?.map(
                    charact => charact.id === characteristic.id ? {...charact, answers: new_answ_arr} : charact
                ))
            else if (answersUser !== undefined)
                setAnswersUser([...answersUser, {...characteristic, answers: new_answ_arr}])
        }
    }
    
    return(
        <div style={{width: "100%", borderBottom: choosen ? "1px solid indianred": "1px solid #AFAFAF"}} className={css.one_char}>
            <div>
                {characteristic.name}
            </div>
            <div className={css.contain_answers}>
                {ChooseAnswer(characteristic.answers, answersUser?.find(ans => ans.id === characteristic.id)?.answers, ChooseBack)}
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