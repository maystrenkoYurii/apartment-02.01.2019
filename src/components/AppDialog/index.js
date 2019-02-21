import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

@compose(withMobileDialog({ breakpoint: 'sm' }))
class AppDialog extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
    TransitionComponent: PropTypes.func,
  };

  renderTransition = props => {
    return <Slide direction="up" {...props} />;
  };

  render() {
    const { children, TransitionComponent } = this.props;

    return (
      <Dialog
        TransitionComponent={
          TransitionComponent ? TransitionComponent : this.renderTransition
        }
        {...this.props}
      >
        {children}
      </Dialog>
    );
  }
}

export default AppDialog;
