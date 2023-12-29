import { DefaultTheme } from 'styled-components';
import InterfaceColor from '../Types/enums/InterfaceColors';

const interfaceColors: { [key in InterfaceColor]: string } = {
  blue: '#5DB7DE',
  green: '#136F63',
  tan: '#F1E9DB',
  red: '#942911',
  purple: '#3E2F5B',
};

export default function getTheme(interfaceColor?: InterfaceColor) {
  const defaultInterfaceColor = 'green';
  const primaryColor =
    interfaceColors[interfaceColor ? interfaceColor : defaultInterfaceColor];
  const MainTheme: DefaultTheme = {
    borderRadius: '5px',

    colors: {
      primary: primaryColor,
      secondary: '#6b6b6b',
      success: '#209e6a',
      info: '#8a8a8a',
      warning: '#dab616',
      danger: '#ff553b',
      dark: '#444444',
      light: '#FFFFFF',
    },
  };
  return MainTheme;
}
