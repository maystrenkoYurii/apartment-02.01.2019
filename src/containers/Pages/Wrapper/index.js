import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../../../components/Pages/Wrapper';

class WrapperContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    fullWidth: PropTypes.bool,
    centered: PropTypes.bool,
    padding: PropTypes.bool,
    cleared: PropTypes.bool,
  };

  render() {
    const { children, fullWidth, centered, padding, cleared } = this.props;

    return (
      <Wrapper
        fullWidth={fullWidth}
        centered={centered}
        padding={padding}
        cleared={cleared}
      >
        {children}
      </Wrapper>
    );
  }
}

export default WrapperContainer;
