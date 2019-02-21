import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';
import { Helmet } from 'react-helmet';

import { withPageHelper } from '../AppWrapper/HOK/withPageHelper';
import { constants } from '../../core/constants/index';

import '../../assets/mount/styles.global.css';

import iconApartment from '../../assets/images/icon-apartment.svg';

const messages = defineMessages({
  description: {
    id: 'app.home.systemDecryption',
    defaultMessage: 'Система керування апартаментами.!!!!',
  },
});

@compose(
  withPageHelper,
  curryRight(injectIntl),
)
class AppHelmet extends Component {
  static propTypes = {
    intl: intlShape,
    getPageTitle: PropTypes.func,
    location: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    domainUrl: PropTypes.string.isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { location, language, domainUrl, getPageTitle } = this.props;

    const patch = location.pathname;
    const title = getPageTitle(patch);

    const locationUrl = `${domainUrl}${patch}`;

    return (
      <Helmet
        encodeSpecialCharacters={true}
        defaultTitle={constants.APP_NAME}
        titleTemplate={`${constants.APP_NAME} - %s`}
      >
        <html lang={language} prefix="og: http://ogp.me/ns#" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
        />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={constants.APP_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={'en_US'} />
        <meta property="og:locale:alternate" content={'en_US'} />
        <meta property="og:locale:alternate" content={'uk_UA'} />
        <meta property="og:locale:alternate" content={'ru_RU'} />
        <meta property="og:image" content={`${domainUrl}${iconApartment}`} />
        <meta property="og:url" content={locationUrl} />
        <meta
          property="og:description"
          content={formatMessage(messages.description)}
        />
      </Helmet>
    );
  }
}

export default AppHelmet;
