import { useEffect } from "react";
import { UserData } from "../../sqhemas/props";
import GetUserData from "../../api/Queries/User/ProcessUserData";

export default function useGetUserData(id: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    setUserData: React.Dispatch<React.SetStateAction<UserData>>){

    useEffect(() => {
        GetUserData(setLoading)
        .then((data: UserData) => setUserData(data))
    }, [])

}