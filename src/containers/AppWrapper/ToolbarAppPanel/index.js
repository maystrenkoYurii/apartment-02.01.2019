import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goBack } from 'connected-react-router';

import ToolbarAppPanel from '../../../components/AppWrapper/ToolbarAppPanel';

import { uiActions } from '../../../flux-saga/bus/ui/actions';
import { uiActionsAsync } from '../../../flux-saga/bus/ui/saga/asyncActions';

import { constants } from '../../../core/constants/index';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...uiActions,
        ...uiActionsAsync,
        goBack,
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
    lastActionRouter: state.router.action,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class ToolbarAppPanelContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    actions: PropTypes.object,
    authUser: PropTypes.object,
    isOpenDrawer: PropTypes.bool,
    lastActionRouter: PropTypes.string,
  };

  handleOpenDrawer = () => {
    const { actions } = this.props;
    actions.setOpenDrawerState(true);
  };

  handleOpenDrawerMobile = () => {
    const { actions } = this.props;
    actions.setOpenDrawerMobileState(true);
  };

  handleCloseDrawer = () => {
    const { actions } = this.props;
    actions.setOpenDrawerState(false);
  };

  handleClickBack = () => {
    const { actions, lastActionRouter } = this.props;
    if (lastActionRouter === 'POP') {
      actions.setRouterToLinkAsync(constants.PATCH_URL_HOME);
    } else {
      actions.goBack();
    }
    setTimeout(() => {
      actions.setAuthPositionTabState(0);
    }, 500);
  };

  handleClickLogo = () => {
    const { actions } = this.props;
    actions.setRouterToLinkAsync(constants.PATCH_URL_HOME);
  };

  render() {
    const { location, authUser, isOpenDrawer } = this.props;

    return (
      <ToolbarAppPanel
        location={location}
        authUser={authUser}
        isOpenDrawer={isOpenDrawer}
        onOpenDrawer={this.handleOpenDrawer}
        onCloseDrawer={this.handleCloseDrawer}
        onOpenDrawerMobile={this.handleOpenDrawerMobile}
        onClickBack={this.handleClickBack}
        onClickLogo={this.handleClickLogo}
      />
    );
  }
}

export default ToolbarAppPanelContainer;
