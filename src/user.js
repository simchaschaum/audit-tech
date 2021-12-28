import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

const User = (props) => {

    const {logout} = useAuth0();

    return(
        <>
         {props.user &&
            <div id="user">  
                <Button variant="secondary" onClick={()=>logout({ returnTo: window.location.origin })}>Log Out</Button>
                <p>Welcome, {props.user.name}!</p>
                <img src={props.user.picture} alt={props.user.name}/>
            </div> 
        }
        </>           
    )
  
    
}

export default User;