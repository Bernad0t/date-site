import { UserData } from "../../../sqhemas/props/props";
import { GetBaseAuth } from "../base";

const BasePath = "/user"

export default async function GetUserData(setLoading: React.Dispatch<React.SetStateAction<boolean>> | null) {
    return GetBaseAuth<UserData>(BasePath + "/get-data", setLoading)
    .then((data: UserData) => {return data})
}