// eslint-disable-next-line no-use-before-define
import React, { createContext, useState, useContext, useEffect } from 'react';
import Router from 'next/router';
// eslint-disable-next-line no-unused-vars
import IUser from '../Types/IUser';
import useAuthToken from '../backend/hooks/useAuthToken';
import useAxiosConfig from '../backend/hooks/useAxiosConfig';
import { RequestStatus } from '../Types/enums/RequestStatus';
import {
  getCurrentUserRequest,
  loginRequest,
} from '../backend/repositories/UserRepository';
import { ILoginRequest } from '../Types/requestTypes/ILoginRequest';
import { ApiError } from '../Types/IApiError';

type AuthContextProps = {
  login: (loginForm: ILoginRequest) => void;
  logout: () => void;
  loading: boolean;
  loginStatus: RequestStatus;
  isAuthenticated: boolean;
  user: IUser | null;
  loginError?: ApiError;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } =
    useAuthToken();

  const [loginStatus, setLoginStatus] = useState<RequestStatus>('idle');
  const [loginError, setLoginError] = useState<ApiError>();

  const [currentUserStatus, setCurrentUserStatus] =
    useState<RequestStatus>('loading');
  const [currentUserError, setCurrentUserError] = useState<ApiError>();

  const loading = currentUserStatus === 'loading' || loginStatus === 'loading';
  const { authorization } = useAxiosConfig({ accessToken, setAccessToken });

  useEffect(() => {
    async function loadUser() {
      getCurrentUserRequest()
        .then((fetchedUser) => {
          setUser(fetchedUser);
          setCurrentUserStatus('succeeded');
          setCurrentUserError(undefined);
        })
        .catch((ex) => {
          setUser(null);
          setCurrentUserStatus('error');
          setCurrentUserError(ex);
        });
    }
    if (authorization) {
      loadUser();
    } else {
      setUser(null);
    }
  }, [authorization]);

  const redirectAfterLogin = () => {
    Router.push('/');
  };

  const redirectAfterLogout = () => {
    Router.push('/login');
  };

  useEffect(() => {
    console.log(`User changed to: ${user}`);
  }, [user]);

  const login = (loginForm: ILoginRequest) => {
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
