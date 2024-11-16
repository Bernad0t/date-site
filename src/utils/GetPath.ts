import { DoAuthorization, PathPagesAuth } from "../sqhemas/enums";

export function GetPathAuthorization(param: DoAuthorization){
    return PathPagesAuth.auth + `/${param}`
}

export function GetPathRegCharacteristics(){
     return PathPagesAuth.reg
}