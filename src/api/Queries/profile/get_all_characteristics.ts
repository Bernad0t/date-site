import axios from "axios";
import { CharacteristicsDTO } from "../../../sqhemas/props/characteristics";
import { SERVER } from "../../ApiSource";

export default function getCharacteristicsList(){
    return axios.get<CharacteristicsDTO[]>(`${SERVER}/profile/get-characteristics`)
    .then(({data}) => {return data})
}