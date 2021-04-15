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
      firstname: ' ',
      lastname: ' ',
      age: 0,
      prefride: ' ',
      vaccine: ' ',
      zoneid: ' ',
      zipcode: ' ',
      favzoneid: ' '
    }
     
    this.handleClick = this.handleClick.bind(this);
  }


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
      "userName":username
      };
    client.send(JSON.stringify(inputObj));
  }


  async componentWillMount() {

    const url = "http://172.22.152.9:8000/api/usertable/?format=json";
    const response = await fetch(url);
    const user = await response.json();
    if (user.username === username){
      this.setState(state=> ({
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        prefride: user.prefride,
        vaccine: user.vaccine,
        zoneid: user.zoneid,
        zipcode: user.zipcode,
        favzoneid: user.favzoneid
      }))
    }


    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
      var result=JSON.parse(message.data);
    };
  }

  render() {

    return (
      <div className="content"> 
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-align-center">
              <div className="card card-user">
                <div className="card-image">
                  <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..." />
                </div>
                <div className="card-body">
                  <div className="author">
                      <img className="avatar border-gray" src={face0} alt="..." />
                      <h3 className="general-font">{this.firstname} {this.lastname}</h3>
                    <h5>
                      <b>{username}</b>
                    </h5>
                    <h5 className="mt-5"><u>View My Information</u></h5>
                    <div className="row">
                      <div className="col">
                        <table>
                          <tr>
                            <td className="tr">
                              <h5>Age:</h5>
                            </td>
                            <td>
                              <h5>{this.age}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Preferred Ride:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.prefride}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Vaccine Status:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.vaccine}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Home Zone:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.zoneid}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Home Zip Code:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.zipcode}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Favorite Zone to Travel To:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.favzoneid}</h5>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <Link className="btn btn-primary yellow-btn">
                          <b>Edit User Information</b>
                        </Link>
                      </div>
                    </div>
                  
                    
                  </div>
                </div>
                <hr /> 
              </div>
            </div>
              
              {/* <div className="row">
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
                    </Form> */}
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
{/*                     
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile