import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import AppDownload from '../../components/AppDownload';

const mapStateToProps = state => {
  return {
    fetching: state.ui.fetching,
  };
};

@compose(connect(mapStateToProps))
class AppDownloadContainer extends Component {
  static propTypes = {
    fetching: PropTypes.object,
  };

  render() {
    return <AppDownload {...this.props} />;
  }
}

export default AppDownloadContainer;
