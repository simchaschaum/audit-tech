import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const Chart = (props) =>{

    const [rowData, setRowData] = useState(props.marketData[0]);
    const [show,setShow] = useState(false);
    let fa = [
        {name: "fullExchangeName",
        filter: ""},
        {name: "regularMarketChange",
        filter: {low: "", hi: ""}},
        {name: "regularMarketChangePercent",
        filter: {low: "", hi: ""}},
        {name: "regularMarketPreviousClose",
        filter: {low: "", hi: ""}},
        {name: "regularMarketPrice",
        filter: {low: "", hi: ""}},
        {name: "regularMarketTime",
        filter: {low: "", hi: ""}},
    ]
    const [filter, setFilter] = useState(fa);
    const [filteredArr, setFilteredArr] = useState(props.marketData)

    useEffect(()=>{
        // if filter is empty, revert to full list, from props; 
        let filterEmpty = true;
        filter.forEach((item,index)=>{
            if(index === 0){
                if(item.filter!==""){
                    filterEmpty = false;
                }
            } else {
                if(item.filter.low !=="" || item.filter.hi !==""){
                    filterEmpty = false
                }
            }
        }
        );
        if(filterEmpty){
            setFilteredArr(props.marketData)
        } 
    },[props.marketData, filter])

    const handleClick = (num) => {
        setRowData(props.marketData[num]);
        handleShow();
    }

    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);

    const handleFilterChange = (e) => {
        let filterCr = e.target.name;
        let fa = filter;
        if(filterCr==="0"){
            fa[filterCr].filter = e.target.value;
            setFilter([...fa]);
        } else {
            let hilow; 
            let num = parseInt(filterCr.match(/\d/));
            if(filterCr.indexOf("hi")>-1){
                hilow = "hi"
            } else {
                hilow = "low"
            };
            fa[num].filter[hilow] = e.target.value;
            setFilter([...fa]);
        }      
        handleFilter();
    }

    const handleFilter = () => {
        let arr = [];
        props.marketData.forEach((dataItem, dataIndex) => {
            let tf = true; 
            filter.forEach((filterItem, filterIndex)=>{
                if(filterIndex === 0){
                    if(dataItem[filterItem.name].toUpperCase().indexOf(filterItem.filter.toUpperCase()) === -1){
                        tf = false;
                    };
                } 
                else if (filterIndex < filter.length-1){
                    if(filterItem.filter.low && parseInt(dataItem[filterItem.name].raw) < parseInt(filterItem.filter.low)){
                        tf = false;
                    } else if(filterItem.filter.hi && parseInt(dataItem[filterItem.name].raw) > parseInt(filterItem.filter.hi)){
                        tf = false;
                    }
                } else {
                    let lowDate = new Date(filterItem.filter.low).getTime();
                    let hiDate = new Date(filterItem.filter.hi).getTime();
                    let testDate = dataItem.regularMarketTime.raw*1000;
                    if(lowDate && testDate < lowDate){
                        tf = false;
                    } else if (hiDate && testDate > hiDate){
                        tf = false;
                    }
                }
            });
            if(tf){
                arr.push(dataItem);
            }
        })
        setFilteredArr([...arr]);
    }

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
                <tr>
                    <td><input name={0} type="text" placeholder="search" onChange={(e)=>handleFilterChange(e)}></input></td>
                        {filter.map((item, index) => (index > 0 && index < filter.length-1) && <td key={`td-${index}`}><div className='filter-inputs'><input key={`fl-${index}`} name={`low-${index}`} placeholder="low" className="filter" type="number" onChange={(e)=>handleFilterChange(e)}></input>
                        <input key={`fh-${index}`} name={`hi-${index}`} placeholder="high" className="filter" type="number" onChange={(e)=>handleFilterChange(e)}></input></div></td>)}
                    <td><div className='filter-inputs'><input className='filter-date' name={`low-${filter.length-1}`} type="date" placeholder="search" onChange={(e)=>handleFilterChange(e)}></input>
                    <input  className='filter-date' name={`hi-${filter.length-1}`} type="date" placeholder="search" onChange={(e)=>handleFilterChange(e)}></input></div></td>
                </tr>
                {filteredArr.map((market,index)=>(
                    <tr key={`fa-${index}`} onClick={()=>handleClick(index)}>
                        <td>{market.fullExchangeName}</td>
                        <td>{market.regularMarketChange.raw.toFixed(2)}</td>
                        <td>{market.regularMarketChangePercent.raw.toFixed(2)}%</td>
                        <td>${market.regularMarketPreviousClose.raw.toFixed(2)}</td>
                        <td>${market.regularMarketPrice.raw.toFixed(2)}</td>
                        <td>{new Date(market.regularMarketTime.raw*1000).toDateString()}</td>
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
                    <p>Market Price: ${rowData.regularMarketPrice.fmt}</p>
                    <p>Source Interval: {rowData.sourceInterval} Seconds</p>                
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Chart;

