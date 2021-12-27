import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';

const Chart = (props) =>{

    const [marketName, setMarketName] = useState("");
    const [change, setChange] = useState(0);
    const [changePct, setChangePct] = useState(0);
    const [prevClose, setPrevClose] = useState(0);
    const [marketPrice, setMarketPrice] = useState(0);
    const [marketTime, setMarketTime] = useState(0);

    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Market</th>
                    <th>Change</th>
                    <th>Percent Change</th>
                    <th>Previous Close</th>
                    <th>Market Price</th>
                    <th>Market Time</th>
                </tr>
            </thead>
            <tbody>
              {props.marketData.map((market,index)=>(
                  <tr key={index}>
                      <td>{market.fullExchangeName}</td>
                      <td>{market.regularMarketChange.raw}</td>
                      <td>{market.regularMarketChangePercent.raw}</td>
                      <td>{market.regularMarketPreviousClose.raw}</td>
                      <td>{market.regularMarketPrice.raw}</td>
                      <td>{market.regularMarketTime.raw}</td>
                  </tr>
              ))}
            </tbody>
            </Table>
    )
}

export default Chart;