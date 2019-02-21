import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as actionsForm } from 'react-redux-form';

import DialogChangePassword from '../../../../../../components/Pages/Private/Profile/ChangePassword/DialogChangePassword/index';

import { uiActions } from '../../../../../../flux-saga/bus/ui/actions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...actionsForm,
        ...uiActions,
      },
      dispatch,
    ),
  };
};

const mapStateToProps = state => {
  return {
    isOpenChangePassword: state.ui.isOpenChangePassword,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class DialogChangePasswordContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    isOpenChangePassword: PropTypes.bool,
  };

  handleClose = () => {
    const { actions } = this.props;
    actions.setChangePasswordDialogState(false);
    actions.reset('forms.changePasswordForm');
  };

  handleChange = () => {
    const { actions } = this.props;
    actions.submit('forms.changePasswordForm');
  };

  render() {
    const { isOpenChangePassword } = this.props;

    return (
      <DialogChangePassword
        isOpenChangePassword={isOpenChangePassword}
        onClickClose={this.handleClose}
        onClickChange={this.handleChange}
      />
    );
  }
}

export default DialogChangePasswordContainer;
