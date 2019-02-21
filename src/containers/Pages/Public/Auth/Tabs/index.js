import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tabs from '../../../../../components/Pages/Public/Auth/Tabs';

import { uiActions } from '../../../../../flux-saga/bus/ui/actions';

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
    positionTab: state.ui.authPositionTab,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class TabsContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    positionTab: PropTypes.number,
  };

  handleChangePositionTab = position => {
    const { actions } = this.props;
    actions.setAuthPositionTabState(position);
  };

  render() {
    const { positionTab } = this.props;

    return (
      <Tabs
        positionTab={positionTab}
        onChangePositionTab={this.handleChangePositionTab}
      />
    );
  }
}

export default TabsContainer;
