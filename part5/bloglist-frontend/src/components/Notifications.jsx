import PropTypes from 'prop-types';

export const Success = ({message}) => {
    return (
        <div id="notification" className="success">
            <p>{message}</p>
        </div>
    )
}

Success.propTypes = {
    message: PropTypes.string.isRequired
}


export const Error = ({message}) => {
    return (
        <div id="notification" className="error">
            <p>{message}</p>
        </div>
    )
}

Error.propTypes = {
    message: PropTypes.string.isRequired
}