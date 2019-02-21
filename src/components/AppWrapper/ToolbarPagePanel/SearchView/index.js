import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';

import SearchViewPanel from './SearchViewPanel/index';
import SearchViewPanelMobile from './SearchViewPanelMobile/index';

class ToolbarSearchView extends Component {
  static propTypes = {
    searchFilter: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    searchText: PropTypes.string.isRequired,
    onChangeSearchText: PropTypes.func.isRequired,
    onChangeSearchOpenFilter: PropTypes.func.isRequired,
    isToolbarSearchOpenFilter: PropTypes.bool.isRequired,
  };

  constructor() {
    super(...arguments);
    this.state = {
      anchorEl: null,
    };
  }

  handleClickOpenFilter = event => {
    const { onChangeSearchOpenFilter } = this.props;
    this.setState({ anchorEl: event.currentTarget });
    onChangeSearchOpenFilter(true);
  };

  render() {
    const {
      onChangeSearchText,
      onChangeSearchOpenFilter,
      searchFilter,
      searchText,
      isToolbarSearchOpenFilter,
    } = this.props;

    const { anchorEl } = this.state;

    const popoverSearchFilter = searchFilter && (
      <Popover
        open={isToolbarSearchOpenFilter}
        anchorEl={anchorEl}
        onClose={() => onChangeSearchOpenFilter(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {searchFilter}
      </Popover>
    );

    return (
      <Fragment>
        <Hidden smDown implementation="css">
          <SearchViewPanel
            searchText={searchText}
            popoverSearchFilter={popoverSearchFilter}
            onChangeSearchText={onChangeSearchText}
            onClickOpenFilter={this.handleClickOpenFilter}
          />
        </Hidden>
        <Hidden mdUp implementation="css">
          <SearchViewPanelMobile
            searchText={searchText}
            popoverSearchFilter={popoverSearchFilter}
            onChangeSearchText={onChangeSearchText}
            onClickOpenFilter={this.handleClickOpenFilter}
          />
        </Hidden>
      </Fragment>
    );
  }
}

export default ToolbarSearchView;
