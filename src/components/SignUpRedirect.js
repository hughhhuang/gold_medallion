import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Link } from 'react-router-dom'

class LoginSignUp extends Component {
  handleClickSignUp(e) {
    e.preventDefault();
    try{
      const url = "http://172.22.152.9:8000/api/auth/users/"
      const response = fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: document.getElementById('username').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        })
      })
        .then(res => res.json())
        
        .then(data => console.log(data))      
    }
    catch(err){
      alert(err)
    }
    

  }
  render() {
    return (
      <div className="container" id="login-screen">
        <div className="row justify-content-center mt-5">
          <div className="col text-align-center">
            <div className="card">
              <div className="card-body">
                <div className="row form-contents justify-content-center">
                  <form className="pl-5">
                    <div className="row ml-0">
                      <div className="col text-center">
                        <h4 className="general-font text-center">Welcome this.username, let's get to know you a little better!</h4>
                        <hr></hr>
                        <label for="first-name">Enter first name:</label><br></br>
                        <input type="text" id="first-name" placeholder="Enter first name"></input><br></br>
                        <label for="last-name">Enter last name:</label><br></br>
                        <input type="text" id="last-name" placeholder="Enter last name"></input><br></br>
                        <label for="last-name">Enter age:</label><br></br>
                        <input type="text" id="age" placeholder="Enter age"></input>
                        <div>
                          <Link to="/query">
                              <button type="submit" id="update-info" className="btn btn-primary mt-4 yellow-btn">Update Info</button>
                          </Link>
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

export default LoginSignUp