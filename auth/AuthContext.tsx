// eslint-disable-next-line no-use-before-define
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import Router from 'next/router';
// eslint-disable-next-line no-unused-vars
import IUser from '../Types/IUser';
import useAuthToken from '../backend/hooks/useAuthToken';
import { RequestStatus } from '../Types/enums/RequestStatus';
import {
  getCurrentUserRequest,
  loginRequest,
} from '../backend/repositories/UserRepository';
import { ILoginRequest } from '../Types/requestTypes/ILoginRequest';
import { ApiError } from '../Types/IApiError';
import { decodeJwt } from './JwtUtil';

type AuthContextProps = {
  login: (loginForm: ILoginRequest) => void;
  logout: () => void;
  loading: boolean;
  loginStatus: RequestStatus;
  isAuthenticated: boolean;
  user: IUser | null;
  loginError?: ApiError;
  accessToken: string;
  refreshToken: string;
  setAccessToken: (arg0: string) => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } =
    useAuthToken();

  const [loginStatus, setLoginStatus] = useState<RequestStatus>('idle');
  const [loginError, setLoginError] = useState<ApiError>();

  const [currentUserStatus, setCurrentUserStatus] =
    useState<RequestStatus>('loading');
  const [currentUserError, setCurrentUserError] = useState<ApiError>();

  const loading = currentUserStatus === 'loading' || loginStatus === 'loading';

  useEffect(() => {
    async function loadUser() {
      const decodedAccessToken: any = decodeJwt(accessToken);
      const userData: IUser = {
        id: decodedAccessToken.userId,
        username: decodedAccessToken.username,
        activeBlog: { id: decodedAccessToken.activeBlogId },
      };
      setUser(userData);
      // getCurrentUserRequest()
      //   .then((fetchedUser: any) => {
      //     setUser(fetchedUser);
      //     setCurrentUserStatus('succeeded');
      //     setCurrentUserError(undefined);
      //   })
      //   .catch((ex: ApiError) => {
      //     setUser(null);
      //     setCurrentUserStatus('error');
      //     setCurrentUserError(ex);
      //   });
    }
    if (accessToken) {
      loadUser();
    } else {
      setUser(null);
    }
  }, [accessToken]);

  const redirectAfterLogin = () => {
    Router.push('/');
  };

  const redirectAfterLogout = () => {
    Router.push('/login');
  };

  const login = useCallback(
    (loginForm: ILoginRequest) => {
      loginRequest(loginForm)
        .then((res: any) => {
          setAccessToken(res.accessToken);
          setRefreshToken(res.refreshToken);
          setLoginError(undefined);
          setLoginStatus('succeeded');
          redirectAfterLogin();
        })
        .catch((ex: ApiError) => {
          setLoginError(ex);
          setLoginStatus('error');
        });
    },
    [setAccessToken, setRefreshToken]
  );

  const logout = useCallback(() => {
    setAccessToken('');
    setRefreshToken('');
    setUser(null);
    redirectAfterLogout();
  }, [setAccessToken, setRefreshToken]);

  const contextData = useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      login,
      loading,
      logout,
      loginError,
      loginStatus,
      accessToken: accessToken || '',
      refreshToken: refreshToken || '',
      setAccessToken,
    }),
    [
      accessToken,
      loading,
      login,
      loginError,
      loginStatus,
      logout,
      refreshToken,
      setAccessToken,
      user,
    ]
  );

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}
