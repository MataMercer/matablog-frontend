import React from 'react';
import UserAuthority from '../Types/enums/UserAuthority';
import { useAuth } from './AuthContext';

type ProtectComponentProps = {
  children: React.ReactChild;
  requiredAuthority?: UserAuthority;
};

export default function ProtectComponent({
  children,
  requiredAuthority,
}: ProtectComponentProps) {
  const { isAuthenticated, loading, hasAuthority } = useAuth();
  if (!(isAuthenticated && hasAuthority(requiredAuthority)) || !loading) {
    return null;
  }
  return <>{children}</>;
}
