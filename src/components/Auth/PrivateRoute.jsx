import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({children, user, redirect}) => {
    console.log(user);
    if(!user){
        console.log(user);
        return <Navigate to={redirect}/>
    } 
    console.log(user);
    return children?children : <Outlet/>; 
}

export default PrivateRoute