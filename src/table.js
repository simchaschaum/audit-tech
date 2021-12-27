import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';



const Chart = (props) =>{

    const [rowData, setRowData] = useState();
    const [show,setShow] = useState(false);

    const handleClick = (num) => {
        setRowData(props.marketData[num]);
        // console.log(props.marketData[num]);
        console.log(rowData);
        handleShow();
    }

    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);

    return(
        <div>
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
                    <tr key={index} onClick={()=>handleClick(index)}>
                        <td>{market.fullExchangeName}</td>
                        <td>{market.regularMarketChange.fmt}</td>
                        <td>{market.regularMarketChangePercent.fmt}</td>
                        <td>{market.regularMarketPreviousClose.fmt}</td>
                        <td>{market.regularMarketPrice.fmt}</td>
                        <td>{market.regularMarketTime.fmt}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{rowData.fullExchangeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Market Short Name: {rowData.shortName}</p>
                    <p>Market Time: {rowData.regularMarketTime.fmt}</p>
                    <p>Change Percent: {rowData.regularMarketChangePercent.fmt}</p>
                    <p>Market Change: {rowData.regularMarketChange.fmt}</p>
                    <p>Quote Type: {rowData.quoteType}</p>
                    <p>Exchange Data Delayed By: {rowData.exchangeDataDelayedBy}</p>
                    <p>Previous Close: {rowData.regularMarketPreviousClose.fmt}</p>
                    <p>Market Price: {rowData.regularMarketPrice.fmt}</p>
                    <p>Source Interval: {rowData.sourceInterval}</p>                
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Chart;