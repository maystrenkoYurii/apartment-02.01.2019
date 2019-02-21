import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FilterListIcon from '@material-ui/icons/FilterList';

const messages = defineMessages({
  search: {
    id: 'app.toolbar.search',
    defaultMessage: 'Пошук',
  },
});

const styles = theme => ({
  openedPanel: {
    position: 'absolute',
    zIndex: 2000,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.common.white,
  },
  closedPanel: {
    display: 'none',
  },
  searchPanelContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftPanel: {
    paddingLeft: theme.spacing.unit,
    display: 'inline-flex',
    flex: 100,
    minWidth: '1%',
  },
  rightPanel: {
    paddingRight: theme.spacing.unit,
    display: 'inline-flex',
    flex: 1,
  },
  input: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    width: '100%',
  },
  clearIconVisible: {
    visibility: 'visible',
  },
  clearIconHidden: {
    visibility: 'hidden',
  },
});

@compose(
  withStyles(styles),
  curryRight(injectIntl),
)
class SearchViewPanelMobile extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      isOpenPanel: false,
      isOpenedPanel: false,
    };
  }

  componentDidUpdate() {
    const { isOpenPanel } = this.state;

    if (this.inputSearchToolbarMobile && isOpenPanel) {
      this.inputSearchToolbarMobile.focus();
    }
  }

  handleOnChangeOpenPanel = state => {
    this.setState({ isOpenPanel: state });
  };

  handleOnChange = event => {
    const { onChangeSearchText } = this.props;
    onChangeSearchText(event.target.value);
  };

  handleClearSearch = () => {
    const { onChangeSearchText, searchText } = this.props;
    if (searchText.length > 0) {
      onChangeSearchText('');
      this.inputSearchToolbarMobile.focus();
    }
  };

  handleCloseKeyDown = event => {
    if (event.keyCode === 27) {
      this.handleOnChangeOpenPanel(false);
    }
  };

  handleEnterAnimation = element => {
    TweenMax.fromTo(
      element,
      0.3,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: () => {
          this.setState(() => ({
            isOpenedPanel: true,
          }));
        },
      },
    );
  };

  handleExitAnimation = element => {
    TweenMax.fromTo(
      element,
      0.3,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: () => {
          this.setState(() => ({
            isOpenedPanel: false,
          }));
        },
      },
    );
  };

  render() {
    const { formatMessage } = this.props.intl;
    const {
      classes,
      searchText,
      popoverSearchFilter,
      onClickOpenFilter,
    } = this.props;
    const { isOpenPanel, isOpenedPanel } = this.state;

    return (
      <Fragment>
        <IconButton
          color="inherit"
          onClick={() => this.handleOnChangeOpenPanel(true)}
        >
          <SearchIcon />
        </IconButton>
        <Transition
          appear
          in={isOpenPanel}
          timeout={300}
          onEnter={this.handleEnterAnimation}
          onExit={this.handleExitAnimation}
        >
          <div
            className={
              isOpenPanel || isOpenedPanel
                ? classes.openedPanel
                : classes.closedPanel
            }
          >
            <div className={classes.searchPanelContent}>
              <div className={classes.leftPanel}>
                <IconButton onClick={() => this.handleOnChangeOpenPanel(false)}>
                  <ArrowBackIcon />
                </IconButton>
                <InputBase
                  placeholder={formatMessage(messages.search)}
                  value={searchText}
                  onChange={this.handleOnChange}
                  onKeyDown={this.handleCloseKeyDown}
                  inputRef={ref => {
                    this.inputSearchToolbarMobile = ref;
                  }}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <div className={classes.rightPanel}>
                <IconButton
                  className={
                    searchText.length > 0
                      ? classes.clearIconVisible
                      : classes.clearIconHidden
                  }
                  onClick={this.handleClearSearch}
                >
                  <ClearIcon />
                </IconButton>
                {popoverSearchFilter && (
                  <IconButton onClick={onClickOpenFilter}>
                    <FilterListIcon />
                  </IconButton>
                )}
              </div>
            </div>
            {popoverSearchFilter}
          </div>
        </Transition>
      </Fragment>
    );
  }
}

export default SearchViewPanelMobile;
