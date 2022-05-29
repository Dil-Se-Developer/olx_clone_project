import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginForm from './components/FormAuthentication/LoginForm'


const useAuth = (x) => {
    let user = { loggedIn: x }
    return user.loggedIn
}

function ProtectedRoute(props) {
    let {isAuthenticated,handleLogin} = props
    const isAuth = useAuth(isAuthenticated)
    return (
        isAuth ? <Outlet /> : <LoginForm handleLogin={handleLogin} />
    )
}

export default ProtectedRoute