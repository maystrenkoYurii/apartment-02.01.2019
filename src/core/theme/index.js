import { SheetsRegistry } from 'react-jss';
import { createMuiTheme } from '@material-ui/core/styles';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';

import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/pink';
import background from '@material-ui/core/colors/grey';

const getTheme = () => {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        main: primary[500],
        ...primary,
      },
      secondary: {
        main: secondary[500],
        ...secondary,
      },
      background: {
        default: background[50],
        ...background,
      },
      common: {
        transparent: '#00000000',
        white: '#FFFFFF',
      },
    },
  });
  return createMuiTheme({
    ...theme,
    mixins: {
      toolbar: {
        minHeight: 64,
        [theme.breakpoints.down('sm')]: {
          minHeight: 56,
        },
      },
    },
    overrides: {
      MuiToolbar: {
        root: {
          paddingLeft: theme.spacing.unit,
          paddingRight: theme.spacing.unit,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        },
      },
      MuiInput: {
        root: {
          minWidth: 20,
        },
      },
      MuiDialogActions: {
        root: {
          padding: theme.spacing.unit,
        },
      },
      MuiDialogContent: {
        root: {
          paddingLeft: theme.spacing.unit * 3,
          paddingRight: theme.spacing.unit * 3,
          paddingTop: 0,
          paddingBottom: 0,
          flex: '1 1 auto',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        },
      },
    },
  });
};

export const getStyleContext = () => {
  return {
    theme: getTheme(),
    generateClassName: createGenerateClassName(),
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
  };
};
