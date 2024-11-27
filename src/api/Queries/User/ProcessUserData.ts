import { UserData } from "../../../sqhemas/props/props";
import { GetBaseAuth, PostBaseAuth } from "../base";

const BasePath = "/user"

export default async function GetUserData(setLoading: React.Dispatch<React.SetStateAction<boolean>> | null) {
    return GetBaseAuth<UserData>(BasePath + "/get-data", setLoading)
    .then((data: UserData) => {return data})
}

export async function SetUserData(data: UserData, file: File | null, setLoading: React.Dispatch<React.SetStateAction<boolean>> | null) {
    setLoading && setLoading(true)
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    file && formData.append('file', file)
    return PostBaseAuth<UserData>(formData, BasePath + "/set-data", setLoading)
    .then((data: UserData) => {return data})
}