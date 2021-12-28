import './App.css';
import Login from './login';
import MarketsList  from './marketsList';
import User from './user';
import {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [updateTime, setUpdateTime] = useState("");

  const { user, isAuthenticated, isLoading } = useAuth0();
    
  useEffect(()=>{
      if(isAuthenticated){
          setLoggedIn(true);
          setUserInfo(user);
      } else {
          setLoggedIn(false)
      }
  },[isAuthenticated, user])

  const toggleLogIn = (tf)=>{
    setLoggedIn(tf);
  }
  
  const setTime = (str) => {
    setUpdateTime(str)
  }

  return (
    <div className="App">
      <header>
        {loggedIn ? <User user={userInfo} loggedIn={loggedIn}/> : null}
      </header>
      <div id='content'>
      <h1>Market Report</h1>
      <div id="updated">
        <Button variant="secondary">Update</Button>
        <p>Last Updated: {updateTime}</p>
      </div>
        {!loggedIn ?           
            <Login 
              loggedIn={loggedIn}
              logIn={(tf)=>toggleLogIn(tf)}
            />
            : 
            <div>
              <MarketsList setTime={(str)=>setTime(str)}/>
            </div>
          }
      </div>
     </div>
  );
}

export default App;
