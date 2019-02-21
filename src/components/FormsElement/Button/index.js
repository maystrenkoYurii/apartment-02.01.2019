import React from 'react';
import PropTypes from 'prop-types';

import ButtonMaterial from '@material-ui/core/Button';

import { Control } from 'react-redux-form';

export const ButtonController = props => (
  <Control.button
    {...props}
    disabled={form => {
      return form.pristine ? true : !form.valid;
    }}
  />
);

export const CustomButton = ({ children, ...custom }) => {
  return <ButtonMaterial {...custom}>{children}</ButtonMaterial>;
};

CustomButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};
