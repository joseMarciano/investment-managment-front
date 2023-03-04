import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

/**
 * Styles
 */
import { theme } from './config/styles/theme';
import '@fontsource/nunito'
import { Root } from './routes/Root';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Root />
    </ChakraProvider>
  </React.StrictMode>
);