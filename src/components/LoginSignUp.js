import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Link, useHistory } from 'react-router-dom'


class LoginSignUp extends Component {
  // Script for logging in
  // state = {
  //   username: '',
  //   password: ''
  // };

  // handleClickLogIn = e => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState(prevstate => {
  //     const newState = { ...prevstate };
  //     newState[name] = value;
  //     return newState;
  //   });
  // };


  // Script for signing up
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
      }).catch(error => {
        console.log("check login")
        })
        .then(res => res.json())
        
        .then(data => console.log(data))
      window.location.href = "/signupRedirect";
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
            <div className="card" id="login-signup">
              <div className="card-body">
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                  <Tab eventKey="login" title="Login">
                    <div className="row form-contents justify-content-center">
                      <div>
                        <h6 className="text-center">Please enter your credentials below</h6>
                        <hr></hr>
                      </div>
                      {/* <form className="pl-5" onSubmit={this.handleClickLogIn}></form> */}
                      <form className="pl-5">
                        <div className="row ml-0">
                          <div className="col">
                            <label for="user-username">Enter username:</label><br></br>
                            <input type="text" id="user-username" placeholder="Enter username"></input><br></br>
                            <label for="user-password">Enter password:</label><br></br>
                            <input type="text" id="user-password" placeholder="Enter password"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            {/* CHANGE THE TO LINK */}
                            <Link to="/query">
                               <button type="submit" id="login" className="btn btn-primary mt-4 ml-5 yellow-btn">Login</button>
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Tab>
                  <Tab eventKey="signup" title="Sign Up">
                    <div className="row form-contents justify-content-center">
                      <div>
                        <h6 className="text-center">Please fill this form to create an account</h6>
                        <hr></hr>
                      </div>
                      <form className="pl-5" onSubmit={this.handleClickSignUp}>
                        <div className="row ml-0">
                          <div className="col">
                            <label for="username">Username:</label><br></br>
                            <input type="text" id="username" size="35" placeholder="Enter username"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            <label for="email">Email:</label><br></br>
                            <input type="email" id="email" size="35" placeholder="Enter email"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            <label for="confirm-email">Confirm Email:</label><br></br>
                            <input type="email" id="confirm-email" size="35" placeholder="Confirm email"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            <label for="password">Password:</label><br></br>
                            <input type="password" id="password" size="15" placeholder="Enter password"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            <button type="submit" id="sign-up" className="btn btn-primary mt-4 yellow-btn" onClick="location-href = ">
                              Sign Up
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
}

export default LoginSignUp