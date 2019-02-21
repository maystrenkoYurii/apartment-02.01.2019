import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Tabs from '../../../../../containers/Pages/Public/Auth/Tabs';
import SvgLogoApartment from '../../../../SvgImage/LogoApartment';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
  },
  contentContainer: {
    margin: 'auto',
    flex: 1,
    maxWidth: 470,
    minWidth: 1,
  },
  content: {
    padding: theme.spacing.unit,
  },
  containerBackground: {
    paddingLeft: theme.spacing.unit * 3.5,
    paddingRight: theme.spacing.unit * 3.5,
    paddingBottom: theme.spacing.unit * 4.5,
    background: `linear-gradient(to top, ${
      theme.palette.primary.main
    } 50%, transparent 0%)`,
  },
  paper: {
    padding: theme.spacing.unit * 2.5,
    display: 'flex',
    flexDirection: 'column',
  },
  logoContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    fill: theme.palette.primary.main,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

@compose(withStyles(styles))
class Wrapper extends Component {
  static propTypes = {
    classes: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      tabName: '',
    };
  }

  handleTabName = tabName => {
    this.setState({ tabName: tabName });
  };

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <div className={classes.containerBackground}>
              <Paper className={classes.paper} elevation={10}>
                <div className={classes.logoContent}>
                  <SvgLogoApartment className={classes.logo} />
                </div>
                {children}
                <Tabs />
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Wrapper;
