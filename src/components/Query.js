import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:1234');


class Query extends Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true, averageTotalAmount:"0",averageMtaAmount:"0",averageTipAmount:"0",averageFareAmount:"0"};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
      var result=JSON.parse(message.data).data;
        this.setState(state => ({
          averageTotalAmount: result.totalAmount,
          averageMtaAmount: result.mtaTax,
          averageTipAmount: result.tipAmount,
          averageFareAmount: result.fareAmount
        }));
      // response=JSON.stringify(message);
        // this.setState(state => ({
        //   wsResponse: message
        // }));
    };
  }

  handleClick(e) {
    e.preventDefault();
    console.log("stan");
    console.log(e);
    // var inputObj = {
    //     "function":"getTaxiData",
    //     "maxCount":"10",
    //     "fields":["pickup","dropoff"]
    // };
    var inputObj = {"function":"getUserEstimatedFare","pl":e.target.pickup.value,"dl":e.target.dropoff.value}
    client.send(JSON.stringify(inputObj));

  }
  render() {
    return (
    <div>
      <form onSubmit={this.handleClick}>
        <p>pickup</p>
        <input type="text" size="6" id="pickup" name="pickup" placeholder="Enter here"></input>
        <p>dropoff</p>
        <input type="text" size="6" id="dropoff" name="dropoff" placeholder="Enter here"></input>
        <button id="query-submit" type="submit">Get my estimate</button>
      </form>
      <label>Average Total Amount: ${this.state.averageTotalAmount}</label><br></br>
      <label>Average MTA Amount: ${this.state.averageMtaAmount}</label><br></br>
      <label>Average Tip Amount: ${this.state.averageTipAmount}</label><br></br>
      <label>Average Fare Amount: ${this.state.averageFareAmount}</label>
      </div>
        // <div>
        //     <textarea id="txtInput" placeholder="q)"></textarea>
        //     <button id="cmdInput" onClick={this.handleClick} >Go</button>
        //     <div id="txtOutput"></div>
        //     <h4 className="display-4 page-header">Get your rate estimate by entering your information below</h4> 
        //     <div className="card" id="query-card">
        //         <div className="card-body">
        //             <form id="query-selection">
        //                 <div className = "form-row justify-content-center">
        //                     <div className="col-md-3 text-center">
        //                         <label for="pickup">Pickup Zipcode:</label>
        //                         <input type="text" size="6" id="pickup" name="pickup" placeholder="Enter here"></input>
        //                     </div>
        //                     <div className="col-md-3 text-center">
        //                         <label for="dropoff">Dropoff Zipcode:</label>
        //                         <input type="text" size="6" id="dropoff" name="dropoff" placeholder="Enter here"></input>                        
        //                     </div>
        //                     <div className="col-md-4 text-center">
        //                         <label for="month">Select Month of Travel:</label>
        //                         <select class="form-select" length="2" id="month" name="month">
        //                             <option value="Jan">January</option>
        //                             <option value="Feb">February</option>
        //                             <option value="March">March</option>
        //                             <option value="April">April</option>
        //                             <option value="May">May</option>
        //                             <option value="June">June</option>
        //                             <option value="July">July</option>
        //                             <option value="August">August</option>
        //                             <option value="September">September</option>
        //                             <option value="October">October</option>
        //                             <option value="November">November</option>
        //                             <option value="December">December</option>
        //                         </select>  
        //                     </div>
        //                 </div>
                       
        //             <div className="form-row py-3 justify-content-center">
        //                 <button id="query-submit" type="submit" onClick={this.handleClick}>Get my estimate</button>   
        //             </div>
        //             </form>
        //         </div>
        //     </div>    
        // </div>
       
        
    )
  }
}

export default Query