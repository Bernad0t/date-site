import { InputHTMLAttributes, useEffect, useState } from "react";
import PanelMain from "../../components/panel_main/panel_main";
import WrapperPages from "../../components/WrapperPages/WrapperPages";
import { Gender, IdPages, UserDataPlaceholders } from "../../sqhemas/enums";
import { UserData } from "../../sqhemas/props/props";
import LoadingComponent from "../../components/LoadingComponent";
import WrapperImage from "../../components/WrapperImage/WrapperImage";
import GetUserData from "../../api/Queries/User/ProcessUserData";
import RefactorButton from "../../UI/Buttons/Refactor/Refactor";
import AddButton from "../../UI/Buttons/AddButton/AddButton";
import BackButton from "../../UI/Buttons/BackButton/BackButton";
import MyInputBase from "../../UI/MyInput/MyInputBase/MyInputBase";
import FillUserDataFormReg, { FillUserData } from "../../components/FillUserDataForm/FillUserDataForm";
import { props_field } from "../../sqhemas/props/fill_data";

export default function Profile(){
    const [user, setUser] = useState<UserData | undefined>()
    const [userCopy, setUserCopy] = useState<UserData | undefined>()
    const [refactorState, setRefactorState] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        GetUserData(null)
        .then((data) => {setUser(data); setUserCopy(data)})
    }, [])

    function handleBack(){
        setUserCopy(user)
        setFile(null)
        setRefactorState(!refactorState)
    }

    return(
        <WrapperPages>
            <>
                <PanelMain id_page={IdPages.profile}/>
                <Wrapper style={{display: refactorState ? "none" : "flex"}}>
                    <PhotoUser user={user}/>
                    <Info user={user}/>
                    <div style={{width: "5%"}}>
                        <RefactorButton onClick={() => setRefactorState(!refactorState)}/>
                    </div>
                </Wrapper>
                <Wrapper style={{display: !refactorState ? "none" : "flex"}}>
                    <ChangePhotoUser user={userCopy} setUser={setUserCopy} file={file} setFile={setFile}/>
                    <ChangeInfo user={userCopy} setUser={setUserCopy}/>
                    <div style={{width: "5%"}}>
                        <BackButton onClick={handleBack}/>
                    </div>
                </Wrapper>
            </>
        </WrapperPages>
    )
}

function Wrapper({children, ...props}: InputHTMLAttributes<HTMLDivElement>){
    return(
        <div style={{ marginTop: "10px", display: props.style?.display, justifyContent: "space-between", width: "100%", height: "100%"}}>
            {children}
        </div>
    )
}

function PlacePhoto({children}: {children: JSX.Element}){
    return(
        <div style={{width: "50%", height: "400px", position: "relative"}}>
            {children}
        </div>
    )
}


function PhotoUser({user}: {user: UserData | undefined}){
    console.log(user?.preview, "prew")
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
        <div style={{width: "40%", height: "90%", overflow: "auto", overflowX: "hidden"}}>
            {children}
        </div>
    )
}

function Info({user}: {user: UserData | undefined}){
    const fields = ["name", "age", "description"]
    return(
        <PlaceInfo>
            <>
                {user && fields.map(field => 
                    <OneField field={field}>
                        <div>
                            {user && user[field as keyof typeof user]}
                        </div>
                    </OneField>
                )}
            </>
        </PlaceInfo>
    )
}

function OneField({field, children}: {field: string, children: JSX.Element}){
    console.log(field, "key")
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
        <PlaceInfo>
            <>
                {user && <FillUserData user={user} set_fields={fields}/>}
            </>
        </PlaceInfo>
    )
}