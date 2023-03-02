import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Menu } from './components/menu/Menu';

/**
 * Styles
 */
import { theme } from './config/styles/theme';
import '@fontsource/nunito'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Menu />
    </ChakraProvider>
  </React.StrictMode>
);