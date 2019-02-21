import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    marginRight: theme.spacing.unit * 2,
  },
});

@compose(withStyles(styles))
class Loading extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
}

export default Loading;
