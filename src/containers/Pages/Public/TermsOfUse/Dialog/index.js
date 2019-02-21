import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DialogTermsOfUse from '../../../../../components/Pages/Public/TermsOfUse/Dialog/index';

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
    isOpenTermsOfUse: state.ui.isOpenTermsOfUse,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class DialogTermsOfUseContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    isOpenTermsOfUse: PropTypes.bool,
  };

  handleClose = () => {
    const { actions } = this.props;

    actions.setTermsOfUseDialogState(false);
  };

  render() {
    return <DialogTermsOfUse {...this.props} onClickClose={this.handleClose} />;
  }
}

export default DialogTermsOfUseContainer;
