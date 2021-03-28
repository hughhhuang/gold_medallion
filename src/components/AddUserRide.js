import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import StarRating from 'react-star-rating'

const client = new W3CWebSocket('ws://sp21-cs411-09.cs.illinois.edu:1234');

class AddUserRide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoneData: [],
      serviceResponse: "N/A",
      form:{
        isToggleOn: true,
        pickupZone: 0,
        dropoffZone: 0,
        numOfPassengers: 1,
        taxiType: 0,
        multiDestinationRide: 0,
        taxiRideExperience: 0,
        exposeRideToPublic: false,
        totalRideAmount: 0,
        tipAmount: 0,
        totalRideTime: 0
      }
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    var inputObj = {
      "function":"addUserRide",
      "pl": this.state.form.pickupZone.toString(),
      "dl": this.state.form.dropoffZone.toString(),
      "numOfPassengers": this.state.form.numOfPassengers,
      "taxiType": this.state.form.taxiType,
      "multiDestinationRide": this.state.form.multiDestinationRide,
      "taxiRideExperience": this.state.form.taxiRideExperience,
      "exposeRideToPublic": this.state.form.exposeRideToPublic,
      "totalRideAmount": this.state.form.totalRideAmount,
      "tipAmount": this.state.form.tipAmount,
      "totalRideTime": this.state.form.totalRideTime
      };
    client.send(JSON.stringify(inputObj));
  }

  handleChange = (e,field) => {
    let currState = this.state.form;
    if(field=="tipAmount" || field=="totalRideAmount" || field=="totalRideTime"){
        currState[field] = e.target.value;
    }
    else{
        currState[field] = e.value;
    }
    this.setState({ form:currState });
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
      var result=JSON.parse(message.data);
      if(result.function=="addUserRide"){
        if(result.result=="OK"){
            //print success
            toast("Successfully added ride");
            // this.state.serviceResponse="Successfully added ride";
        }
        else{
            //print unccessful message
            toast("Failed to add ride");
            // this.state.serviceResponse="Failed to add ride";
        }
      }
    };
  }
  render() {
    // Creating zones for the select options
    let zones = this.state.zoneData;
    let zoneOptions = [{}];
    zones.map((zone) =>
        zoneOptions.push({
            value : zone.zoneid,
            label : zone.zonename
        })
    );

    let numOfPassengers = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6}];
    let taxiType = [{value:'Sedan',label:'Sedan'},{value:'SUV',label:'SUV'},{value:'Compact SUV',label:'Compact SUV'}];
    let multiDestinationRide = [{value:true,label:'Yes'},{value:false,label:'No'}];
    let taxiRideExperience = [{value:1,label:'1 Star'},{value:2,label:'2 Stars'},{value:3,label:'3 Stars'},{value:4,label:'4 Stars'},{value:5,label:'5 Stars'}];
    let exposeRideToPublic = [{value:true,label:'Yes'},{value:false,label:'No'}];
    let totalRideTime = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6}];
    let tipAmount = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6}];
    let totalRideAmount = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6}];

    const { form:pickupZone } = this.state;
    const { form:dropoffZone } = this.state;
    const notify = () => toast(this.state.serviceResponse);

    return (
        <div id="query-body">
            <div className="card" id="query-card">
                <div className="card-body">
                    <form id="query-selection" onSubmit={this.handleClick}>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="pickup">Pickup Zone:</label>
                                <Select id="pickup" onChange = {(e)=> this.handleChange(e,'pickup')} options={zoneOptions} />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="dropoff">Dropoff Zone:</label>
                                <Select id="dropoff" onChange = {(e)=> this.handleChange(e,'dropoff')} options={zoneOptions} />                      
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="numOfPassengers">Number of Passengers</label>
                                <Select id="numOfPassengers" onChange = {(e)=> this.handleChange(e,'numOfPassengers')} options={numOfPassengers} />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="taxiType">Taxi Type</label>
                                <Select id="taxiType" onChange = {(e)=> this.handleChange(e,'taxiType')} options={taxiType} />                      
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="multiDestinationRide">Multi Destination Ride</label>
                                <Select id="multiDestinationRide" onChange = {(e)=> this.handleChange(e,'multiDestinationRide')} options={multiDestinationRide} />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="taxiRideExperience">Ride Experience</label>
                                <Select id="taxiRideExperience" onChange = {(e)=> this.handleChange(e,'taxiRideExperience')} options={taxiRideExperience} />
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="exposeRideToPublic">Expose Ride To Public</label>
                                <Select id="exposeRideToPublic" onChange = {(e)=> this.handleChange(e,'exposeRideToPublic')} options={exposeRideToPublic} />
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="tipAmount">Tip Amount</label>
                                <input type="text" id="tipAmount" placeholder="$"  onChange = {(e)=> this.handleChange(e,'tipAmount')} ></input><br></br>
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="totalRideAmount">Total Ride Amount</label>
                                <input type="text" id="totalRideAmount" placeholder="$"  onChange = {(e)=> this.handleChange(e,'totalRideAmount')} ></input><br></br>
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="totalRideTime">Total Ride Time</label>
                                <input type="text" id="totalRideTime" placeholder="$"  onChange = {(e)=> this.handleChange(e,'totalRideTime')} ></input><br></br>
                            </div>
                        </div>
                       
                    <div className="form-row py-3 justify-content-center">
                        <button id="query-submit" type="submit">Add Ride</button>   
                    </div>
                    </form>
                    <div>
                        <button onClick={notify}>Notify</button>
                        <ToastContainer />
                    </div>
                </div>
            </div>   
        </div>
    )
  }
}

export default AddUserRide