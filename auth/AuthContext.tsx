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
import { IUser } from '../modelTypes/IUser';
import useAuthToken from '../backend/hooks/useAuthToken';
import useAxiosConfig from '../backend/hooks/useAxiosConfig';
import { RequestStatus } from '../modelTypes/enums/RequestStatus';
import useGenericRequest from '../backend/hooks/util/useGenericRequest';
import {
  getCurrentUserRequest,
  loginRequest,
} from '../backend/repositories/UserRepository';
import { ILoginForm } from '../modelTypes/formTypes/ILoginForm';
import { ApiError } from '../modelTypes/IApiError';
import { IAuthTokens } from '../modelTypes/IAuthTokens';

type AuthContextProps = {
  login: (loginForm: ILoginForm) => void;
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
    useState<RequestStatus>('idle');
  const [currentUserError, setCurrentUserError] = useState<ApiError>();

  const loading = currentUserStatus === 'loading' || loginStatus === 'loading';
  const { authorization } = useAxiosConfig({ accessToken, setAccessToken });

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
    if (authorization) {
      loadUser();
    } else {
      setUser(null);
    }
  }, [authorization]);

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
