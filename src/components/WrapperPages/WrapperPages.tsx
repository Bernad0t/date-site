import React, { useEffect } from "react";
import styleWrap from "./WrapperPages.module.css"
import { useNavigate } from "react-router-dom";
import { DoAuthorization } from "../../sqhemas/enums";
import { CheckIsActive } from "../../api/Queries/Authorization/auth";
import { GetPathAuthorization } from "../../utils/GetPath";

export default function WrapperPages({children}: {children: React.ReactNode}){
    const navigate = useNavigate()

    useEffect(() => {
        console.log(localStorage.getItem("access_token"))
        if (localStorage.getItem("access_token") === null)
            navigate(GetPathAuthorization(DoAuthorization.do_auth))
        else{
            CheckIsActive()
            .then((data) => {
                if (!data)
                    navigate(GetPathAuthorization(DoAuthorization.do_auth))
            })
            .catch(error => {
                if (error.status === 401)
                    navigate(GetPathAuthorization(DoAuthorization.do_auth))
            })
        }
    }, [])

    return(
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export function WrapperPageReg({children}: {children: React.ReactNode}){
    return(
        <Wrapper>
            {children}
        </Wrapper>
    )

}

function Wrapper({children}: {children: React.ReactNode}){
    return(
        <div className={styleWrap.wrap}>
            {children}
        </div>
    )
}