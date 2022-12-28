import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import Wordgame from './Wordgame';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Wordgame />
  </StrictMode>
);
