import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import { GetStoredUser } from './services/Users'

axios.interceptors.request.use(request => {
  if(request.url.includes('api')){
    const storedToken = GetStoredUser()
    if(storedToken && storedToken.token){
      request.headers['Authorization'] = `bearer ${storedToken.token}`
    }
  }

  return request
})

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
