import { Gender } from "./enums"

export interface CheckCorrectProps{
    node: JSX.Element
    correct: boolean
}

export interface dataForm{
    mail: string
    login: string
    password: string 
}

export interface UserCreate{
    login: string
    password: string
    mail: string
}

export interface UserData{
    id: number
    mail: string | undefined
    gender: Gender| undefined
    name: string | undefined
    age: number | undefined
    description: string | undefined
}

export interface UserPropsClient{
    user: UserData
    setUser:  React.Dispatch<React.SetStateAction<UserData>>
}

export interface TokensDTO{
    access_token: string
    refresh_token: string
    user_id: number
}