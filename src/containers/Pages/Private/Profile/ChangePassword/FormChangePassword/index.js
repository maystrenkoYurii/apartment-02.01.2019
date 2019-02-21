import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as actionsForm } from 'react-redux-form';

import FormChangePassword from '../../../../../../components/Pages/Private/Profile/ChangePassword/FormChangePassword/index';

import {
  isValidConfirmPassword,
  isValidNewPassword,
} from '../../../../../../core/functions/index';

import { uiActions } from '../../../../../../flux-saga/bus/ui/actions';
import { userActionsAsync } from '../../../../../../flux-saga/bus/user/saga/asyncActions';

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
    formData: state.forms.changePasswordForm,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class FormChangePasswordContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    formData: PropTypes.object,
    isDialog: PropTypes.bool.isRequired,
  };

  validateNewPassword = oldPassword => {
    const { actions, formData } = this.props;
    actions.setValidity('forms.changePasswordForm.userNewPassword', {
      valid: isValidNewPassword(oldPassword, formData.userNewPassword),
    });
  };

  validateConfirmPassword = password => {
    const { actions, formData } = this.props;
    actions.setValidity('forms.changePasswordForm.userConfirmNewPassword', {
      valid: isValidConfirmPassword(password, formData.userConfirmNewPassword),
    });
  };

  submitForm = (dataForm, messages) => {
    const { actions, isDialog } = this.props;
    const { userOldPassword, userNewPassword } = dataForm;
    actions.setFetchUserChangePasswordAsync({
      oldPassword: userOldPassword,
      newPassword: userNewPassword,
      messages: messages,
      isDialog: isDialog,
    });
  };

  render() {
    const { formData } = this.props;

    return (
      <FormChangePassword
        formData={formData}
        validateNewPassword={this.validateNewPassword}
        validateConfirmPassword={this.validateConfirmPassword}
        submitForm={this.submitForm}
      />
    );
  }
}

export default FormChangePasswordContainer;
