import { Route, Navigate } from 'react-router-dom';
import {isLogin} from './isLogin';

function PrivateRoute({ children }) {
    const auth = isLogin();
    return auth ? children : <Navigate to="/" />;
  }

  export default PrivateRoute;