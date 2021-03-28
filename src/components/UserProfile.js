import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import face0 from "../assets/img/faces/face-0.jpg"
import { Row, Form, Col, Modal, Button } from 'react-bootstrap';
import Select from 'react-select'

class UserProfile extends Component {
  state = {
    isOpen: false
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  render() {
  
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
                      this.username
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
                    <Modal show={this.state.isOpen} onHide={this.closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Ride From: this.ridefrom to this.rideto</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form id="query-selection" onSubmit={this.handleClick}>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-6 text-center">
                                  <label for="pickup">Pickup Zone:</label>
                                  {/* <Select id="pickup" onChange = {(e)=> this.handleChange(e,'pickup')} options={zoneOptions} /> */}
                                  <Select></Select>
                              </div>
                              <div className="col-md-6 text-center">
                                  <label for="dropoff">Dropoff Zone:</label>
                                  {/* <Select id="dropoff" onChange = {(e)=> this.handleChange(e,'dropoff')} options={zoneOptions} />                       */}
                                  <Select></Select>
                              </div>
                          </div>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-6 text-center">
                                  <label for="numOfPassengers">Number of Passengers</label>
                                  {/* <Select id="numOfPassengers" onChange = {(e)=> this.handleChange(e,'numOfPassengers')} options={numOfPassengers} /> */}
                                  <Select></Select>
                              </div>
                              <div className="col-md-6 text-center">
                                  <label for="taxiType">Taxi Type</label>
                                  <Select></Select>
                                  {/* <Select id="taxiType" onChange = {(e)=> this.handleChange(e,'taxiType')} options={taxiType} />                       */}
                              </div>
                          </div>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-6 text-center">
                                  <label for="multiDestinationRide">Multi Destination Ride</label>
                                  <Select></Select>
                                  {/* <Select id="multiDestinationRide" onChange = {(e)=> this.handleChange(e,'multiDestinationRide')} options={multiDestinationRide} /> */}
                              </div>
                              <div className="col-md-6 text-center">
                                  <label for="taxiRideExperience">Ride Experience</label>
                                  {/* <Select id="taxiRideExperience" onChange = {(e)=> this.handleChange(e,'taxiRideExperience')} options={taxiRideExperience} /> */}
                                  <Select></Select>
                              </div>
                          </div>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-6 text-center">
                                  <label for="exposeRideToPublic">Expose Ride To Public</label>
                                  {/* <Select id="exposeRideToPublic" onChange = {(e)=> this.handleChange(e,'exposeRideToPublic')} options={exposeRideToPublic} /> */}
                                  <Select></Select>
                              </div>
                          </div>
                          <div className = "form-row justify-content-center">
                              <div className="col-md-3 text-center">
                                  <label for="tipAmount">Tip Amount</label>
                                  <input size="10"></input>
                                  {/* <input type="text" id="tipAmount" placeholder="$"  onChange = {(e)=> this.handleChange(e,'tipAmount')} ></input><br></br> */}
                              </div>
                              <div className="col-md-3 text-center">
                                  <label for="totalRideAmount">Total Ride Amount</label>
                                  <input size="10"></input>
                                  {/* <input type="text" id="totalRideAmount" placeholder="$"  onChange = {(e)=> this.handleChange(e,'totalRideAmount')} ></input><br></br> */}
                              </div>
                              <div className="col-md-3 text-center">
                                  <label for="totalRideTime">Total Ride Time</label>
                                  <input size="10"></input>
                                  {/* <input type="text" id="totalRideTime" placeholder="$"  onChange = {(e)=> this.handleChange(e,'totalRideTime')} ></input><br></br> */}
                              </div>
                          </div>
                        
                      <div className="form-row py-3 justify-content-center">
                          <button id="query-submit" type="submit">Update Ride</button>   
                      </div>
                      </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    
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