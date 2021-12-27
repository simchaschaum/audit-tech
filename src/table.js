import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';



const Chart = (props) =>{

    const [rowData, setRowData] = useState();
    const [show,setShow] = useState(false);

    const handleClick = (num) => {
        setRowData(props.marketData[num].exchange);
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
                        <td>{market.regularMarketChange.raw}</td>
                        <td>{market.regularMarketChangePercent.raw}</td>
                        <td>{market.regularMarketPreviousClose.raw}</td>
                        <td>{market.regularMarketPrice.raw}</td>
                        <td>{market.regularMarketTime.fmt}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            </Modal>
        </div>
    )
}

export default Chart;