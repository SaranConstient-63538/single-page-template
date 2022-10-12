import React, { Suspense, useState, lazy} from 'react';

import { Routes, Route, BrowserRouter }  from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

const  LoginForm = lazy(()=> import('./components/LoginForm'));
const MainPage =lazy(()=> import('./components/MainPage'));

const loading =(
  <div className="text-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

const App = () => {
  // const access_token =localStorage.getItem('token')
  // axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  // axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  return (
    <BrowserRouter>
      <Suspense fallback={loading}> 
        <Routes>   
          {/* <PrivateRoute  exact path="/home" element={<MainPage />} restricted={false} /> */}
          {/* <PrivateRoute exact path="/" element={<LoginForm />} restricted={true} /> */}
          {/*  <Route exact element={<LoginForm />} path="/" name="Login Page"  />                 */}
          <Route exact element={<LoginForm />} path="/login" name="Login Page"  />
          <Route path="/" element={ <LoginForm /> } />
            <Route path="/home" 
              element={
                <PrivateRoute> 
                  <MainPage />
                </PrivateRoute>
              }
            />
        </Routes>   
        <ToastContainer />
      </Suspense>   
    </BrowserRouter>
  )
}
export default App;