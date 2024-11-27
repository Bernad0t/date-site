import { CharacteristicsDTO } from "../../../sqhemas/props/characteristics";
import { GetBaseAuth, PostBaseAuth } from "../base";

const base = "/profile"

export function set_answers(characteristics: CharacteristicsDTO[], setLoading: React.Dispatch<React.SetStateAction<boolean>>){
    return PostBaseAuth(characteristics, base + "/set-answers", setLoading)
    .catch(error => {throw error})
}

export default function get_answers(setLoading: React.Dispatch<React.SetStateAction<boolean>> | null){
    setLoading && setLoading(true)
    return GetBaseAuth<CharacteristicsDTO[]>(base + "/get-answers", setLoading)
    .then(data => {return data})
    .catch(error => {throw error})
}