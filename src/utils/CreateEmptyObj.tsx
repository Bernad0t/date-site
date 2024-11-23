import { dataForm, UserCreate, UserData } from "../sqhemas/props/props";

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
            description: undefined,
            preview: undefined
        }
    )
}

export function CreateEmptyNewUserData(): UserCreate{
    return(
        {
            login: "",
            password: "",
            mail: undefined,
            gender: undefined,
            name: undefined,
            age: undefined,
            description: undefined,
            preview: undefined
        }
    )
}