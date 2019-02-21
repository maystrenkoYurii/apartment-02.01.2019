import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  default: {
    margin: '0 auto',
    width: '100%',
  },
  centered: {
    margin: 'auto',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  padding: {
    padding: theme.spacing.unit,
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
    ]),
    fullWidth: PropTypes.bool,
    centered: PropTypes.bool,
    padding: PropTypes.bool,
    cleared: PropTypes.bool,
  };

  static defaultProps = {
    fullWidth: false,
    centered: false,
    padding: true,
    cleared: false,
  };

  render() {
    const {
      classes,
      children,
      fullWidth,
      centered,
      padding,
      cleared,
    } = this.props;

    return (
      <div className={classes.root}>
        {cleared ? (
          children
        ) : (
          <Grid
            item
            xl={fullWidth ? 12 : 8}
            lg={fullWidth ? 12 : 9}
            md={fullWidth ? 12 : 11}
            sm={fullWidth ? 12 : 12}
            xs={fullWidth ? 12 : 12}
            className={centered ? classes.centered : classes.default}
          >
            <div
              className={classNames(classes.content, {
                [classes.padding]: padding,
              })}
            >
              {children}
            </div>
          </Grid>
        )}
      </div>
    );
  }
}

export default Wrapper;
