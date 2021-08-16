// eslint-disable-next-line no-unused-vars
import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth/AuthContext';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import MainTheme from '../themes/MainTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={MainTheme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
