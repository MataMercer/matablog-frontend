// eslint-disable-next-line no-use-before-define
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Router from 'next/router';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { User } from '../modelTypes/User';
import useAuthToken from '../backend/hooks/useAuthToken';
import useAxiosConfig from '../backend/hooks/useAxiosConfig';
import { RequestStatus } from '../modelTypes/RequestStatus';
import useGenericRequest from '../backend/hooks/util/useGenericRequest';
import {
  getCurrentUserRequest,
  loginRequest,
} from '../backend/repositories/UserRepository';
import { ILoginForm } from '../modelTypes/formTypes/loginForm';
import { ApiError } from '../modelTypes/ApiError';
import { AuthTokens } from '../modelTypes/AuthTokens';

type AuthContextProps = {
  login: (loginForm: ILoginForm) => void;
  logout: () => void;
  loading: boolean;
  loginStatus: RequestStatus;
  isAuthenticated: boolean;
  user: User | null;
  loginError?: ApiError;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadUserStatus, setLoadUserStatus] =
    useState<RequestStatus>('loading');
  const loading = loadUserStatus === 'loading';
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } =
    useAuthToken();

  const [loginStatus, setLoginStatus] = useState<RequestStatus>('idle');
  const [loginError, setLoginError] = useState<ApiError>();

  const [currentUserStatus, setCurrentUserStatus] =
    useState<RequestStatus>('idle');
  const [currentUserError, setCurrentUserError] = useState<ApiError>();

  useAxiosConfig();

  useEffect(() => {
    async function loadUser() {
      getCurrentUserRequest()
        .then((user) => {
          setUser(user);
          setCurrentUserStatus('succeeded');
          setCurrentUserError(undefined);
        })
        .catch((ex) => {
          setUser(null);
          setCurrentUserStatus('error');
          setCurrentUserError(ex);
        });
    }
    loadUser();
  }, [accessToken]);

  const redirectAfterLogin = () => {
    Router.push('/settings');
  };

  const redirectAfterLogout = () => {
    Router.push('/login');
  };

  const login = (loginForm: ILoginForm) => {
    loginRequest(loginForm)
      .then((res) => {
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        setLoginError(undefined);
        setLoginStatus('succeeded');
        redirectAfterLogin();
      })
      .catch((ex) => {
        setLoginError(ex);
        setLoginStatus('error');
      });
  };

  const logout = () => {
    // auth
    //   ?.signOut()
    //   .then(() => {
    //     setUser(null);
    //     redirectAfterLogout();
    //     // Sign-out successful.
    //   })
    //   .catch((error: FirebaseError) => {
    //     // An error happened.
    //   });
    setAccessToken('');
    setRefreshToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        loginError,
        loginStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};