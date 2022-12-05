import {Outlet} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import './CSS/element-center-style.css';

function ProtectedLayout() {
    const { isLoading, user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    if (isLoading) {
        return (
        <div className="main-container">
            <h1>Loading</h1>
        </div>
        );
    }

    if(isAuthenticated) {
        return (
            <div className="main-container">
                <h1>Dashboard</h1>
                <h2>Hi {user.name}</h2>
                <Outlet />
                <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
            </div>
        )
    }
    else {
        return (
            <div className="main-container">
                <h1>NotAuthenticated</h1>
                <button onClick={() => loginWithRedirect()}>Log In</button>
            </div>
        );
    }

}

export default ProtectedLayout;