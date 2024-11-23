import { TokensDTO, UserCreate } from "../../../sqhemas/props/props";
import { GetBaseAuth, PostBase } from "../base";

const BaseAuth = "/auth"

export async function RegQuery(data: UserCreate, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    setLoading(true)
    return PostBase<TokensDTO>(data, BaseAuth + "/sign-up", setLoading)
    .then((tokens: TokensDTO) => {
        console.log(tokens, "tok")
        localStorage.setItem("access_token", tokens.access_token)
        localStorage.setItem("refresh_token", tokens.refresh_token)
        return tokens.user_id
    })
}

export async function AuthQuery(data: UserCreate, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    setLoading(true)
    return PostBase<TokensDTO>(data, BaseAuth + "/sign-in", setLoading)
    .then((tokens: TokensDTO) => {
        localStorage.setItem("access_token", tokens.access_token)
        localStorage.setItem("refresh_token", tokens.refresh_token)
        return
    })
}

export async function CheckIsActive() {
    return GetBaseAuth<boolean>(BaseAuth + "/is-active", null)
    .then((data) => {return data})
}