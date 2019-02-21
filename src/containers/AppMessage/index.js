import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';

import AppMessage from '../../components/AppMessage';

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
    appMessage: state.ui.appMessage,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class AppMessageContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    appMessage: PropTypes.object,
    autoHideDuration: PropTypes.number,
  };

  render() {
    return <AppMessage {...this.props} />;
  }
}

export default AppMessageContainer;
