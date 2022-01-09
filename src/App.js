import './App.css';
import Login from './login';
import MarketsList  from './marketsList';
import User from './user';
import Loading from './loading';
import {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [updateTime, setUpdateTime] = useState("");

  const { user, isAuthenticated, isLoading } = useAuth0();
  
  // change in authentication status changes state for loading and logged in
  useEffect(()=>{
      if(isLoading){
        setLoading(true);
      } else {
        setLoading(false);
      };
      if(isAuthenticated){
          setLoggedIn(true);
          setUserInfo(user);
      } else {
          setLoggedIn(false)
      }
  },[isAuthenticated, user, isLoading])

  useEffect(()=>{console.log(userInfo)},[userInfo])

  // sets time state for most recent update
  const setTime = (str) => {
    setUpdateTime(str)
  }

  return (
    <div className="App">
      {/* header contains user info */}
      <header>
        {loggedIn ? <User user={userInfo} loggedIn={loggedIn}/> : null}
      </header>
      <div id='content'>
        <h1>Market Report</h1>
          {/* Depending on logged in and loading state, displays either login invitation and button, loading screen, or chart */}
          {!loggedIn && !loading?           
              <Login />
              : loading ? <Loading /> 
                :
              <div>
                <div id="updated">
                  <Button variant="secondary">Update</Button>
                  <p>Last Updated: {updateTime}</p>
                </div>
                <MarketsList setTime={(str)=>setTime(str)}/>
              </div>
            }
      </div>
     </div>
  );
}

export default App;
