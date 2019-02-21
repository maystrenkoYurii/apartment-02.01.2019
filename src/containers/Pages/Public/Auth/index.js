import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Auth from '../../../../components/Pages/Public/Auth/index';

const mapStateToProps = state => {
  return {
    positionTab: state.ui.authPositionTab,
  };
};

@compose(connect(mapStateToProps))
class AuthContainer extends Component {
  static propTypes = {
    positionTab: PropTypes.number,
  };

  render() {
    const { positionTab } = this.props;

    return <Auth positionTab={positionTab} />;
  }
}

export default AuthContainer;
