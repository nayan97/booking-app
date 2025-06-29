import React from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();

    if(loading){
        return <Spinner></Spinner>
    }

    if(!user){
        <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;