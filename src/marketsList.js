import Chart from "./table";
import { Spinner } from "react-bootstrap";
import { useContext } from "react";
import {MarketDataContext} from "./App";

const MarketsList = (props)=>{

    const {marketData} = useContext(MarketDataContext);

        return(
        <div>
            {marketData ? <Chart /> : 
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