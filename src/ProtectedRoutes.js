import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
// import LoginForm from './components/FormAuthentication/LoginForm'


const useAuth = (isAuthenticated) => {
    let user = { loggedIn: isAuthenticated }
    return user.loggedIn
}

function ProtectedRoute(props) {
    let {isAuthenticated} = props
    const isAuth = useAuth(isAuthenticated)
    return (
        isAuth ? <Outlet /> : <Navigate to ='/' />
    )
}

export default ProtectedRoute