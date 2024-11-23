import { useNavigate } from "react-router-dom";
import WrapperPages from "../../components/WrapperPages/WrapperPages";
import { GetPathAuthorization } from "../../utils/GetPath";
import { DoAuthorization, IdPages } from "../../sqhemas/enums";
import PanelMain from "../../components/panel_main/panel_main";

export default function Ankets(){
    return(
        <WrapperPages>
            <PanelMain id_page={IdPages.ankets}/>
        </WrapperPages>
    )
}