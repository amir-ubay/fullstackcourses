import { useState } from "react"
import PropTypes from 'prop-types'


const Toggleable = ({children, buttonLabel, visible, toggleVisibility}) => {

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility} id={buttonLabel}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>

    )
}

Toggleable.propTypes = {
    buttonLabel : PropTypes.string.isRequired,
    visible : PropTypes.bool.isRequired,
    toggleVisibility : PropTypes.func.isRequired
}

Toggleable.defaultProps = {
    buttonLabel: 'Toggle',
    visible: false
  };


export default Toggleable