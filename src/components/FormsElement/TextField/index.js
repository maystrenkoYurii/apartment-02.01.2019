import React from 'react';
import PropTypes from 'prop-types';

import TextFieldMaterial from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Control } from 'react-redux-form';

export const TextFieldController = props => (
  <Control.text
    {...props}
    mapProps={{
      touched: input => input.fieldValue.touched,
      valid: input => input.fieldValue.valid,
    }}
  />
);

export const CustomTextField = ({
  label,
  helperText,
  touched,
  valid,
  endAdornment,
  ...custom
}) => {
  return (
    <TextFieldMaterial
      {...custom}
      label={label}
      helperText={touched && !valid ? helperText : ''}
      error={touched && !valid}
      InputProps={{
        endAdornment: endAdornment ? (
          <InputAdornment style={{ margin: 0 }} position="end">
            {endAdornment}
          </InputAdornment>
        ) : (
          <div />
        ),
      }}
    />
  );
};

CustomTextField.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  touched: PropTypes.bool,
  valid: PropTypes.bool,
  endAdornment: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

CustomTextField.defaultProps = {
  label: '',
  helperText: '',
  touched: false,
  valid: false,
  endAdornment: null,
};
