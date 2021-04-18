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
      username: username,
      firstname: ' ',
      lastname: ' ',
      age: 0,
      prefride: ' ',
      newPrefride: ' ',
      vaccine: ' ',
      homezone: ' ',
      newHomezone: ' ',
      zipcode: 0,
      favzoneid: ' ',
      newFavzoneid: ' ',
      zoneData: []
    }
     
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeFavZone = this.handleChangeFavZone.bind(this);
    this.handleChangeHomeZone = this.handleChangeHomeZone.bind(this);
    this.handleChangePrefRide = this.handleChangePrefRide.bind(this);  
  }


  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  handleClick(e) {
    // Updating the user's information in the user table
    e.preventDefault();
    try{
      const url = "http://172.22.152.9:8000/api/editusertable/";
      const response = fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          firstname: document.getElementById("new-firstname").value,
          lastname: document.getElementById("new-lastname").value,
          age: document.getElementById("new-age").value,
          prefride: this.state.newPrefride.value,
          vaccine: document.getElementById("new-vaccine").value,
          zoneid: this.state.newHomezone.value,
          zipcode: parseInt(document.getElementById("new-zipcode").value),
          favzoneid: this.state.newFavzoneid.value,
          minspend:"null",
          maxspend:"null",
          vaccpref:"null"
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        window.location.href = '/profile';
      })
      .catch(error => {
        if (error.toString() === "SyntaxError: Unexpected token I in JSON at position 0"){
          alert("Please enter a valid NYC zipcode");
        }
        else{
          alert(error.toString())
          console.log(error.toString())
        }
      })  
            
    }
    catch(err){
      alert(err)
      console.log(err)
    }
  }

  handleChangePrefRide = (newPrefride) => {
    this.setState({ newPrefride });
    console.log(`Option selected:`, newPrefride);
  }

  handleChangeHomeZone = (newHomezone) => {
    this.setState({ newHomezone });
    console.log(`Option selected:`, newHomezone);
  }

  handleChangeFavZone = (newFavzoneid) => {
    this.setState({ newFavzoneid });
  }


  async componentWillMount() {

    // Getting data for zones
    const zonesUrl = "http://172.22.152.9:8000/api/nygm/?format=json"
    const zonesRes = await fetch(zonesUrl);
    const zones = await zonesRes.json();
    
    this.setState(state=> ({
        zoneData: zones,
    }))
    console.log(this.state.zoneData);

    // Getting user data from the user table
    const userTableUrl = "http://172.22.152.9:8000/api/usertable/?format=json";
    const userTableRes = await fetch(userTableUrl);
    const user = await userTableRes.json();
    for (var u in user){
      console.log(user[u].username);
      if (user[u].username === this.state.username){
        console.log('ture');
        this.setState(state=> ({
          firstname: user[u].firstname,
          lastname: user[u].lastname,
          age: user[u].age,
          prefride: user[u].prefride,
          vaccine: user[u].vaccine,
          zoneid: this.state.zoneData[user[u].zoneid-1].zonename,
          zipcode: user[u].zipcode,
          favzoneid: this.state.zoneData[user[u].favzoneid-1].zonename
        }))
      }
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

    let taxiType = [{value:'Sedan',label:'Sedan'},{value:'SUV',label:'SUV'},{value:'Compact SUV',label:'Compact SUV'}];
    let vaccineOptions = []
    // Creating zones for the select options
    let zones = this.state.zoneData;
    let zoneOptions = [{}];
    zones.map((zone) =>
        zoneOptions.push({
            value : zone.zoneid,
            label : zone.zonename
        })
    );


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
                      <h3 className="general-font">{this.state.firstname} {this.state.lastname}</h3>
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
                            <td className="tl">
                              <h5>{this.state.age}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Preferred Ride:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.prefride}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Preferred % Vaccinated of Destination Zone:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.vaccine}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Home Zip Code:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.zipcode}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Home Zone:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.zoneid}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Favorite Zone to Travel To:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.favzoneid}</h5>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <Link className="btn btn-primary yellow-btn" onClick={this.openModal}>
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
                    <Modal show={this.state.isOpen} onHide={this.closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Updating User Information for <i><b>{username}</b></i></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form id="query-selection" onSubmit={this.handleClick}>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="new-firstname">First Name</label>
                                <input id="new-firstname" defaultValue={this.state.firstname}></input>
                            </div>
                            <div className="col-md-6 text-center">
                                <label for="new-lastname">Last Name</label>
                                <input id="new-lastname" defaultValue={this.state.lastname}></input>                            
                            </div>
                          </div>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="new-age">Age</label>
                                <input id="new-age" defaultValue={this.state.age}></input>
                            </div>
                            <div className="col-md-6 text-center">
                                <label for="new-zipcode">Home Zip Code</label>
                                <input id="new-zipcode" defaultValue={this.state.zipcode}></input>
                            </div>
                          </div>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="new-vaccine">Preferred % Vaccinated of Destination Zone</label>
                                <input type="text" defaultValue={this.state.vaccine} id="new-vaccine" ></input>
                            </div>
                            <div className="col-md-6 text-center">
                                <br/><label for="new-prefride">Preferred Ride</label><br/>
                                <Select id="new-prefride" options={taxiType} onChange={this.handleChangePrefRide}/>                         
                            </div>
                          </div>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="new-homezone">Home Zone</label>
                                <Select id="new-homezone" options={zoneOptions} onChange={this.handleChangeHomeZone} />                         
                            </div>
                            <div className="col-md-6 text-center">
                                <label for="new-favzone">Favorite Zone to Travel To</label>
                                <Select id="new-favzone" options={zoneOptions} onChange={this.handleChangeFavZone} />                         
                            </div>
                          </div>
                          <div className="form-row py-3 justify-content-center">
                              <button id="query-submit" type="submit">Update User Information</button>   
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
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