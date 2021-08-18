import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import useGenericRequest from './util/useGenericRequest';

export default function useAuthToken() {
  const accessTokenKey = 'accessToken';
  const refreshTokenKey = 'refreshToken';
  const [accessToken, setAccessToken] = useLocalStorage(accessTokenKey);
  const [refreshToken, setRefreshToken] = useLocalStorage(refreshTokenKey);
  return { accessToken, refreshToken, setAccessToken, setRefreshToken };
}
