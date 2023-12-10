import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Toggleable = ({ children, buttonLabel, visible, toggleVisibility }) => {
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={toggleVisibility}
          id={buttonLabel}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <div className="center">
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={toggleVisibility}
          >
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
};

Toggleable.defaultProps = {
  buttonLabel: 'Toggle',
  visible: false,
};

export default Toggleable;
