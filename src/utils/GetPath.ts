import { DoAuthorization, PathPagesAuth } from "../sqhemas/enums";

export function GetPathAuthorization(param: DoAuthorization){
    return PathPagesAuth.auth + `/${param}`
}

export function GetPathRegCharacteristics(user_id: number){
     return PathPagesAuth.reg + `/${user_id}`
}