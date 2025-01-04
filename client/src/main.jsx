
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import {SnackbarProvider} from 'notistack';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//const  clientId = ProcessingInstruction.env.GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='855308377464-c0tq574k9v9lm57jummtf96nf5g2p3b0.apps.googleusercontent.com'>
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


















