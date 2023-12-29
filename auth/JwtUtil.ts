import {jwtDecode} from 'jwt-decode';

export function decodeJwt(jwt: string) {
  if (jwt) {
    const decoded = jwtDecode(jwt);
    return decoded;
  }
  return '';
}
