import React, { Component } from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';

import Loading from '../../../containers/Pages/Loading';
import NotFound from '../../../containers/Pages/NotFound';

class Loadable extends Component {
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

  static defaultProps = {
    loadingComponent: <Loading />,
    errorComponent: <NotFound />,
    minDelayLoading: 500,
  };

  render() {
    const {
      dynamicImport,
      loadingComponent,
      errorComponent,
      minDelayLoading,
    } = this.props;

    const options = {
      loading: loadingComponent,
      error: errorComponent,
      minDelay: minDelayLoading,
    };

    const Component = universal(() => dynamicImport, options);

    return <Component {...this.props} />;
  }
}

export default Loadable;
