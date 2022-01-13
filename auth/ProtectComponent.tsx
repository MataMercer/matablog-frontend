import React from 'react';
import { useAuth } from './AuthContext';

type ProtectComponentProps = {
  children: React.ReactChild;
};

export default function ProtectComponent({ children }: ProtectComponentProps) {
  const { isAuthenticated, loading } = useAuth();
  if (!isAuthenticated || !loading) {
    return <></>;
  }
  return <>{children}</>;
}
