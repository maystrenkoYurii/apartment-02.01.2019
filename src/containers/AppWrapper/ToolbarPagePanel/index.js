import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import ToolbarPagePanel from '../../../components/AppWrapper/ToolbarPagePanel';

const mapStateToProps = state => {
  return {
    location: state.router.location,
  };
};

@compose(connect(mapStateToProps))
class ToolbarPagePanelContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
  };

  render() {
    const { location } = this.props;

    return <ToolbarPagePanel location={location} />;
  }
}

export default ToolbarPagePanelContainer;
