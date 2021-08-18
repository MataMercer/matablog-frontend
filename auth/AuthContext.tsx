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
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } =
    useAuthToken();

  const [loginStatus, setLoginStatus] = useState<RequestStatus>('idle');
  const [loginError, setLoginError] = useState<ApiError>();

  const [currentUserStatus, setCurrentUserStatus] =
    useState<RequestStatus>('idle');
  const [currentUserError, setCurrentUserError] = useState<ApiError>();

  const loading = currentUserStatus === 'loading' || loginStatus === 'loading';
  useAxiosConfig();

  useEffect(() => {
    async function loadUser() {
      console.log('Loading user...');
      getCurrentUserRequest()
        .then((user) => {
          console.log('User loaded.');
          setUser(user);
          setCurrentUserStatus('succeeded');
          setCurrentUserError(undefined);
        })
        .catch((ex) => {
          console.log('User failed to load.');
          setUser(null);
          setCurrentUserStatus('error');
          setCurrentUserError(ex);
        });
    }
    if (accessToken) {
      loadUser();
    } else {
      setUser(null);
    }
  }, [accessToken]);

  const redirectAfterLogin = () => {
    Router.push('/settings');
  };

  const redirectAfterLogout = () => {
    Router.push('/login');
  };

  useEffect(() => {
    console.log(`User changed to: ${user}`);
  }, [user]);

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
    redirectAfterLogout();
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
