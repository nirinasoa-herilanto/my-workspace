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

  h1 {
    font-size: 42px;
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 28px;
  }

  a {
    color: var(--blue-600);
    text-decoration: none;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  h1, h2, h3, li, p, span, a {
    color: ${({ theme }) => theme.textColor};
  }

  a, li, p, span {
    font-size: 16px;
  }


`;

export default GlobalStyle;
