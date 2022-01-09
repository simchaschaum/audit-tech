import { useState, useEffect } from "react";
import Chart from "./table";
import sample from "./sampleResponse";
import { Spinner } from "react-bootstrap";

const MarketsList = (props)=>{

    useEffect(()=>getInfo(),[])
    const [marketData, setMarketData] = useState();
    // const [marketData, setMarketData] = useState(sample.marketSummaryResponse.result);

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
            props.setTime(time);
        }
    }

    return(
        <div>
            {marketData ? <Chart 
                marketData={marketData} 
                refreshData={getInfo}
                /> : 
                <div id="spinner">
                    <Spinner animation="border" role="status" variant="secondary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                }
        </div>
    )
}

export default MarketsList;