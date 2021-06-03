import React, { createContext, useState, useContext, useEffect } from 'react';
import Router from 'next/router';
// eslint-disable-next-line no-unused-vars
import { IUser } from '../modelTypes/interfaces';
import axios from 'axios';
import {
  setAccessToken,
  getAccessToken,
  clearTokens,
  setRefreshToken,
} from '../backend/config/AxiosConfig';

type AuthContextProps = {
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadUser() {
      // // observer to check if the user is logged in
      // auth?.onAuthStateChanged((userObservation: firebase.User | null) => {
      //   if (userObservation) {
      //     // User is signed in.
      //     setUser(userObservation);
      //   } else {
      //     setUser(null);
      //   }
      // });
      // setLoading(false);

      if (getAccessToken()) {
        axios({
          method: 'get',
          url: '/currentuser',
          headers: {
            authorization: getAccessToken(),
          },
        })
          .then((response) => {
            console.log(response);
            const user: IUser = {
              username: response.data,
            };
            setUser(user);
            setLoading(false);
          })
          .catch((ex) => {
            console.log(ex);
            setUser(null);
            setLoading(false);
          });
      }
    }
    loadUser();
  }, []);

  const redirectAfterLogin = () => {
    Router.push('/admindashboard');
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
    // return fetch('https://localhost:8443/login', {
    //   method: 'post',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // }).then((response) => {
    //   console.log(response);
    //   if (response.ok) {
    //     const token = response.headers.get('Authorization');
    //     if (token) {
    //       Cookies.set('token', token);
    //     }
    //     redirectAfterLogin();
    //   }
    // });
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
        redirectAfterLogin();
      })
      .catch((response) => {
        console.log(response);
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
    clearTokens();
    setUser(null);
    redirectAfterLogout();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
