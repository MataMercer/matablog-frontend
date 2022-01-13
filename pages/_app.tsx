// eslint-disable-next-line no-unused-vars
import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../auth/AuthContext';
import MainTheme from '../themes/MainTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={MainTheme}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SSRProvider>
  );
}
