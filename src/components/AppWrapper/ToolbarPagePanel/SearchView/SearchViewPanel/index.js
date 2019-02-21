import PropTypes from 'prop-types';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';

const messages = defineMessages({
  search: {
    id: 'app.toolbar.search',
    defaultMessage: 'Пошук',
  },
});

const styles = theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing.unit,
    },
  },
  searchIcon: {
    width: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIconVisible: {
    visibility: 'visible',
  },
  clearIconHidden: {
    visibility: 'hidden',
  },
  inputContent: {
    width: 180,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  leftPanel: {
    display: 'inline-flex',
    width: '100%',
  },
  rightPanel: {
    display: 'inline-flex',
    flex: 1,
  },
});

@compose(
  withStyles(styles),
  curryRight(injectIntl),
)
class ToolbarSearchView extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
    popoverSearchFilter: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    onChangeSearchText: PropTypes.func.isRequired,
    onClickOpenFilter: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
  };

  handleOnChange = event => {
    const { onChangeSearchText } = this.props;
    onChangeSearchText(event.target.value);
  };

  handleClearSearch = () => {
    const { onChangeSearchText, searchText } = this.props;
    if (searchText.length > 0) {
      onChangeSearchText('');
      this.inputSearchToolbar.focus();
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const {
      classes,
      searchText,
      popoverSearchFilter,
      onClickOpenFilter,
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.leftPanel}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div className={classes.inputContent}>
            <InputBase
              placeholder={formatMessage(messages.search)}
              value={searchText}
              onChange={this.handleOnChange}
              inputRef={ref => {
                this.inputSearchToolbar = ref;
              }}
              classes={{
                root: classes.inputRoot,
              }}
            />
          </div>
        </div>
        <div className={classes.rightPanel}>
          <IconButton
            className={
              searchText.length > 0
                ? classes.clearIconVisible
                : classes.clearIconHidden
            }
            color="inherit"
            onClick={this.handleClearSearch}
          >
            <ClearIcon />
          </IconButton>
          {popoverSearchFilter && (
            <IconButton color="inherit" onClick={onClickOpenFilter}>
              <FilterListIcon />
            </IconButton>
          )}
        </div>
        {popoverSearchFilter}
      </div>
    );
  }
}

export default ToolbarSearchView;
