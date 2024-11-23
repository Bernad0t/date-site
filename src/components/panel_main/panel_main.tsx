import { useNavigate } from "react-router-dom";
import { IdPages, PathMains } from "../../sqhemas/enums";

import css from "./Wrapper.Main.module.css"
import MenuButton from "../../UI/Buttons/MenuButton/MenuButton";

interface ButtonProp{
    id: IdPages,
    name: string,
    path: PathMains,
    selected: boolean
}

function OneButton({id, name, path, selected}: ButtonProp){
    const navigate = useNavigate()

    return(
        <div style={{width: "25%", minWidth: "80px", height: "40px"}}>
            <MenuButton active={selected} onClick={() => navigate(path)}>{name}</MenuButton>
        </div>
    )
}

function ButtonMenu({id_page}: {id_page: IdPages}){
    const buttons: ButtonProp[] = [
        {id: IdPages.ankets, name: "Анкеты", path: PathMains.ankets, selected: id_page === IdPages.ankets},
        {id: IdPages.likes, name: "Лайки", path: PathMains.likes, selected: id_page === IdPages.likes},
        {id: IdPages.chats, name: "Чаты", path: PathMains.chats, selected: id_page === IdPages.chats},
        {id: IdPages.profile, name: "Профиль", path: PathMains.profile, selected: id_page === IdPages.profile}
    ]

    return(
        <div style={{display: "flex", width: "50%", height: "100%"}}>
            {buttons.map(but => <OneButton {...but}/>)}
        </div>
    )
}

export default function PanelMain({id_page}: {id_page: IdPages}){
    return(
        <div style={{borderBottom: "2px solid #AFAFAF", width: "100%", height: "40px"}}>
            <ButtonMenu id_page={id_page}/>
        </div>
    )
}