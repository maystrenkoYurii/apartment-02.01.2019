import React, { Component } from 'react';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';

export const withFetchErrorMessages = Enchanced => {
  const messages = defineMessages({
    failedFetch: {
      id: 'app.message.fetch.failedFetch',
      defaultMessage: "Сталась помилка, перевірте інтернет з'єднання",
    },
    authorizationError: {
      id: 'app.message.fetch.authorizationError',
      defaultMessage: 'Помилка авторизації',
    },
    anotherError: {
      id: 'app.message.fetch.anotherError',
      defaultMessage: 'Сталась помилка, код: ',
    },
  });

  @compose(curryRight(injectIntl))
  class withFetchErrorMessages extends Component {
    static propTypes = {
      intl: intlShape,
    };

    render() {
      const { formatMessage } = this.props.intl;

      return (
        <Enchanced
          fetchErrorMessages={{
            failedFetch: formatMessage(messages.failedFetch),
            authorizationError: formatMessage(messages.authorizationError),
            anotherError: formatMessage(messages.anotherError),
          }}
          {...this.props}
        />
      );
    }
  }

  return withFetchErrorMessages;
};
