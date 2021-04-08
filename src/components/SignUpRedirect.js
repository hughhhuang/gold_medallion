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
        favoriteZone: "",
        homeZone: "",
        homeZipCode: 12345,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClickSignUp = this.handleClickSignUp.bind(this);
    this.handleChangeFavZone = this.handleChangeFavZone.bind(this);
    this.handleChangeHomeZone = this.handleChangeHomeZone.bind(this);
    this.handleChangeZipCode = this.handleChangeZipCode.bind(this);

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

  handleChangeFavZone = (favoriteZone) => {
    this.setState({ favoriteZone });
    console.log(`Option selected:`, favoriteZone);
  }

  handleChangeHomeZone = (homeZone) => {
    this.setState({ homeZone });
    console.log(`Option selected:`, homeZone);
  }

  handleChangeZipCode = (homeZipCode) => {
    this.setState({ homeZipCode });
    console.log(`Option selected:`, homeZipCode);
  }

  handleClickSignUp(e) {
    e.preventDefault();
    try{
      const url = "http://172.22.152.9:8000/api/usertable/";
      const response = fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          firstname: document.getElementById('first-name').value,
          lastname: document.getElementById('last-name').value,
          age: document.getElementById('age').value,
          zipCode: document.getElementById('home-zip').value,
          favZone: document.getElementById('fav-zone').value,
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // window.location.href = "/query";
      })
      .catch(error => {alert(error)})  
            
    }
    catch(err){
      alert(err)
    }
    

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
                          <label for="first-name">Enter first name:</label><br></br>
                          <input type="text" id="first-name" placeholder="Enter first name"></input><br></br>
                          <label for="last-name">Enter last name:</label><br></br>
                          <input type="text" id="last-name" placeholder="Enter last name"></input><br></br>
                          <label for="age">Enter age:</label><br></br>
                          <input type="text" id="age" placeholder="Enter age"></input><br></br>
                          <label for="home-zip">Enter Home Zip Code:</label><br></br>
                          <input type="text" id="home-zip" placeholder="Enter home zip code"></input>
                          <div className="row justify-content-center">
                            <div className="col-5">

                            <label for="home-zone">Select Home Zone:</label><br></br>
                            <Select id="home-zone" onChange = {this.handleChangeHomeZone} options={zoneOptions} />
                            </div>
                          </div>                          
                          <div className="row justify-content-center">
                            <div className="col-5">

                            <label for="fav-zone">Select Favorite Zone To Visit:</label><br></br>
                            <Select id="fav-zone" onChange = {this.handleChangeFavZone} options={zoneOptions} />
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