const Notifications = ({className, message}) => {
    if (message === null) {
        return;
    }

    return (
        <>
            <div className={className}>{message}</div>
        </>
    );
}

export default Notifications