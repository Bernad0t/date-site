import { useNavigate } from "react-router-dom";
import WrapperPages from "../../components/WrapperPages/WrapperPages";
import { GetPathAuthorization } from "../../utils/GetPath";
import { DoAuthorization } from "../../sqhemas/enums";

export default function Ankets(){
    const navigate = useNavigate()
    return(
        <WrapperPages>
            <div>
                <button onClick={() => navigate(GetPathAuthorization(DoAuthorization.do_auth))}>auth</button>
            </div>
        </WrapperPages>
    )
}