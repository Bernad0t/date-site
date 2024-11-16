import { CharacteristicType } from "../enums"

export interface WayAnswerDTO{
    id: number
    id_characteristic: number
    answer: string
}

export interface  CharacteristicsListDTO{
    id: number
    name: string
    type_characteristic: CharacteristicType
    answers: WayAnswerDTO[]
}