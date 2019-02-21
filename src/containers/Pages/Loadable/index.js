import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loadable from '../../../components/Pages/Loadable';

class LoadableContainer extends Component {
  static propTypes = {
    dynamicImport: PropTypes.object.isRequired,
    loadingComponent: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    errorComponent: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    minDelayLoading: PropTypes.number,
  };

  render() {
    const {
      dynamicImport,
      loadingComponent,
      errorComponent,
      minDelayLoading,
    } = this.props;

    return (
      <Loadable
        dynamicImport={dynamicImport}
        loadingComponent={loadingComponent}
        errorComponent={errorComponent}
        minDelayLoading={minDelayLoading}
      />
    );
  }
}

export default LoadableContainer;
