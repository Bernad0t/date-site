import axios from "axios";
import { SERVER } from "../ApiSource";
import { authinstance } from "../AuthInstance/AuthInstance";

export async function PostBaseAuth<Type>(data: Object, path: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>| null){
    setLoading && setLoading(true)
    return authinstance.post<Type>(`${SERVER}` + path, data, {withCredentials: true, params: {token: localStorage.getItem("access_token")}})
    .then(({data}) => {return data})
    .finally(() => setLoading && setLoading(false))
}

export async function PostBase<Type>(data: Object, path: string, setLoading: React.Dispatch<React.SetStateAction<boolean>> | null){
    setLoading && setLoading(true)
    return axios.post<Type>(`${SERVER}` + path, data, {withCredentials: true})
    .then(({data}) => {return data})
    .finally(() => setLoading && setLoading(false))
}

export async function GetBaseAuth<ResType extends unknown>(path: string, setLoading: React.Dispatch<React.SetStateAction<boolean>> | null, ...args: any[]){
    setLoading && setLoading(true)
    return authinstance.get<ResType>(`${SERVER}` + path, {params: {...args, token: localStorage.getItem("access_token")}})
    .then(({data}) => {return data})
    .finally(() => setLoading && setLoading(false))
}