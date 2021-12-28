import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';


const Login = () => {

    const { loginWithRedirect} = useAuth0();

    return(
    <div id="login">
        <h2>Welcome! Please log in.</h2>
        <Button variant="secondary" onClick={()=>loginWithRedirect()}>Log In</Button>
    </div>
    )
}

export default Login;