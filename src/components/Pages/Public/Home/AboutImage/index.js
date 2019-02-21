import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { curryRight } from 'lodash';
import { intlShape, defineMessages, injectIntl } from 'react-intl';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Hidden from '@material-ui/core/Hidden';

import SvgLogoApartment from '../../../../SvgImage/LogoApartment';

import apartment from '../../../../../assets/images/apartment-home.jpeg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${apartment})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    minHeight: 350,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
  },
  typography: {
    marginTop: theme.spacing.unit * 5,
    color: theme.palette.common.white,
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  logo: {
    width: 200,
    fill: theme.palette.common.white,
  },
});

const messages = defineMessages({
  systemDecryption: {
    id: 'app.home.systemDecryption',
    defaultMessage:
      'Система управління апартамантами. Швидко, зручно та надійно.',
  },
});

@compose(
  withStyles(styles),
  curryRight(injectIntl),
)
class AboutImage extends Component {
  static propTypes = {
    intl: intlShape,
    classes: PropTypes.object,
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { classes } = this.props;

    const decryption = variant => (
      <Typography
        variant={variant}
        align="center"
        className={classes.typography}
      >
        {formatMessage(messages.systemDecryption)}
      </Typography>
    );

    const decryptionContainer = (
      <Fragment>
        <Hidden mdUp implementation="css">
          {decryption('body1')}
        </Hidden>
        <Hidden smDown implementation="css">
          {decryption('h6')}
        </Hidden>
      </Fragment>
    );

    return (
      <Card className={classes.root}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <SvgLogoApartment className={classes.logo} />
            {decryptionContainer}
          </div>
        </div>
      </Card>
    );
  }
}

export default AboutImage;
