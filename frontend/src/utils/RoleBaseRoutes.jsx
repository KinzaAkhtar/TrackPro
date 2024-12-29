import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({children, requiredRoles}) => {
    const {user,loading} = useAuth()
    if(loading){
        <div>Loading....</div>
    }

    if(!requiredRoles.includes(user.role)){
        <Navigate to="/unauthorized"/>
    }

    return user ? children: <Navigate to="/Login"/>


}

export default RoleBaseRoutes