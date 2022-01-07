import useLocalStorage from './useLocalStorage';

export default function useAuthToken() {
  const accessTokenKey = 'accessToken';
  const refreshTokenKey = 'refreshToken';
  const [accessToken, setAccessToken] = useLocalStorage(accessTokenKey);
  const [refreshToken, setRefreshToken] = useLocalStorage(refreshTokenKey);
  return { accessToken, refreshToken, setAccessToken, setRefreshToken };
}
