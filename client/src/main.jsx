import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/Store.js';
import { SnackbarProvider } from 'notistack';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Accede a la variable de entorno
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ;



ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={googleClientId}> {/* Usa la variable de entorno aquí */}
    <Provider store={store}>
      <ThemeProvider theme={createTheme()}>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </GoogleOAuthProvider>
);
















