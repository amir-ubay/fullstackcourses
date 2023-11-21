export const Success = ({message}) => {

    return (
        <div id="notification" className="success">
            <p>{message}</p>
        </div>
    )
}

export const Error = ({message}) => {

    return (
        <div id="notification" className="error">
            <p>{message}</p>
        </div>
    )
}