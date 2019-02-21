import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { curryRight } from 'lodash';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AppDialog from '../../containers/AppDialog/index';

import { constants } from '../../core/constants/index';

const messages = defineMessages({
  language: {
    id: 'app.settings.language',
    defaultMessage: 'Мова',
  },
  close: {
    id: 'app.dialog.action.close',
    defaultMessage: 'Закрити',
  },
  ok: {
    id: 'app.dialog.action.ok',
    defaultMessage: 'Ок',
  },
  languageEn: {
    id: 'app.settings.language.en',
    defaultMessage: 'English',
  },
  languageRu: {
    id: 'app.settings.language.ru',
    defaultMessage: 'Русский',
  },
  languageUk: {
    id: 'app.settings.language.uk',
    defaultMessage: 'Українська',
  },
});

@compose(curryRight(injectIntl))
class AppLanguage extends Component {
  static propTypes = {
    intl: intlShape,
    isOpenLanguage: PropTypes.bool.isRequired,
    onClickClose: PropTypes.func.isRequired,
    onClickOk: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  };

  constructor(props) {
    super();
    this.state = {
      selectedLanguage: props.language,
    };
  }

  handleEntering = () => {
    setTimeout(() => {
      if (this.languageRadioGroupRef) {
        this.languageRadioGroupRef.focus();
      }
    }, 400);
  };

  handleChange = (event, key) => {
    this.setState({ selectedLanguage: key });
  };

  handleClose = () => {
    const { onClickClose, language } = this.props;

    this.setState({ selectedLanguage: language });
    onClickClose();
  };

  getLanguageMessage = key => {
    const { formatMessage } = this.props.intl;
    switch (key) {
      case constants.LANGUAGE_EN:
        return formatMessage(messages.languageEn);
      case constants.LANGUAGE_RU:
        return formatMessage(messages.languageRu);
      case constants.LANGUAGE_UK:
        return formatMessage(messages.languageUk);
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isOpenLanguage, onClickOk } = this.props;
    const { selectedLanguage } = this.state;

    return (
      <AppDialog
        maxWidth="xs"
        fullWidth
        onEntering={this.handleEntering}
        open={isOpenLanguage}
        onClose={this.handleClose}
      >
        <DialogTitle>{formatMessage(messages.language)}</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={ref => {
              this.languageRadioGroupRef = ref;
            }}
            value={selectedLanguage}
            onChange={this.handleChange}
          >
            {constants.SUPPORTED_LANGUAGES.map(language => (
              <FormControlLabel
                key={language}
                label={this.getLanguageMessage(language)}
                value={language}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            {formatMessage(messages.close)}
          </Button>
          <Button onClick={() => onClickOk(selectedLanguage)} color="primary">
            {formatMessage(messages.ok)}
          </Button>
        </DialogActions>
      </AppDialog>
    );
  }
}

export default AppLanguage;
