import { useState, useEffect } from "react";
import sample from "./sampleResponse";
import Chart from "./table";

const MarketsList = (props)=>{

    const [marketData, setMarketData] = useState(sample.marketSummaryResponse.result);

    useEffect(()=>{
        let arr = sample.marketSummaryResponse.result;
            setMarketData(arr);
        },[])

    const getInfo = async ()=>{
        let url = 'https://randomuser.me/api/';
        const response = await fetch(url);
        if(!response.ok){
            let message = `Sorry! An error has occured. ${response.status}`;
            throw new Error(message)
        } else {
            const data = await response.json();
        }
    }

    return(
        <div>
            <button onClick={props.logOut}>Log Out</button>
            <button onClick={getInfo}>Click me</button>
            <Chart 
                marketData={marketData}
            />

        </div>
    )
}

export default MarketsList;