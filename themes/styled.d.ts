import 'styled-components';

declare module 'styled-components' {
  export type TypeColors =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'dark'
    | 'light';

  export interface DefaultTheme {
    borderRadius: string;
    colors: { [key in TypeColors]: string };
  }
}
