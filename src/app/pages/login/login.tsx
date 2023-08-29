import {getDeepLink, useAuth} from "../../components/auth";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const link = getDeepLink()
    const {isAuthenticated, login} = useAuth()

    if (isAuthenticated) {
        return <Navigate to={link ?? "/home"}/>
    }

    return <div>
        <h1>Login</h1>
        <p>Deep-Link: {link}</p>
        <button onClick={() => login('', '')}>Login</button>
    </div>
}