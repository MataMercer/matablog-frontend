import React from 'react';
import { ThemeProvider } from 'styled-components';
import useCurrentUser from '../backend/hooks/user/useCurrentUser';
import getTheme from '../themes/Themes';
import InterfaceColor from '../Types/enums/InterfaceColors';

type ThemeSwitcherProps = {
  children: React.ReactChild;
};

export default function ThemeSwitcher({ children }: ThemeSwitcherProps) {
  const { data: user, status, error } = useCurrentUser();
  const interfaceColor = user?.activeBlog.blogProfile?.interfaceColorTheme;
  return (
    <ThemeProvider
      theme={getTheme(
        interfaceColor && interfaceColor in InterfaceColor
          ? interfaceColor
          : undefined
      )}
    >
      {children}
    </ThemeProvider>
  );
}
