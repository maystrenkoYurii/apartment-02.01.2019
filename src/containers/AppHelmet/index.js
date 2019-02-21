import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import AppHelmet from '../../components/AppHelmet';

const mapStateToProps = state => {
  return {
    location: state.router.location,
    language: state.settings.language.language,
    domainUrl: state.ui.domainUrl,
  };
};

@compose(connect(mapStateToProps))
class AppHelmetContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    language: PropTypes.string,
    domainUrl: PropTypes.string,
  };

  render() {
    const { location, language, domainUrl } = this.props;

    return (
      <AppHelmet
        location={location}
        language={language}
        domainUrl={domainUrl}
      />
    );
  }
}

export default AppHelmetContainer;
