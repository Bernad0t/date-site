import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateEmptyNewUserData } from "../../utils/CreateEmptyObj";
import { UserCreate } from "../../sqhemas/props/props";

const initialState: UserCreate = CreateEmptyNewUserData()

const createUserSlice = createSlice({
    name: 'create_user',
    initialState,
    reducers: {
        changeField(state, action: PayloadAction<UserCreate>){
            return {...state, ...action.payload}
        }
    }
})

export const { changeField } = createUserSlice.actions

export const createUserReducer = createUserSlice.reducer