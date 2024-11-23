import { Gender } from "../enums"
import { UserCreate, UserData } from "./props"

export interface props_field{
    name: string
    value: string | number | undefined
    onchange: (e: string | number | Gender) => void
}

export interface props_fill_form{
    set_fields: props_field[]
    user: UserCreate | UserData
}