import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Public from '../../containers/Routes/Public';
import Private from '../../containers/Routes/Private';

import { isAuthenticatedInterface } from '../../core/functions';

class Routes extends Component {
  static propTypes = {
    authUser: PropTypes.object.isRequired,
  };

  render() {
    const { authUser } = this.props;

    return isAuthenticatedInterface(authUser) ? <Private /> : <Public />;
  }
}

export default Routes;
