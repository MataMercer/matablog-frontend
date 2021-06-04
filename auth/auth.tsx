// eslint-disable-next-line no-use-before-define
import React, { createContext, useState, useContext, useEffect } from 'react';
import Router from 'next/router';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { User } from '../modelTypes/User';
import useAuthToken from './useAuthToken';
import useAxiosConfig from './useAxiosConfig';
import { RequestStatus } from '../modelTypes/RequestStatus';

type AuthContextProps = {
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  loading: boolean;
  loginStatus: RequestStatus;
  isAuthenticated: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadUserStatus, setLoadUserStatus] =
    useState<RequestStatus>('loading');
  const [loginStatus, setLoginStatus] = useState<RequestStatus>('idle');

  const loading = loadUserStatus === 'loading';
  const [accessToken, refreshToken, setAccessToken, setRefreshToken] =
    useAuthToken();

  useAxiosConfig();

  useEffect(() => {
    async function loadUser() {
      console.log(accessToken);
      axios({
        method: 'get',
        url: '/currentuser',
        headers: {
          Authorization: accessToken,
        },
      })
        .then((response) => {
          console.log(response);
          const userRes: User = {
            username: response.data,
          };
          setUser(userRes);
          setLoadUserStatus('succeeded');
        })
        .catch((ex) => {
          console.log(ex);
          setUser(null);
          setLoadUserStatus('errored');
        });
    }
    loadUser();
  }, [accessToken]);

  const redirectAfterLogin = () => {
    console.log('redirecting to settings');
    Router.push('/settings');
  };

  const redirectAfterLogout = () => {
    Router.push('/login');
  };

  const login = async (username: string, password: string) => {
    const data = {
      username,
      password,
    };

    console.log(data);
    return axios({
      method: 'POST',
      url: '/login',
      headers: {
        'content-type': 'application/json',
      },
      data,
    })
      .then((response) => {
        console.log(response);
        setAccessToken(response.headers.authorization);
        setRefreshToken(response.headers.refreshToken);
        setLoginStatus('succeeded');
        redirectAfterLogin();
      })
      .catch((response) => {
        console.log(response);
        setLoginStatus('errored');
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
        loginStatus,
        logout,
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
