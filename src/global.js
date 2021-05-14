// global.js

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  .navbar {
    background-color: ${({ theme }) => theme.navbar.background};
    .navbar-brand {
      color: ${({ theme }) => theme.navbar.text};
    }
    .navbar-toggler {
      .navbar-toggler-icon {
        color: ${({ theme }) => theme.navbar.text};
      }
    }
  }
  `;
