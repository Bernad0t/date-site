import { CheckCorrectProps, dataForm, UserData } from "../sqhemas/props";

export function CreateEmptyDataForm(): dataForm{
    return(
        {
            mail: "",
            password: "",
            login: ""
        }
    )
}

export function CreateEmptyUserData(id: number): UserData{
    return(
        {
            id: id,
            mail: undefined,
            gender: undefined,
            name: undefined,
            age: undefined,
            description: undefined
        }
    )
}