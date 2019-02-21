import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { curryRight } from 'lodash';
import { intlShape, defineMessages, injectIntl } from 'react-intl';

import ButtonMenu from '../../../ButtonMenu/index';

import { constants } from '../../../../core/constants/index';
import { isAuthenticatedInterface } from '../../../../core/functions';

const messages = defineMessages({
  language: {
    id: 'app.settings.language',
    defaultMessage: 'Мова',
  },
  about: {
    id: 'app.page.about',
    defaultMessage: 'Про систему',
  },
  logout: {
    id: 'app.auth.logout',
    defaultMessage: 'Вийти',
  },
});

const keyItems = {
  language: 'language',
  about: 'about',
  logout: 'logout',
};

@compose(curryRight(injectIntl))
class PopoverMenu extends Component {
  static propTypes = {
    intl: intlShape,
    actions: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
  };

  handleOnClickItem = key => {
    const { actions } = this.props;

    switch (key) {
      case keyItems.language:
        return actions.setLanguageDialogState(true);
      case keyItems.about:
        return actions.setRouterToLinkAsync(constants.PATCH_URL_ABOUT);
      case keyItems.logout:
        return actions.setFetchLogoutUserByTokenAsync();
      default:
        return () => null;
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { authUser } = this.props;

    const menuItems = [
      {
        id: keyItems.language,
        value: formatMessage(messages.language),
      },
      {
        id: keyItems.about,
        value: formatMessage(messages.about),
      },
    ];

    if (isAuthenticatedInterface(authUser)) {
      menuItems.push({
        id: keyItems.logout,
        value: formatMessage(messages.logout),
      });
    }

    return (
      <ButtonMenu menuItems={menuItems} onClickItem={this.handleOnClickItem} />
    );
  }
}

export default PopoverMenu;
