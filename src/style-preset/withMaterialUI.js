import React from 'react';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import composePlugin from 'jss-plugin-compose';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset,
} from '@material-ui/core/styles';
import './preset.css';

const theme = createMuiTheme({
  breakpointLg: '1024px',
  typography: {
    useNextVariants: true,
  },
});

const jss = create({
  plugins: [...jssPreset().plugins, composePlugin()],
});

const generateClassName = createGenerateClassName();

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
  return WithRoot;
}

export default withRoot;
