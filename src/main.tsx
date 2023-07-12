import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '@smastrom/react-rating/style.css';
import { AuthContextProvider } from './contexts/authContext';
import { FavoriteContextProvider } from './contexts/favoriteContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FavoriteContextProvider>
          <App />
        </FavoriteContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
