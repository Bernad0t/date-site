import WrapperPages from "../../components/WrapperPages/WrapperPages";
import { CharacteristicType, IdPages } from "../../sqhemas/enums";
import PanelMain from "../../components/panel_main/panel_main";
import { Info, PhotoUser, Wrapper } from "../profile/profile";
import { useEffect, useRef, useState } from "react";
import { UserData } from "../../sqhemas/props/props";
import { CharacteristicsDTO, WayAnswerDTO } from "../../sqhemas/props/characteristics";

import css from "./css.module.css"
import { GetAnkets } from "../../api/Queries/ankets/ankets";
import LoadingComponent from "../../components/LoadingComponent";
import LikeButton from "../../UI/Buttons/Score/LikeButton/LikeButton";
import DisLikeButton from "../../UI/Buttons/Score/DisLikeButton/DisLikeButton";

export default function Ankets(){
    const [user, setUser] = useState<UserData | undefined>()
    const [ankets, setAnkets] = useState<UserData[] | undefined>([])
    const [loading, setLoading] = useState(false)
    const typesCharacteristics = useRef<CharacteristicType[]>([])

    useEffect(() => {
        GetAnkets(setLoading)
        .then(data => {
            console.log(data, "data")
            setAnkets(data)
            setUser(data[0])
        })
    }, [])

    useEffect(() => {
        typesCharacteristics.current = []
        user?.characteristics.map(char =>
            typesCharacteristics.current.find(type => type === char.type_characteristic) === undefined ?
            typesCharacteristics.current = [...typesCharacteristics.current, char.type_characteristic] : null)
    }, [user])

    return(
        <WrapperPages>
            <>
            <PanelMain id_page={IdPages.ankets}/>
            <LoadingComponent loading={loading}>
                {ankets && ankets.length !== 0 ? <Wrapper style={{display: "flex"}}>
                    <div style={{width: "50%"}}>
                        <PhotoUser user={user}/>
                        <div style={{ margin: "5px", display: "flex", justifyContent: "space-around"}}>
                            <DisLikeButton/>
                            <LikeButton/>
                        </div>
                    </div>
                    <div style={{width: "40%"}}>
                        <Info user={user}/>
                        <div className={css.characteristics}>
                            {typesCharacteristics.current.map(type => <OneTypeCharacteristic
                                characteristics={user?.characteristics.filter(char => char.type_characteristic === type)}
                                answers={user?.answers}
                                />
                            )}
                        </div>
                    </div>
                </Wrapper> : <div><h1><b>Анкет больше нет</b></h1></div>}
            </LoadingComponent>
            </>
        </WrapperPages>
    )
}

function OneTypeCharacteristic({answers, characteristics}: {answers: WayAnswerDTO[] | undefined, characteristics: CharacteristicsDTO[] | undefined}){
    return(
        characteristics && 
        <div className={css.one_type}>
            <div className={css.type_name}>
                {characteristics[0].type_characteristic}
            </div>
            <div className={css.one_char}>
                {characteristics?.map(char => <OneCharacteristic characteristic={char}/>)}
            </div>
        </div>
    )
}

function OneCharacteristic({characteristic}: {characteristic: CharacteristicsDTO}){
    return(
        <div className={css.char}>
            <div>
                <b>{characteristic.name}</b>
            </div>
            <div className={css.answers}>
                {characteristic.answers.map(ans => <OneAnswer answer={ans}/>)}
            </div>
        </div>
    )
}

function OneAnswer({answer}: {answer: WayAnswerDTO} ){
    return(
        <div className={css.one_ans}>
            {answer.answer}
        </div>
    )
}