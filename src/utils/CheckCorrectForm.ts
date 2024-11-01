import { dataForm } from "../sqhemas/props";

export default function CheckCorrectForm(data: dataForm){
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++){
        if (data[keys[i] as keyof typeof data].length === 0){
            return "Не все поля заполнены"
        }
    }
    return ""
}