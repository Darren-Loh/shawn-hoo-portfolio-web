import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
    const { loginWithRedirect } = useAuth0();

    const bodyStyle = {
        display: 'flex',
        fontSize: 100
    }

    return (
        <div>
            <button style={bodyStyle} onClick={loginWithRedirect}>Log In</button>
        </div>
    )
}

export default LoginPage;