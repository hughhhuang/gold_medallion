import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Select from 'react-select'

// ws://127.0.0.1:1234
const client = new W3CWebSocket('ws://sp21-cs411-09.cs.illinois.edu:1234');


class Query extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isToggleOn: true, 
        averageTotalAmount:"0",
        averageMtaAmount:"0",
        averageTipAmount:"0",
        averageFareAmount:"0",
        zoneData: [],
        pickupZone: 0,
        dropoffZone: 0,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);

  }
async componentWillMount() {
    const url = "http://172.22.152.9:8000/api/nygm/?format=json"
    const response = await fetch(url);
    const zones = await response.json();
    this.setState(state=> ({
        zoneData: zones,
    }))

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
    var inputObj = {"function":"getUserEstimatedFare","pl": this.state.pickupZone.value.toString(),"dl": this.state.dropoffZone.value.toString()}
    console.log(this.state.pickupZone.value)
    client.send(JSON.stringify(inputObj));
  }

  handleChangePO = (pickupZone) => {
    this.setState({ pickupZone });
    console.log(`Option selected:`, pickupZone);
  }

  handleChangeDO = (dropoffZone) => {
    this.setState({ dropoffZone });
    console.log(`Option selected:`, dropoffZone);
  }

  render() {
    let zones = this.state.zoneData;
    let zoneOptions = [
        {}
    ]
    zones.map((zone) =>
        zoneOptions.push({
            value : zone.zoneid,
            label : zone.zonename
        })
        // { value: zone.zoneid,}
        // <option key={zone.zoneid} value={zone.zoneid}> {zone.zonename} </option>
    );  
    const { pickupZone } = this.state;
    const { dropoffZone } = this.state;

    return (
    // <div>
    //   <form onSubmit={this.handleClick}>
    //     <p>pickup</p>
    //     <input type="text" size="6" id="pickup" name="pickup" placeholder="Enter here"></input>
    //     <p>dropoff</p>
    //     <input type="text" size="6" id="dropoff" name="dropoff" placeholder="Enter here"></input>
    //     <button id="query-submit" type="submit">Get my estimate</button>
    //   </form>
    //   <label>Average Total Amount: ${this.state.averageTotalAmount}</label><br></br>
    //   <label>Average MTA Amount: ${this.state.averageMtaAmount}</label><br></br>
    //   <label>Average Tip Amount: ${this.state.averageTipAmount}</label><br></br>
    //   <label>Average Fare Amount: ${this.state.averageFareAmount}</label>
    //   </div>
        <div id="query-body">
          
            <div className="card" id="query-card">
                <div className="card-body">
                    <form id="query-selection" onSubmit={this.handleClick}>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="pickup">Pickup Zone:</label>
                                <Select id="pickup" onChange = {this.handleChangePO} options={zoneOptions} />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="dropoff">Dropoff Zone:</label>
                                <Select id="dropoff" onChange = {this.handleChangeDO} options={zoneOptions} />                      
                            </div>
                            {/* <div className="col-md-4 text-center">
                                <label for="month">Select Month of Travel:</label>
                                <select class="form-select" length="2" id="month" name="month">
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>  
                            </div> */}
                        </div>
                       
                    <div className="form-row py-3 justify-content-center">
                        <button id="query-submit" type="submit">Get my estimate</button>   
                    </div>
                    </form>
                </div>
            </div>   
            <div className="row justify-content-center">
                <div className="card" id="calc-card">
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col">
                                <h6>Average Total Amount: ${this.state.averageTotalAmount}</h6><br></br>
                                <h6>Average MTA Amount: ${this.state.averageMtaAmount}</h6><br></br>
                                <h6>Average Tip Amount: ${this.state.averageTipAmount}</h6><br></br>
                                <h6>Average Fare Amount: ${this.state.averageFareAmount}</h6>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>

        </div>
       
        
    )
  }
}

export default Query
