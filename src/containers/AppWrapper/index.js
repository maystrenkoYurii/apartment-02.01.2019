import PropTypes from 'prop-types';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppWrapper from '../../components/AppWrapper';

import { uiActions } from '../../flux-saga/bus/ui/actions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...uiActions,
      },
      dispatch,
    ),
  };
};

const mapStateToProps = state => {
  return {
    location: state.router.location,
    authUser: state.user,
    isOpenDrawer: state.ui.isOpenDrawer,
    isOpenDrawerMobile: state.ui.isOpenDrawerMobile,
    isDrawerWithTransition: state.ui.isDrawerWithTransition,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class AppWrapperContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    location: PropTypes.object,
    authUser: PropTypes.object,
    isOpenDrawer: PropTypes.bool,
    isOpenDrawerMobile: PropTypes.bool,
    isDrawerWithTransition: PropTypes.bool,
  };

  handleDrawerMobileClose = () => {
    const { actions } = this.props;
    actions.setOpenDrawerMobileState(false);
  };

  render() {
    const {
      children,
      location,
      authUser,
      isOpenDrawer,
      isOpenDrawerMobile,
    } = this.props;

    return (
      <AppWrapper
        location={location}
        authUser={authUser}
        isOpenDrawer={isOpenDrawer}
        isOpenDrawerMobile={isOpenDrawerMobile}
        onCloseDrawerMobile={this.handleDrawerMobileClose}
      >
        {children}
      </AppWrapper>
    );
  }
}

export default AppWrapperContainer;
