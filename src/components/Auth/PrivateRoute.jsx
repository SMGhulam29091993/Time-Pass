import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({children, user, redirect}) => {
    if(!user){
        return <Navigate to={redirect}/>
    }
    return children?children : <Outlet/>; 
}

export default PrivateRoute