import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({children, user, redirect}) => {
    console.log("aboveif statement",user);
    if(!user){
        console.log("inside if statement",user);
        return <Navigate to={redirect}/>
    } 
    console.log("after if statement",user);
    return children?children : <Outlet/>; 
}

export default PrivateRoute