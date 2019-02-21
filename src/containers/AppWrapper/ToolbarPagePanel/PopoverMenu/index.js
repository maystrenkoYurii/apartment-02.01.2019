import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PopoverMenu from '../../../../components/AppWrapper/ToolbarPagePanel/PopoverMenu/index';

import { uiActions } from '../../../../flux-saga/bus/ui/actions';
import { uiActionsAsync } from '../../../../flux-saga/bus/ui/saga/asyncActions';
import { userActionsAsync } from '../../../../flux-saga/bus/user/saga/asyncActions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...uiActions,
        ...uiActionsAsync,
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
class PopoverMenuContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    authUser: PropTypes.object,
  };

  render() {
    const { actions, authUser } = this.props;

    return <PopoverMenu actions={actions} authUser={authUser} />;
  }
}

export default PopoverMenuContainer;
