import { useAuth0 } from "@auth0/auth0-react";
import buttonStyle from "../CSS/button-style.module.css";

function LoginPage() {
    const { loginWithRedirect } = useAuth0();

    const wrapperStyle = {
        marginTop: 64, 
        height: 'calc(100vh - 64px)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }

    const cardWrapperStyle = {
        height: 300,
        width: 300,
        backgroundColor: '#F7EEED',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column'
    }

    const loginHeaderWrapperStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 10, 
        paddingTop: 20,
    }

    const loginHeaderStyle = {
        fontFamily: 'Inter', 
    }

    const btnWrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    }

    return (
        <div style={wrapperStyle}>
            <div style={cardWrapperStyle}>
                <div style={loginHeaderWrapperStyle}>
                    <h2 style={loginHeaderStyle}>Admin Login</h2>
                </div>
                
                <div style={btnWrapperStyle}>
                    <div>
                        <button className={buttonStyle.saveBtn} onClick={loginWithRedirect}>Log In</button> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;