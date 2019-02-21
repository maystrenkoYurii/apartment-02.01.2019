import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Control } from 'react-redux-form';

export const CheckBoxController = props => (
  <Control.checkbox
    {...props}
    mapProps={{
      valid: checkBox => {
        return checkBox.fieldValue.valid;
      },
    }}
  />
);

export const CustomCheckBox = ({ valid, className, ...custom }) => {
  return (
    <FormControlLabel
      {...custom}
      className={className}
      disabled={!valid}
      control={<Checkbox {...custom} />}
    />
  );
};

CustomCheckBox.propTypes = {
  valid: PropTypes.bool,
};

CustomCheckBox.defaultProps = {
  valid: false,
};
