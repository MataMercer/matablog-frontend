// eslint-disable-next-line no-unused-vars
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosProvider from '../auth/AxiosProvider';
import GlobalStyle from '../components/ui/Global.styled';
import ThemeSwitcher from '../components/ThemeSwitcher';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <AxiosProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeSwitcher>
              <>
                <GlobalStyle />
                <Component {...pageProps} />
              </>
            </ThemeSwitcher>
          </QueryClientProvider>
        </AxiosProvider>
      </AuthProvider>
  );
}
