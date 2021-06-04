import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../util/UseLocalStorage';

export default function useAuthToken() {
  const accessTokenKey = 'accessToken';
  const refreshTokenKey = 'refreshToken';
  const [accessToken, setAccessToken] = useLocalStorage(accessTokenKey);
  const [refreshToken, setRefreshToken] = useLocalStorage(refreshTokenKey);

  //   const setItem = useCallback(function(i) {
  //     setValue(i);
  // }, []);

  return [accessToken, refreshToken, setAccessToken, setRefreshToken] as const;
}
