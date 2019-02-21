import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppLanguageDialog from '../../components/AppLanguage/index';

import { uiActions } from '../../flux-saga/bus/ui/actions';
import { settingsActionsAsync } from '../../flux-saga/bus/settings/saga/asyncActions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...uiActions,
        ...settingsActionsAsync,
      },
      dispatch,
    ),
  };
};

const mapStateToProps = state => {
  return {
    isOpenLanguage: state.ui.isOpenLanguage,
    language: state.settings.language.language,
  };
};

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class AppLanguageContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    isOpenLanguage: PropTypes.bool,
    language: PropTypes.string,
  };

  handleClose = () => {
    const { actions } = this.props;

    actions.setLanguageDialogState(false);
  };

  handleOk = key => {
    const { actions } = this.props;

    actions.setLanguageStateAsync(key);
    actions.setLanguageDialogState(false);
  };

  render() {
    const { isOpenLanguage, language } = this.props;

    return (
      <AppLanguageDialog
        isOpenLanguage={isOpenLanguage}
        onClickClose={this.handleClose}
        onClickOk={this.handleOk}
        language={language}
      />
    );
  }
}

export default AppLanguageContainer;
