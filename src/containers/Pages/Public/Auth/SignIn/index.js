import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignIn from '../../../../../components/Pages/Public/Auth/SignIn/index';

import { uiActions } from '../../../../../flux-saga/bus/ui/actions';
import { userActionsAsync } from '../../../../../flux-saga/bus/user/saga/asyncActions';

import { isValidEmail } from '../../../../../core/functions/form';

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
    formData: state.forms.signInForm,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class SignInContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    formData: PropTypes.object,
  };

  submitForm = (dataForm, messages) => {
    const { actions } = this.props;
    actions.setFetchSignInUserAsync({
      loginNameOrEmail: dataForm.userNameOrEmail,
      password: dataForm.userPassword,
      remember: dataForm.remember,
      isEmail: isValidEmail(dataForm.userNameOrEmail),
      messages: messages,
    });
  };

  render() {
    const { formData } = this.props;

    return <SignIn formData={formData} submitForm={this.submitForm} />;
  }
}

export default SignInContainer;
