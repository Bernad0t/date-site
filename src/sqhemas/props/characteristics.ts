import { CharacteristicType } from "../enums"

export interface WayAnswerDTO{
    id: number
    characteristic_id: number
    answer: string
}

export interface  CharacteristicsDTO{
    id: number
    name: string
    type_characteristic: CharacteristicType
    // answers: WayAnswerDTO[]
}