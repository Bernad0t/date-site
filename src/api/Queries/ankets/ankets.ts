import { UserData } from "../../../sqhemas/props/props";
import { GetBaseAuth } from "../base";

const path = "/partner"

export async function GetAnkets(setLoading: React.Dispatch<React.SetStateAction<boolean>> | null){
    return(
        GetBaseAuth<UserData[]>(path + "/ankets", setLoading)
        .then(data => {return data})
    )
}