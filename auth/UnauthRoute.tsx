import React, { useEffect } from 'react';
import Router from 'next/router';
import { useAuth } from './AuthContext';

type ProtectRouteProps = {
  children: React.ReactNode;
};

export default function UnauthRoute(
  Component: any
): React.FC<ProtectRouteProps> {
  return (...args) => {
    const { isAuthenticated, loading } = useAuth();
    useEffect(() => {
      if (isAuthenticated && !loading) Router.push('/');
    }, [isAuthenticated]);

    return <Component {...args} />;
  };
}
