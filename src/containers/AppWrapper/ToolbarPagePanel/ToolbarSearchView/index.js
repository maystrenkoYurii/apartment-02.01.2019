import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uiActions } from '../../../../flux-saga/bus/ui/actions';

import ToolbarSearchView from '../../../../components/AppWrapper/ToolbarPagePanel/SearchView/index';

const mapStateToProps = state => {
  return {
    searchText: state.ui.toolbarSearchText,
    isToolbarSearchOpenFilter: state.ui.isToolbarSearchOpenFilter,
  };
};

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

@compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)
class ToolbarSearchViewContainer extends Component {
  static propTypes = {
    actions: PropTypes.object,
    searchFilter: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    searchText: PropTypes.string,
    isToolbarSearchOpenFilter: PropTypes.bool,
  };

  handleChangeSearchText = text => {
    const { actions } = this.props;
    actions.setToolbarSearchTextState(text);
  };

  handleChangeSearchOpenFilter = state => {
    const { actions } = this.props;
    actions.setToolbarSearchFilterState(state);
  };

  render() {
    const { searchText, searchFilter, isToolbarSearchOpenFilter } = this.props;

    return (
      <ToolbarSearchView
        searchText={searchText}
        isToolbarSearchOpenFilter={isToolbarSearchOpenFilter}
        searchFilter={searchFilter}
        onChangeSearchText={this.handleChangeSearchText}
        onChangeSearchOpenFilter={this.handleChangeSearchOpenFilter}
      />
    );
  }
}

export default ToolbarSearchViewContainer;
