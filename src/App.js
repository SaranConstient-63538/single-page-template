import React, { Suspense, useState, lazy} from 'react';
import { ToastContainer } from 'react-toastify'
import { Routes, Route, BrowserRouter }  from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import PrivateRoute from './components/PrivateRoute';
import {loading} from './components/loading'
import 'react-toastify/dist/ReactToastify.css';

const  LoginForm = lazy(()=> import('./components/LoginForm'));
const ResetForm = lazy(()=> import('./components/ResetForm'));
const MainPage =lazy(()=> import('./components/MainPage'));

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
          <Route exact element={<ResetForm />} path="/reset" name="Reset Page"  />
          
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