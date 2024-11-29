import { WayAnswerDTO } from "../sqhemas/props/characteristics";

export default function GetAnswers(answers: WayAnswerDTO[], id_characteristic: number){
    return(
        answers.filter(ans => ans.characteristic_id === id_characteristic)
    )
}