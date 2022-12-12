import {Outlet} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

import './CSS/element-center-style.css';

function ProtectedLayout() {
    const { isLoading, user, isAuthenticated, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();

    if (isLoading) {
        return (
        <div className="main-container">
            <h1>Loading</h1>
        </div>
        );
    }

    async function callProtectedApi() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios
                .get("http://localhost:4000/protected", {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    if(isAuthenticated) {
        return (
            <div>
                <Outlet />
                {/* <a href='/dashboard/posts'>posts</a>
                <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
                <button onClick={callProtectedApi}>Protected API</button> */}
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>NotAuthenticated</h1>
                <button onClick={loginWithRedirect}>Log In</button>
                <button onClick={callProtectedApi}>Protected API</button>
            </div>
        );
    }

}

export default ProtectedLayout;