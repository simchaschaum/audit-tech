import './App.css';
import Login from './login';
import MarketsList  from './marketsList';
import User from './user';
import Loading from './loading';
import {useState, useEffect, createContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';
// import sample from "./sampleResponse";

export const MarketDataContext = createContext();

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [updateTime, setUpdateTime] = useState("");
  const [marketData, setMarketData] = useState();
  // const [marketData, setMarketData] = useState(sample.marketSummaryResponse.result);

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
  
  useEffect(()=>getInfo(),[])

  const getInfo = async ()=>{
    let url = 'https://yfapi.net/v6/finance/quote/marketSummary?lang=en&region=US&';
    let config = 
    {
        "method": "GET",
        "headers": {
            "x-api-key": "ZweTUJui0F3XvMyz8CmJgaLzCKxRxA7l3r0A9EWg"
        }
    }
    const response = await fetch(url, config);
    if(!response.ok){
        let message = `Sorry! An error has occured. ${response.status}`;
        throw new Error(message);
    } else {
        const data = await response.json();
        let arr = data.marketSummaryResponse.result;
        setMarketData(arr);
        let date = new Date();
        let time = date.toLocaleTimeString();
        setUpdateTime(time);
    }
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
                  <Button variant="secondary" onClick={getInfo}>Update</Button>
                  <p>Last Updated: {updateTime}</p>
                </div>
                <MarketDataContext.Provider value={{marketData}}>
                  <MarketsList 
                    setTime={(str)=>setUpdateTime(str)}
                  />
                </MarketDataContext.Provider>
              </div>
            }
      </div>
     </div>
  );
}

export default App;
