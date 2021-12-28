import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = (props) => {

    const { loginWithRedirect, logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(user);
    console.log(isAuthenticated);


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e)=>{
        if(e.target.name === "uName"){
            setUserName(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const logIn = (e)=>{
        e.preventDefault();
        loginWithRedirect();
        props.logIn();
    }

    return(
    <div>
        <button onClick={(e)=>logIn(e)}>Log in</button>
        <button onClick={()=>logout()}>Log out</button>
        {/* <form>
            <label>User Name
                <input id="uName" type="text" name="uName" onChange={handleInputChange}></input>
            </label>
            <label>password
                <input id="password" type="password" name="uName" onChange={handleInputChange}></input>
            </label>
            <input type="submit" onClick={handleSubmit}></input>
        </form> */}
    </div>
    )
}

export default Login;