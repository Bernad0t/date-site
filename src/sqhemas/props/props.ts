import { Gender } from "../enums"
import { CharacteristicsDTO, WayAnswerDTO } from "./characteristics"

export interface CheckCorrectProps{
    node: JSX.Element
    correct: boolean
}

export interface dataForm{
    mail: string
    login: string
    password: string 
}

interface CommonUser{
    mail: string | undefined
    gender: Gender| undefined
    name: string | undefined
    age: number | undefined
    description: string | undefined
    preview: string | undefined
}

export interface UserCreate extends CommonUser{
    login: string
    password: string
}

export interface UserData extends CommonUser{
    id: number
    characteristics: CharacteristicsDTO[]
    answers: WayAnswerDTO[]
}

export interface TokensDTO{
    access_token: string
    refresh_token: string
    user_id: number
}