// import React, { Component } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            <h1>qwertyuiop</h1>
            <h1>qwertyuiop</h1>
            <button onClick={() => loginWithRedirect()}>Log In</button>
        </div>
    )
}

export default LoginPage;