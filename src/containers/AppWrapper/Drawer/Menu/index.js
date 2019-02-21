import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Menu from '../../../../components/AppWrapper/Drawer/Menu/index';

const mapStateToProps = state => {
  return {
    location: state.router.location,
  };
};

@compose(connect(mapStateToProps))
class MenuContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
  };

  render() {
    const { location } = this.props;

    return <Menu location={location} />;
  }
}

export default MenuContainer;
