import React from "react";
import { Navigate } from 'react-router-dom'
import { useAuth } from "../hooks/auth";

export const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    return auth ? children : <Navigate to="/" />;
}
