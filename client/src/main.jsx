import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import {SnackbarProvider} from 'notistack'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </BrowserRouter> 
  </Provider>
);


















