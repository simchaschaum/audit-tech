import './App.css';
import Login from './login';
import MarketsList  from './marketsList';
import {useState} from "react";

function App() {
  const [loggedIn,setLoggedIn] = useState(false);

  const toggleLogIn = ()=>{
    let tf = loggedIn ? false : true;
    setLoggedIn(tf);
  }
  
  return (
    <div className="App">
      <h1>Welcome!</h1>
      {loggedIn ? "Logged In!" : "Logged Out!"}
      {!loggedIn ?           
          <Login 
            loggedIn={loggedIn}
            logIn={toggleLogIn}
          />
          : 
          <MarketsList 
            logOut={toggleLogIn}
          />
        }

    </div>
  );
}

export default App;
