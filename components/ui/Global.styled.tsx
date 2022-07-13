import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  a{
    text-decoration: none ;
    color:${({ theme }) => theme.colors.primary}
  } 
`;

export default GlobalStyle;
