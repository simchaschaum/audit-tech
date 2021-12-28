import { useState, useEffect } from "react";
import sample from "./sampleResponse";
import Chart from "./table";
import { useAuth0 } from "@auth0/auth0-react";

const MarketsList = (props)=>{

    const [marketData, setMarketData] = useState(sample.marketSummaryResponse.result);
    const {logout} = useAuth0;

    const getInfo = async ()=>{
        // let url = 'https://randomuser.me/api/';
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
            console.log(arr)
            setMarketData(arr);
        }
    }

    const handleLogOut = ()=>{
        props.logOut();
        logout({ returnTo: window.location.origin })
    }

    // useEffect(()=>getInfo(),[])

    return(
        <div>
            {/* <button onClick={props.logOut}>Log Out</button> */}
            <button onClick={()=>handleLogOut()}>Log Out</button>
            <button onClick={getInfo}>Click me</button>
            <Chart 
                marketData={marketData}
            />

        </div>
    )
}

export default MarketsList;