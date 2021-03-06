import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';

import uk from 'react-intl/locale-data/uk';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';

import translationUk from '../../core/languages/uk.json';
import translationRu from '../../core/languages/ru.json';
import translationEn from '../../core/languages/en.json';

import { constants } from '../../core/constants/index';

addLocaleData([...uk, ...ru, ...en]);

class CustomIntlProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]),
    language: PropTypes.string.isRequired,
  };

  getMessages() {
    const { language } = this.props;
    switch (language) {
      case constants.LANGUAGE_EN:
        return translationEn;
      case constants.LANGUAGE_RU:
        return translationRu;
      case constants.LANGUAGE_UK:
        return translationUk;
      default:
        return translationEn;
    }
  }

  render() {
    const { language, children } = this.props;

    const messages = this.getMessages();

    return (
      <IntlProvider locale={language} key={language} messages={messages}>
        {children}
      </IntlProvider>
    );
  }
}

export default CustomIntlProvider;
