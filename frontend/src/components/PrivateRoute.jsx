import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // Check if the token is in localStorage

    return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
