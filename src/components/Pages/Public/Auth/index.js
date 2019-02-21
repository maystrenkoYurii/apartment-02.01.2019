import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../../../../containers/Pages/Wrapper';
import SignInTab from '../../../../containers/Pages/Public/Auth/SignIn/index';
import SignUpTab from '../../../../containers/Pages/Public/Auth/SignUp/index';
import RecoveryTab from '../../../../containers/Pages/Public/Auth/Recovery/index';

class Auth extends Component {
  static propTypes = {
    positionTab: PropTypes.number.isRequired,
  };

  render() {
    const { positionTab } = this.props;

    return (
      <Wrapper cleared>
        {positionTab === 0 && <SignInTab />}
        {positionTab === 1 && <SignUpTab />}
        {positionTab === 2 && <RecoveryTab />}
      </Wrapper>
    );
  }
}

export default Auth;
