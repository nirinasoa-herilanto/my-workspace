import { createGlobalStyle } from 'styled-components';
import { variables } from './variables';

const GlobalStyle = createGlobalStyle`
  ${variables}

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    background: ${({ theme }) => theme.backgroundColor}
  }

  h1, li, p, span {
    color: ${({ theme }) => theme.textColor};
  }
`;

export default GlobalStyle;
