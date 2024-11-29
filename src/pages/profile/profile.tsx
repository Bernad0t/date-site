import { InputHTMLAttributes, useEffect, useState } from "react";
import PanelMain from "../../components/panel_main/panel_main";
import WrapperPages from "../../components/WrapperPages/WrapperPages";
import { Gender, IdPages, PathProfileCharacteristics, UserDataPlaceholders } from "../../sqhemas/enums";
import { UserData } from "../../sqhemas/props/props";
import LoadingComponent from "../../components/LoadingComponent";
import WrapperImage from "../../components/WrapperImage/WrapperImage";
import GetUserData, { SetUserData } from "../../api/Queries/User/ProcessUserData";
import RefactorButton from "../../UI/Buttons/Refactor/Refactor";
import AddButton from "../../UI/Buttons/AddButton/AddButton";
import BackButton from "../../UI/Buttons/BackButton/BackButton";
import { FillUserData } from "../../components/FillUserDataForm/FillUserDataForm";
import { props_field } from "../../sqhemas/props/fill_data";
import CharacteristicsButton from "../../UI/Buttons/CharacteristicsButton/CharacteristicsButton";
import { useNavigate } from "react-router-dom";
import ButtonRed from "../../UI/Buttons/ButtonRed/ButtonRed";
import ErrorMessage from "../../components/ErrorMessage";
import { CharacteristicsDTO } from "../../sqhemas/props/characteristics";

export default function Profile(){
    const [user, setUser] = useState<UserData | undefined>()
    const [userCopy, setUserCopy] = useState<UserData | undefined>()
    const [refactorState, setRefactorState] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [errorMes, setErrorMes] = useState("")
    const navigate = useNavigate()

    console.log(user, "user")

    useEffect(() => {
        GetUserData(null)
        .then((data) => {setUser(data); setUserCopy(data)})
    }, [])

    function handleBack(){
        setUserCopy(user)
        setFile(null)
        setRefactorState(!refactorState)
    }

    function handleApplyChange(){
        userCopy && SetUserData({...userCopy, preview: user?.preview}, file, setLoading)
        .then(() => {setRefactorState(!refactorState); setErrorMes(""); setUser(userCopy)})
        .catch(() => setErrorMes("что-то пошло не так"))
    }

    return(
        <WrapperPages>
            <>
                <PanelMain id_page={IdPages.profile}/>
                <Wrapper style={{display: refactorState ? "none" : "flex"}}>
                    <div style={{width: "50%"}}>
                        <PhotoUser user={user}/>
                    </div>
                    <div style={{width: "40%"}}>
                        <Info user={user}/>
                    </div>
                    <div style={{width: "5%"}}>
                        <div style={{height: "40px"}}>
                            <RefactorButton onClick={() => setRefactorState(!refactorState)}/>
                        </div>
                        <div style={{height: "40px"}}>
                            <CharacteristicsButton onClick={() => navigate(PathProfileCharacteristics.user)}/>
                        </div>
                    </div>
                </Wrapper>
                <Wrapper style={{display: !refactorState ? "none" : "flex"}}>
                    <LoadingComponent loading={loading}>
                        <>
                        <div style={{width: "50%"}}>
                            <ChangePhotoUser user={userCopy} setUser={setUserCopy} file={file} setFile={setFile}/>
                        </div>
                        <div style={{width: "40%"}}>
                            <PlaceInfo>
                                <>
                                <ChangeInfo user={userCopy} setUser={setUserCopy}/>
                                <div style={{width: "100%", display: "flex", justifyContent: "center", padding: "10px"}}>
                                    <div style={{width: "100px", height: "30px"}}>
                                        <ButtonRed onClick={handleApplyChange}>Сохранить</ButtonRed>
                                    </div>
                                </div>
                                <ErrorMessage message={errorMes}/>
                                </>
                            </PlaceInfo>
                        </div>
                        <div style={{width: "5%"}}>
                            <BackButton onClick={handleBack}/>
                        </div>
                        </>
                    </LoadingComponent>
                </Wrapper>
            </>
        </WrapperPages>
    )
}

export function Wrapper({children, ...props}: InputHTMLAttributes<HTMLDivElement>){
    return(
        <div style={{ marginTop: "10px", display: props.style?.display, justifyContent: "space-between", width: "100%"}}>
            {children}
        </div>
    )
}

function PlacePhoto({children}: {children: JSX.Element}){
    return(
        <div style={{width: "100%", height: "400px", position: "relative"}}>
            {children}
        </div>
    )
}


export function PhotoUser({user}: {user: UserData | undefined}){
    return(
        <PlacePhoto>
            <LoadingComponent loading={user === undefined}>
                <WrapperImage my_src={user?.preview}/>
            </LoadingComponent>
        </PlacePhoto>
    )
}

function PlaceInfo({children}: {children: JSX.Element}){
    return(
        <div style={{width: "100%", maxHeight: "100%", overflow: "auto", overflowX: "hidden"}}>
            {children}
        </div>
    )
}

export function Info({user}: {user: UserData | undefined}){
    const fields = ["name", "age", "description"]
    return(
        <PlaceInfo>
            <>
                {user && fields.map(field => 
                    <OneFieldProfile field={field}>
                        <div>
                            {user && {...user, characteristics: "", answers: ""}[field as keyof typeof user]}
                        </div>
                    </OneFieldProfile>
                )}
            </>
        </PlaceInfo>
    )
}

function OneFieldProfile({field, children}: {field: string, children: JSX.Element}){
    return(
        <div style={{width: "100%", marginTop: "10px"}}>
            <div>
                <b>{UserDataPlaceholders[field as keyof typeof UserDataPlaceholders]}</b>
            </div>
            {children}
        </div>
    )
}

function ChangePhotoUser({user, setUser, file, setFile}: {user: UserData | undefined, file: File | null,
     setFile: React.Dispatch<React.SetStateAction<File | null>>, setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>}){

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        if (e.target.files !== null && user){
            setFile(e.target.files[0])
            setUser({...user, preview: URL.createObjectURL(e.target.files[0])})
        }
    }

    return(
        <PlacePhoto>
            <>
                <WrapperImage my_src={user?.preview}/>
                <div style={{position: "absolute", top: "calc(50% - 52.5px)", left: "calc(50% - 52.5px)"}}>
                    <AddButton style={{width: "100px", height: "100px"}} onChange={e => handleChange(e)}/>
                </div>
            </>
        </PlacePhoto>
    )
}

function ChangeInfo({user, setUser}: {user: UserData | undefined, setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>}){
    const fields: props_field[] = [
        {name: "Введите имя", value: user?.name, onchange: (e: string | number | undefined) => user && setUser({...user, name: String(e)})},
        {name: "Введите возраст", value: user?.age, onchange: (e: string | number | undefined) => user && setUser({...user, age: Number(e)})},
        {name: "select", value: undefined, onchange: (e: string | number | undefined) => user && setUser({...user, gender: Gender[e as keyof typeof Gender]})},
        {name: "textarea", value: user?.description, onchange: (e: string | number | undefined) => user && setUser({...user, description: String(e)})}
    ]
    return(
        <>
            {user && <FillUserData user={user} set_fields={fields}/>}
        </>
    )
}