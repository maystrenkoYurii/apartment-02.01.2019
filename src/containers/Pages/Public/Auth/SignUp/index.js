import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as actionsForm } from 'react-redux-form';

import SignUp from '../../../../../components/Pages/Public/Auth/SignUp/index';

import { uiActions } from '../../../../../flux-saga/bus/ui/actions';
import { userActionsAsync } from '../../../../../flux-saga/bus/user/saga/asyncActions';

import { isValidConfirmPassword } from '../../../../../core/functions/index';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...actionsForm,
        ...uiActions,
        ...userActionsAsync,
      },
      dispatch,
    ),
  };
};

const mapStateToProps = state => {
  return {
    formData: state.forms.signUpForm,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class LoginContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    formData: PropTypes.object,
  };

  submitForm = (dataForm, messages) => {
    const { actions } = this.props;
    const userData = {
      username: dataForm.userName,
      email: dataForm.userEmail,
      password: dataForm.userPassword,
      messages: messages,
    };

    actions.setFetchSignUpUserAsync(userData);
  };

  validateConfirmPassword = password => {
    const { actions, formData } = this.props;

    actions.setValidity('forms.signUpForm.userConfirmPassword', {
      valid: isValidConfirmPassword(password, formData.userConfirmPassword),
    });
  };

  handleTermsOfUse = () => {
    const { actions } = this.props;

    actions.setTermsOfUseDialogState(true);
  };

  handlePrivacyPolicy = () => {
    const { actions } = this.props;

    actions.setPrivacyPolicyDialogState(true);
  };

  render() {
    const { formData } = this.props;

    return (
      <SignUp
        formData={formData}
        submitForm={this.submitForm}
        onClickTermsOfUse={this.handleTermsOfUse}
        onClickPrivacyPolicy={this.handlePrivacyPolicy}
        validateConfirmPassword={this.validateConfirmPassword}
      />
    );
  }
}

export default LoginContainer;
