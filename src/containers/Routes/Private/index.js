import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Private from '../../../components/Routes/Private';

const mapStateToProps = state => {
  return {
    authUser: state.user,
  };
};

@compose(
  withRouter,
  connect(mapStateToProps),
)
class PrivateContainer extends Component {
  static propTypes = {
    authUser: PropTypes.object,
  };

  render() {
    const { authUser } = this.props;

    return <Private authUser={authUser} />;
  }
}

export default PrivateContainer;
