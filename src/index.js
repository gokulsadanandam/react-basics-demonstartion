import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';

import { BrowserRouter } from 'react-router-dom';

function ThemedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.render(<ThemedApp />, document.getElementById('root'));
