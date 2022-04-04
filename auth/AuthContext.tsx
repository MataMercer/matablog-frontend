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
import { loginRequest } from '../backend/repositories/UserRepository';
import { ILoginRequest } from '../Types/requestTypes/ILoginRequest';
import { ApiError } from '../Types/IApiError';
import { decodeJwt } from './JwtUtil';
import UserRole, { UserRoleAuths } from '../Types/enums/UserRole';
import UserAuthority from '../Types/enums/UserAuthority';
import IBlog from '../Types/IBlog';
import AxiosUnauthInstance from '../backend/config/AxiosUnauthInstance';
import { getOAuthCodeExchangeRequest } from '../backend/repositories/OAuthRepository';

type AuthContextProps = {
  login: (loginForm: ILoginRequest) => void;
  oauthLogin: (code: String) => void;
  logout: () => void;
  loading: boolean;
  loginStatus: RequestStatus;
  isAuthenticated: boolean;
  user?: IUser;
  loginError?: ApiError;
  accessToken: string;
  refreshToken: string;
  setAccessToken: (arg0: string) => void;
  hasAuthority: (arg0?: UserAuthority) => boolean;
  hasOwnership: (arg0?: IBlog) => boolean;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>();
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
        role: decodedAccessToken.userRole,
        authorities: UserRoleAuths[decodedAccessToken.userRole as UserRole],
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
      setUser(undefined);
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
      loginRequest(AxiosUnauthInstance, loginForm)
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

  const oauthLogin = useCallback(
    (code: String) => {
      getOAuthCodeExchangeRequest(AxiosUnauthInstance, code)
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
    setUser(undefined);
    redirectAfterLogout();
  }, [setAccessToken, setRefreshToken]);

  const hasAuthority = useCallback(
    (requiredAuthority: UserAuthority | undefined) => {
      console.log('derp');
      if (!requiredAuthority) {
        return true;
      }
      if (!user) {
        return false;
      }
      return user.authorities.includes(requiredAuthority);
    },
    [user]
  );

  const hasOwnership = useCallback(
    (blog: IBlog | undefined) => {
      if (!blog) {
        return true;
      }
      if (!user) {
        return false;
      }

      return user.activeBlog.id === blog.id;
    },
    [user]
  );

  const contextData = useMemo(
    () => ({
      isAuthenticated: !!user,
      hasAuthority,
      user,
      login,
      oauthLogin,
      loading,
      logout,
      loginError,
      loginStatus,
      accessToken: accessToken || '',
      refreshToken: refreshToken || '',
      setAccessToken,
      hasOwnership,
    }),
    [
      accessToken,
      hasAuthority,
      loading,
      login,
      oauthLogin,
      loginError,
      loginStatus,
      logout,
      refreshToken,
      setAccessToken,
      user,
      hasOwnership,
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
