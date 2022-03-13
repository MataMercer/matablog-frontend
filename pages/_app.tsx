// eslint-disable-next-line no-unused-vars
import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../auth/AuthContext';
import MainTheme from '../themes/MainTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';
import AxiosProvider from '../auth/AxiosProvider';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <AuthProvider>
        <AxiosProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={MainTheme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </QueryClientProvider>
        </AxiosProvider>
      </AuthProvider>
    </SSRProvider>
  );
}
