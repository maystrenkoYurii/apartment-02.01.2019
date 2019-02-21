import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserActionPanel from '../../../../../components/AppWrapper/Drawer/Header/UserAction/index';

import { uiActions } from '../../../../../flux-saga/bus/ui/actions';
import { userActionsAsync } from '../../../../../flux-saga/bus/user/saga/asyncActions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...uiActions,
        ...userActionsAsync,
      },
      dispatch,
    ),
  };
};

const mapStateToProps = state => {
  return {
    authUser: state.user,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class UserActionContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    authUser: PropTypes.object,
  };

  render() {
    const { actions, authUser } = this.props;

    return <UserActionPanel actions={actions} authUser={authUser} />;
  }
}

export default UserActionContainer;
