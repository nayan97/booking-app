import React from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if(loading){
        return <Spinner></Spinner>
    }

    if(!user){
       return <Navigate state={{ from: location.pathname}} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;