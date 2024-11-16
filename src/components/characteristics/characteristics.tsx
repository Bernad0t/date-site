import { createContext, useContext, useEffect, useState } from "react";
import { WayAnswerDTO, CharacteristicsListDTO } from "../../sqhemas/props/characteristics";
import MyCircleButton from "../../UI/Buttons/CircleButton/MyCircleButton";
import css from "./caharacteristics.module.css"
import getCharacteristicsList from "../../api/Queries/profile/get_all_characteristics";

interface props_characteristic{
    answersUser: CharacteristicsListDTO[] | undefined
    setAnswersUser: React.Dispatch<React.SetStateAction<CharacteristicsListDTO[] | undefined>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface maneger_characteristics{
    characteristics: CharacteristicsListDTO[]
    setCharacteristics: React.Dispatch<React.SetStateAction<CharacteristicsListDTO[] | undefined>>
}

const characteristicsContext = createContext<maneger_characteristics | undefined>(undefined);

export default function Characteristics({answersUser, setAnswersUser, setLoading}: props_characteristic){ // логичнее передавать answers, srtAnsw
    const [characteristics, setCharacteristics] = useState<CharacteristicsListDTO[] | undefined>()
    const [providerContext, setProviderContext] = useState<maneger_characteristics | undefined>(undefined)

    useEffect(() => {
        setLoading(true)
        getCharacteristicsList()
        .then(data => {
            setCharacteristics(data)
            setProviderContext({
                characteristics: answersUser === undefined ?  data.map(char => {return {...char, answers: []}}) : answersUser, 
                setCharacteristics: setAnswersUser
            })
        })
        .finally(() => setLoading(false))
    }, [])

    return(
        <div className={css.contain_one_char}>
            {characteristics && characteristics.map(char => <characteristicsContext.Provider value={providerContext}>{OneCharacteristic(char)}</characteristicsContext.Provider>)}
        </div>
    )
}

function OneCharacteristic(characteristic: CharacteristicsListDTO){
    const characteristicsManeger = useContext(characteristicsContext)
    const answ_list: WayAnswerDTO[] | undefined = characteristicsManeger?.characteristics.find(
        char => char.id === characteristic.id
    )?.answers

    const [choosen, setChoosen] = useState<boolean>(answ_list !== undefined && answ_list.length > 0)
    
    return(
        <div style={{width: "100%", borderBottom: choosen ? "1px solid indianred": "1px solid #AFAFAF"}} className={css.one_char}>
            <div>
                {characteristic.name}
            </div>
            <div className={css.contain_answers}>
                {ChooseAnswer(characteristic.answers, (state: boolean) => setChoosen(state))}
            </div>
        </div>
    )
}

function ChooseAnswer(answers: WayAnswerDTO[], ChooseBack: (state: boolean) => void){
    const characteristicsManeger = useContext(characteristicsContext) 
    const answ_list: WayAnswerDTO[] | undefined = characteristicsManeger?.characteristics.find(
        char => char.id === answers[0].id_characteristic
    )?.answers

    const [buttons, setButtons] = useState(answers.map(answer => {return {
        name: answer.answer, 
        selected: answ_list !== undefined && answ_list.find(answ => answ.answer === answer.answer) !== undefined
    }}))

    useEffect(() => {
        if (buttons.find(but => but.selected))
            ChooseBack(true)
        else
            ChooseBack(false)
        characteristicsManeger?.setCharacteristics(characteristicsManeger.characteristics?.map(
            charact => charact.id === answers[0].id_characteristic ? {...charact, answers: answers.filter(
                answ => buttons.find(button => button.name === answ.answer && button.selected) 
            )} : charact
        ))
    }, [buttons])

    function CallBack(name: string){
        setButtons(buttons.map(but => but.name === name ? {...but, selected: !but.selected} : but))
    }

    return(
        <div>
            {buttons.map(but => OneButChoose(but.selected, but.name, CallBack))}
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