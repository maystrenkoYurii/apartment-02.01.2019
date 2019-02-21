import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { curryRight } from 'lodash';
import { bindActionCreators } from 'redux';

import Recovery from '../../../../../components/Pages/Public/Auth/Recovery/index';

import { uiActions } from '../../../../../flux-saga/bus/ui/actions';

const messages = defineMessages({
  success: {
    id: 'app.auth.recovery.success',
    defaultMessage: 'Ваш логін та пароль відправлено вам на поштову адресу',
  },
});

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
    formData: state.forms.recoveryForm,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  curryRight(injectIntl),
)
class RecoveryContainer extends Component {
  static propTypes = {
    intl: intlShape,
    actions: PropTypes.object,
    formData: PropTypes.object,
  };

  submitForm = () => {
    const { actions } = this.props;
    const { formatMessage } = this.props.intl;

    actions.setAppMessageState(formatMessage(messages.success), 'Recovery');
  };

  render() {
    const { formData } = this.props;

    return <Recovery formData={formData} submitForm={this.submitForm} />;
  }
}

export default RecoveryContainer;
