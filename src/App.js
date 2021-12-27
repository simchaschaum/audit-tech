import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './login';
import MarketsList  from './marketsList';
import {useState} from "react";

function App() {
  const [loggedIn,setLoggedIn] = useState(false);

  const toggleLogIn = ()=>{
    let tf = loggedIn ? false : true;
    console.log(tf)
    setLoggedIn(tf);
  }
  
  return (
    <div className="App">
      <h1>Welcome!</h1>
      <Routes>
        <Route path="/" element={
          <Login 
            loggedIn={loggedIn}
            logIn={toggleLogIn}
          />
        }/>
        <Route path="marketslist" element={<MarketsList />}/>
      </Routes>
    </div>
  );
}

export default App;
