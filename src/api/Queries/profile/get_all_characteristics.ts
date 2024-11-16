import axios from "axios";
import { CharacteristicsListDTO } from "../../../sqhemas/props/characteristics";
import { SERVER } from "../../ApiSource";
import { error } from "console";

export default function getCharacteristicsList(){
    return axios.get<CharacteristicsListDTO[]>(`${SERVER}/profile/get-characteristics`)
    .then(({data}) => {return data})
    .catch(error => {throw error})
}