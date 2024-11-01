export default function ErrorMessage({message}: {message: string}){
    return(
        <div style={{color: "red"}}>
            {message}
        </div>
    )
}