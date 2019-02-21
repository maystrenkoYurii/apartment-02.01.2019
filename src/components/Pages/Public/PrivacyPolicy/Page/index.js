import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Wrapper from '../../../../../containers/Pages/Wrapper';
import Content from '../../../../../containers/Pages/Public/TermsOfUse/Content/index';

const styles = theme => ({
  paper: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.unit * 2,
  },
});

@compose(withStyles(styles))
class PrivacyPolicy extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes } = this.props;

    return (
      <Wrapper>
        <Paper elevation={5} className={classes.paper}>
          <div className={classes.content}>
            <Content />
          </div>
        </Paper>
      </Wrapper>
    );
  }
}

export default PrivacyPolicy;
