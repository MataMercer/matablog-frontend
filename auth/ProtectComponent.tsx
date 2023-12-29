import React from 'react';
import UserAuthority from '../Types/enums/UserAuthority';
import IBlog from '../Types/IBlog';
import IUser from '../Types/IUser';
import { useAuth } from './AuthContext';

type ProtectComponentProps = {
  children: React.ReactChild;
  requiredAuthority?: UserAuthority;
  componentBlog?: IBlog;
};

export default function ProtectComponent({
  children,
  requiredAuthority,
  componentBlog,
}: ProtectComponentProps) {
  const { isAuthenticated, loading, hasAuthority, hasOwnership } = useAuth();
  if (
    !(
      isAuthenticated &&
      hasAuthority(requiredAuthority) &&
      hasOwnership(componentBlog)
    ) ||
    !loading
  ) {
    return null;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
