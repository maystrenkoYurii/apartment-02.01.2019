import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppDialog from '../../components/AppDialog';

class AppDialogContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
  };

  render() {
    const { children } = this.props;

    return <AppDialog {...this.props}>{children}</AppDialog>;
  }
}

export default AppDialogContainer;
