import { dataForm } from "../sqhemas/props/props";

export default function CheckCorrectForm(data: dataForm, keys: string[]){
    for (let i = 0; i < keys.length; i++){
        if (keys[i] !== "preview" && (data[keys[i] as keyof typeof data] === undefined || data[keys[i] as keyof typeof data].length === 0)){
            return "Не все поля заполнены"
        }
    }
    return ""
}