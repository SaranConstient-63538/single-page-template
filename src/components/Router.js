import React from 'react'
import { Fragment } from 'react'
import { Suspense } from 'react'
import { Spinner } from 'react-bootstrap'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import LoginForm from './LoginForm'
import MainPage from './MainPage'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from './auth'
import { RouterTwoTone } from '@mui/icons-material'
const loading =(
    <div className="text-center align-items-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
  
const Router = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={loading}> 
      <Routes>    
          <Route element={<LoginForm />} path="/" exact />    
          <Route element={<MainPage />} path="/home" />    
      </Routes> 
    </Suspense>   
    </BrowserRouter>
  )
}

export default Router