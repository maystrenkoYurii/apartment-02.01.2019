import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DialogPrivacyPolicy from '../../../../../components/Pages/Public/PrivacyPolicy/Dialog/index';

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
    isOpenPrivacyPolicy: state.ui.isOpenPrivacyPolicy,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class DialogPrivacyPolicyContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    isOpenPrivacyPolicy: PropTypes.bool,
  };

  handleClose = () => {
    const { actions } = this.props;

    actions.setPrivacyPolicyDialogState(false);
  };

  render() {
    return (
      <DialogPrivacyPolicy {...this.props} onClickClose={this.handleClose} />
    );
  }
}

export default DialogPrivacyPolicyContainer;
