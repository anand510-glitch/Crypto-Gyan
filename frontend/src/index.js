import { ColorModeScript, ChakraProvider,theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import ColorModeSwitcher from './ColorModeSwitcher'
import CryptoContext from "./CrptoContext";
import 'react-alice-carousel/lib/alice-carousel.css';
import ReactHtmlParser from "react-html-parser";
import  "./index.css"

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    
    <ColorModeScript/>

<ChakraProvider theme={theme} >
 <CryptoContext>
 <App />
 </CryptoContext>
  
</ChakraProvider>
  </StrictMode>
);