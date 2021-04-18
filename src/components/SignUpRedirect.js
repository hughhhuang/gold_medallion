import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Link } from 'react-router-dom'
import { client } from './Jumbotron';
import Select from 'react-select'
import {username} from "./LoginSignUp"

class SignUpRedirect extends Component {

  constructor(props) {
    super(props);
    this.state = {
        zoneData: [],
        prefride: " ",
        favzoneid: " ",
        homezone: " ",
        homeZipCode: 12345,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClickSignUp = this.handleClickSignUp.bind(this);
    this.handleChangeFavZone = this.handleChangeFavZone.bind(this);
    this.handleChangeHomeZone = this.handleChangeHomeZone.bind(this);
    this.handleChangePrefRide = this.handleChangePrefRide.bind(this); 
    

  }
  async componentWillMount() {
    // console.log(username);
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
    };
  }

  handleChangeFavZone = (favzoneid) => {
    this.setState({ favzoneid });
    console.log(`Option selected:`, favzoneid);
  }

  handleChangeHomeZone = (homezone) => {
    this.setState({ homezone });
    console.log(`Option selected:`, homezone);
  }

  handleChangePrefRide = (prefride) => {
    this.setState({ prefride });
    console.log(`Option selected:`, prefride);
  }

  handleClickSignUp(e) {
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
          username: username,
          firstname: document.getElementById("firstname").value,
          lastname: document.getElementById("lastname").value,
          age: document.getElementById("age").value,
          prefride: this.state.prefride.value,
          vaccine: document.getElementById("vaccine").value,
          zoneid: this.state.homezone.value,
          zipcode: parseInt(document.getElementById("zipcode").value),
          favzoneid: this.state.favzoneid.value,
          minspend:"null",
          maxspend:"null",
          vaccpref:"null"
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        window.location.href = "/query";
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
      alert(err);
      console.log(err)
    }
    
    

  }
  render() {
    let taxiType = [{value:'Sedan',label:'Sedan'},{value:'SUV',label:'SUV'},{value:'Compact SUV',label:'Compact SUV'}];

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
      <div className="container" id="login-screen">
        <div className="row justify-content-center mt-5">
          <div className="col text-align-center">
            <div className="card fade-in" id="sign-up-redirect">
              <div className="card-body">
                <div className="row form-contents justify-content-center">
                  <form className="pl-5">
                    <div className="row ml-0">
                      <div className="col text-center">
                        <h4 className="general-font text-center">Welcome {username}, let's get to know you a little better!</h4>
                        <hr></hr>
                        <div className="fade-in-form">
                          <label for="firstname">Enter first name:</label><br></br>
                          <input type="text" id="firstname" placeholder="Enter first name"></input><br></br>
                          <label for="lastname">Enter last name:</label><br></br>
                          <input type="text" id="lastname" placeholder="Enter last name"></input><br></br>
                          <label for="age">Enter age:</label><br></br>
                          <input type="text" id="age" placeholder="Enter age"></input><br></br>
                          <label for="vaccine">Enter Preferred % Vaccinated of Destination Zone:</label><br></br>
                          <input type="text" id="vaccine" placeholder="Enter % vaccinated"></input><br></br>
                          <label for="zipcode">Enter Home Zip Code:</label><br></br>
                          <input type="text" id="zipcode" placeholder="Enter home zip code"></input>
                          <div className="row justify-content-center">
                            <div className="col-5">

                            <label for="prefride">Select Preferred Ride Type:</label><br></br>
                            <Select id="prefride" onChange = {this.handleChangePrefRide} options={taxiType} />
                            </div>
                          </div>

                          <div className="row justify-content-center">
                            <div className="col-5">

                            <label for="homezone">Select Home Zone:</label><br></br>
                            <Select id="homezone" onChange = {this.handleChangeHomeZone} options={zoneOptions} />
                            </div>
                          </div>                          
                          <div className="row justify-content-center">
                            <div className="col-5">

                            <label for="favzoneid">Select Favorite Zone To Visit:</label><br></br>
                            <Select id="favzoneid" onChange = {this.handleChangeFavZone} options={zoneOptions} />
                            </div>
                          </div>

                          <div>
                            <button type="submit" id="update-info" className="btn btn-primary mt-4 yellow-btn" onClick={this.handleClickSignUp}>Update Info</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
}

export default SignUpRedirect