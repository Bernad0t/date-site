import Loader from "../UI/Loader/loader"


interface Props{
    loading: boolean
    children: JSX.Element
}

export default function LoadingComponent({loading, children}: Props){
    return (
        loading ? <div style={{width: "100%", display: "flex", justifyContent: "center"}}><Loader/></div> : children
    )
}