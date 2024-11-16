import { useState } from "react";
import Characteristics from "../../../components/characteristics/characteristics";
import WrapperPages from "../../../components/WrapperPages/WrapperPages";
import LoadingComponent from "../../../components/LoadingComponent";

export default function CharacteristicReg(){
    const [loading, setLoading] = useState(false)
    return(
        <WrapperPages>
            <div>
                <button>позже</button>
            </div>
            <LoadingComponent loading={loading}>
                <>
                    <Characteristics setLoading={setLoading}/> {/* забыл про importance*/}
                    <div>
                        <button>Сохранить</button>
                    </div>
                </>
            </LoadingComponent>
        </WrapperPages>
    )
}