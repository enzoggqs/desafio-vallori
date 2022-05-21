import React from 'react'
import { Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom'

interface Props extends RouteProps {
    
}

const ProtectedRoutes = ({ ...routeProps }: Props) => {
    let authorized = localStorage.getItem('authorized')

    return authorized === 'true' ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes
