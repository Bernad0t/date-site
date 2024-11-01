import { UserData } from "../../../sqhemas/props";
import { SERVER } from "../../ApiSource";
import { GetBaseAuth } from "../base";

const BasePath = "/user"

export default async function GetUserData(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return GetBaseAuth<UserData>({}, BasePath + "/get-data", setLoading)
    .then((data: UserData) => {return data})
    .catch((error) => {throw error})
}