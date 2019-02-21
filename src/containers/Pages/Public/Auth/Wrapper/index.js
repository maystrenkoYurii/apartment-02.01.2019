import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../../../../../components/Pages/Public/Auth/Wrapper/index';

class WrapperContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
  };

  render() {
    const { children } = this.props;

    return <Wrapper>{children}</Wrapper>;
  }
}

export default WrapperContainer;
