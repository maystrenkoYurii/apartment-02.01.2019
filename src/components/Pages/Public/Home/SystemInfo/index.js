import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit,
  },
});

@compose(withStyles(styles))
class SystemInfoContainer extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Divider />
      </div>
    );
  }
}

export default SystemInfoContainer;
