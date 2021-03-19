import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Select from 'react-select'

const client = new W3CWebSocket('ws://localhost:1234');

class AddUserRide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoneData: [],
      form:{
        isToggleOn: true,
        pickupZone: 0,
        dropoffZone: 0,
        numOfPassengers: 1,
        taxiType: 0,
        multiDestinationRide: 0,
        taxiRideExperience: 0,
        exposeRideToPublic: 0,
        totalRideAmount: 0,
        tipAmount: 0,
        driverName: 0,
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
      "taxiType": this.state.form.taxiType
      };
    client.send(JSON.stringify(inputObj));
  }

  handleChange = (e,field) => {
    let currState = this.state.form;
    currState[field] = e.value;
    this.setState({ form:currState });
  }

  async componentWillMount() {
    const url = "http://172.22.152.9:8000/api/nygm/?format=json"
    const response = await fetch(url);
    const zones = await response.json();
    this.setState(state=> ({
        zoneData: zones,
    }))
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
    const { form:pickupZone } = this.state;
    const { form:dropoffZone } = this.state;

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
                                <label for="pickup">Number of Passengers</label>
                                <Select id="pickup" onChange = {(e)=> this.handleChange(e,'numOfPassengers')} options={numOfPassengers} />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="dropoff">Taxi Type</label>
                                <Select id="dropoff" onChange = {(e)=> this.handleChange(e,'taxiType')} options={taxiType} />                      
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="pickup">multiDestinationRide</label>
                                <Select id="pickup" onChange = {(e)=> this.handleChange(e,'numOfPassengers')} options={numOfPassengers} />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="dropoff">Taxi Type</label>
                                <Select id="dropoff" onChange = {(e)=> this.handleChange(e,'taxiType')} options={taxiType} />                      
                            </div>
                        </div>
                       
                    <div className="form-row py-3 justify-content-center">
                        <button id="query-submit" type="submit">Add Ride</button>   
                    </div>
                    </form>
                </div>
            </div>   
        </div>
    )
  }
}

export default AddUserRide