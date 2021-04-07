import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import face0 from "../assets/img/faces/face-0.jpg"
import { Row, Form, Col, Modal, Button } from 'react-bootstrap';
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import StarRating from 'react-star-rating'

import {username} from "./LoginSignUp";
import { client } from './Jumbotron';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    //TODO need to add date as an additional field
    // var rideToEdit=JSON.parse(props.location.state)
    this.state = {
      isOpen: false,
      zoneData:[],
      serviceResponse: "N/A", 
      // rideId: rideToEdit.uniqueKey,
      // form:{
      //   isToggleOn: true,
      //   pickupZone: parseInt(rideToEdit.rideDetails.pl),
      //   dropoffZone: parseInt(rideToEdit.rideDetails.dl),
      //   numOfPassengers: parseInt(rideToEdit.rideDetails.numOfPassengers),
      //   taxiType: rideToEdit.rideDetails.taxiType,
      //   multiDestinationRide: (rideToEdit.rideDetails.multiDestinationRide==='1'),
      //   taxiRideExperience: parseInt(rideToEdit.rideDetails.taxiRideExperience),
      //   exposeRideToPublic: (rideToEdit.rideDetails.exposeRideToPublic==='1'),
      //   totalRideAmount: rideToEdit.rideDetails.totalRideAmount,
      //   tipAmount: rideToEdit.rideDetails.tipAmount,
      //   totalRideTime: rideToEdit.rideDetails.totalRideTime
      }
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  // state = {
  //   isOpen: false
  // };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  handleClick(e) {
    e.preventDefault();
    var inputObj = {
      "function":"editUserRide",
      "rideId": this.state.rideId,
      "pl": this.state.form.pickupZone,
      "dl": this.state.form.dropoffZone,
      "numOfPassengers": this.state.form.numOfPassengers,
      "taxiType": this.state.form.taxiType,
      "multiDestinationRide": this.state.form.multiDestinationRide,
      "taxiRideExperience": this.state.form.taxiRideExperience,
      "exposeRideToPublic": this.state.form.exposeRideToPublic,
      "totalRideAmount": this.state.form.totalRideAmount,
      "tipAmount": this.state.form.tipAmount,
      "totalRideTime": this.state.form.totalRideTime,
      "userName":"vvanka2@illinois.edu"
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
  	// let zones=this.state.zoneData;

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
      if(result.function=="editUserRide"){
        if(result.result=="OK"){
            //print success
            toast("Successfully updated ride");
            // this.state.serviceResponse="Successfully added ride";
        }
        else{
            //print unccessful message
            toast("Failed to update ride");
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
    // const { form:tipAmount } = this.state;

    const notify = () => toast(this.state.serviceResponse);  
    return (
      <div className="content"> 
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="card card-user">
                <div className="card-image">
                  <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..." />
                </div>
                <div className="card-body">
                  <div className="author">
                    <Link to='/'>
                      <img className="avatar border-gray" src={face0} alt="..." />
                      <h5 className="title">this.firstName + this.lastName</h5>
                    </Link>
                    <p className="description">
                      {username}
                    </p>
                  </div>
                </div>
                <hr /> 
              </div>
            </div>
            <div className="col-md">
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    <Link className="btn btn-primary yellow-btn" id='jumbo-button' to='/adduserride'>
                      <b>Add Ride</b>
                    </Link>
                    <Link className="btn btn-primary ml-4 yellow-btn" id='jumbo-button' to='/query'>
                      <b>Search Rides</b>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    <div className="row ml-4">
                      <h4 className="general-font">User Uploaded Rides</h4>
                    </div>
                    
                    <hr></hr>
                    <div className="row ml-4">
                    <Form >
                      {['checkbox', 'radio'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <Form.Check 
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                          />

                          <Form.Check
                            disabled
                            type={type}
                            label={`disabled ${type}`}
                            id={`disabled-default-${type}`}
                          />
                        </div>
                      ))}
                    <Link className="btn btn-primary yellow-btn"  onClick={this.openModal}>
                      <b>Update Selected Ride</b>
                    </Link>
                    </Form>
                    {/* <Modal show={this.state.isOpen} onHide={this.closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Ride From: this.ridefrom to this.rideto</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form id="query-selection" onSubmit={this.handleClick}>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="pickupZone">Pickup Zone:</label>
                                <Select id="pickupZone" onChange = {(e)=> this.handleChange(e,'pickupZone')} options={zoneOptions.filter(({value}) => value === this.state.form.pickupZone)} />                             
                            </div>
                            <div className="col-md-6 text-center">
                                <label for="dropoffZone">Dropoff Zone:</label>
                                <Select id="dropoffZone" onChange = {(e)=> this.handleChange(e,'dropoffZone')} options={zoneOptions} value={zoneOptions.filter(({value}) => value === this.state.form.dropoffZone)} /> 
                            </div>
                          </div>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-6 text-center">
                                  <label for="numOfPassengers">Number of Passengers</label>
                                  <Select id="numOfPassengers" onChange = {(e)=> this.handleChange(e,'numOfPassengers')} options={numOfPassengers} value={numOfPassengers.filter(({value}) => value === this.state.form.numOfPassengers)}  />
                              </div>
                              <div className="col-md-6 text-center">
                                  <label for="taxiType">Taxi Type</label>
                                  <Select id="taxiType" onChange = {(e)=> this.handleChange(e,'taxiType')} options={taxiType} value={taxiType.filter(({value}) => value === this.state.form.taxiType)} />   
                              </div>
                          </div>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-6 text-center">
                                  <label for="multiDestinationRide">Multi Destination Ride</label>
                                  <Select id="multiDestinationRide" onChange = {(e)=> this.handleChange(e,'multiDestinationRide')} options={multiDestinationRide} value={multiDestinationRide.filter(({value}) => value === this.state.form.multiDestinationRide)} />
                              </div>
                              <div className="col-md-6 text-center">
                                  <label for="taxiRideExperience">Ride Experience</label>
                                  <Select id="taxiRideExperience" onChange = {(e)=> this.handleChange(e,'taxiRideExperience')} options={taxiRideExperience} value={taxiRideExperience.filter(({value}) => value === this.state.form.taxiRideExperience)} />
                              </div>
                          </div>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-6 text-center">
                                  <label for="exposeRideToPublic">Expose Ride To Public</label>
                                  <Select id="exposeRideToPublic" onChange = {(e)=> this.handleChange(e,'exposeRideToPublic')} options={exposeRideToPublic} value={exposeRideToPublic.filter(({value}) => value === this.state.form.exposeRideToPublic)} />
                              </div>
                          </div>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-3 text-center">
                                <label for="tipAmount">Tip Amount</label>
                                <input type="text" id="tipAmount" size="10" placeholder="$"  onChange = {(e)=> this.handleChange(e,'tipAmount')} defaultValue={this.state.form.tipAmount}></input>
                              </div>
                              <div className="col-md-3 text-center">
                                <label for="totalRideAmount">Total Ride Amount</label>
                                <input type="text" id="totalRideAmount" size="10" placeholder="$"  onChange = {(e)=> this.handleChange(e,'totalRideAmount')} defaultValue={this.state.form.totalRideAmount} ></input>
                              </div>
                              <div className="col-md-3 text-center">
                                  <label for="totalRideTime">Total Ride Time</label>
                                  <input type="text" id="totalRideTime" size="10"  onChange = {(e)=> this.handleChange(e,'totalRideTime')} defaultValue={this.state.form.totalRideTime} ></input>
                              </div>
                          </div>
                          <div className="form-row py-3 justify-content-center">
                              <button id="query-submit" type="submit">Update Ride</button>   
                          </div>
                        </form>
                        <div>
                          <button onClick={notify}>Notify</button>
                          <ToastContainer />
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal> */}
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile