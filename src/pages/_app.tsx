import React from 'react';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MUIWrapper from "../contexts/MUIWrapper";
import settings from '../data.json';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const name = settings.fullName;
  const role = settings.role;

  return (
    <React.Fragment>
      <Head>
        <title>{name}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content={role} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={role}></meta>
      </Head>
      <MUIWrapper>
        <CssBaseline />
        <Component {...pageProps} />
      </MUIWrapper>
    </React.Fragment>
  );
}

// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// };
