import { Route, Navigate } from 'react-router-dom';
import {isLogin} from './isLogin';

// const PrivateRoute =({component: Component, restricted, ...rest})=>{
//     console.log('test')
//     return(
//         <>
//             <Route {...rest} render={ props => {
//                     isLogin() ? 
//                     <Component {...props} />
//                     : <Navigate to='/' />
//                 }}        
//             />
//         </>
       
            
//     )
// }
// export default PrivateRoute;
function PrivateRoute({ children }) {
    const auth = isLogin();
    return auth ? children : <Navigate to="/" />;
  }

  export default PrivateRoute;