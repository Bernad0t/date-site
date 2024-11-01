import axios from "axios";
import { SERVER } from "../ApiSource";
import { authinstance } from "../AuthInstance/AuthInstance";

export async function PostBaseAuth<Type>(data: Type, path: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>){
    return authinstance.post<unknown>(`${SERVER}` + path, data, {withCredentials: true})
    .then(({data}) => {return data})
    .catch(error => {throw error})
    .finally(() => setLoading(false))
}

export async function PostBase<Type>(data: Object, path: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>){
    return axios.post<Type>(`${SERVER}` + path, data, {withCredentials: true})
    .then(({data}) => {return data})
    .catch(error => {throw error})
    .finally(() => setLoading(false))
}

export async function GetBaseAuth<ResType extends unknown>(params: Object, path: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>){
    return authinstance.get<ResType>(`${SERVER}` + path, {params: {...params, token: localStorage.getItem("access_token")}})
    .then(({data}) => {return data})
    .catch(error => {throw error})
    .finally(() => setLoading(false))
}