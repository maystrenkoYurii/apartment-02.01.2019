import PropTypes from 'prop-types';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import App from '../../components/App';

import { userActionsAsync } from '../../flux-saga/bus/user/saga/asyncActions';

import { withFetchErrorMessages } from '../../components/AppWrapper/HOK/withFetchErrorMessages';

import { isClient } from '../../core/functions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...userActionsAsync,
      },
      dispatch,
    ),
  };
};

const mapStateToProps = () => {
  return {};
};

@compose(
  withRouter,
  withFetchErrorMessages,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class AppContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    fetchErrorMessages: PropTypes.object,
  };

  componentDidMount() {
    const { actions, fetchErrorMessages } = this.props;

    if (isClient()) {
      actions.setFetchSignInUserByTokenAsync({ messages: fetchErrorMessages });
    }
  }

  render() {
    return <App />;
  }
}

export default AppContainer;
