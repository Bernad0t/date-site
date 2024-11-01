import React from "react";
import styleWrap from "./WrapperPages.module.css"

export default function WrapperPages({children}: {children: React.ReactNode}){
    return(
        <div className={styleWrap.wrap}>
            {children}
        </div>
    )
}