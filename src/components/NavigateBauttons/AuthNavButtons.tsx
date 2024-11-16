import { useEffect, useState } from "react"
import ButtonForm from "../../UI/Buttons/ButtonForm/ButtonForm"
import { useNavigate } from "react-router-dom"
import { DoAuthorization } from "../../sqhemas/enums"
import { GetPathAuthorization } from "../../utils/GetPath"

interface StructButton{
    id: number
    name: string
    active: boolean
    path: string
}

function OneBut(struct: StructButton, Click: (id: number,) => void){
    return(
        <div style={{height: "30px", minWidth: "100px"}}>
            <ButtonForm key={struct.id} active={struct.active} onClick={() => Click(struct.id)}>{struct.name}</ButtonForm>
        </div>
    )
}

export default function AuthNavButtons(){
    const [structButtons, setStructButtons] = useState<StructButton[]>([
        {id: 0, name: "Войти", active: true, path: GetPathAuthorization(DoAuthorization.do_auth)},
        {id: 1, name: "Регистрация", active: false, path: GetPathAuthorization(DoAuthorization.do_reg)}
    ])
    const navigate = useNavigate()
    useEffect(() => {
        const path = structButtons.find(struct => struct.active)?.path
        navigate(path ? path : "")
    }, [structButtons])

    function Click(id: number){
        setStructButtons(structButtons.map(struct => struct.active ? {...struct, active: false}: struct.id === id ?
            {...struct, active: true} : struct))
    }

    return(
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "space-around"}}>
            {structButtons.map(struct => OneBut(struct, Click))}
        </div>
    )
}