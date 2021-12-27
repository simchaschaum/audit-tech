import { useState } from "react"

const Login = (props) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e)=>{
        if(e.target.name === "uName"){
            setUserName(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        props.logIn()
    }

    return(
    <div>
        <div>{props.loggedIn ? "Logged in" : "not logged in"}</div>
        <form>
            <label>User Name
                <input id="uName" type="text" name="uName" onChange={handleInputChange}></input>
            </label>
            <label>password
                <input id="password" type="password" name="uName" onChange={handleInputChange}></input>
            </label>
            <input type="submit" onClick={handleSubmit}></input>
        </form>
    </div>
    )
}

export default Login;