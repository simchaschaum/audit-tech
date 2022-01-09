import Chart from "./table";
import { Spinner } from "react-bootstrap";

const MarketsList = (props)=>{

        return(
        <div>
            {props.marketData ? <Chart 
                marketData={props.marketData} 
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