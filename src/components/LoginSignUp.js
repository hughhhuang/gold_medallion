import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Link, useHistory } from 'react-router-dom'

export const username = localStorage.getItem('username');

class LoginSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : ' ',
      res: ' ',
    };

    this.handleClickLogIn = this.handleClickLogIn.bind(this);
    this.handleClickSignUp = this.handleClickSignUp.bind(this);
  }
  // Script for logging in
  // state = {
  //   username: '',
  //   password: ''
  // };

  handleClickLogIn(e) {
    e.preventDefault();
    try{
      const userUsername = document.getElementById('user-username').value;
      const userPassword = document.getElementById('user-password').value;
      if (userUsername !== '' && userPassword !== ''){
        const url = "http://172.22.152.9:8000/api/auth/jwt/create"
        const response = fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: userUsername,
            password: userPassword,
          })
        }).then(response => response.json())
        .then(data => {
          console.log(data.detail)
          if (data.detail === "No active account found with the given credentials"){
            alert('Please log in with a valid username/password.');
          }
          else{
            localStorage.setItem('username', userUsername);
            window.location.href = "/query";
          }
        }       
        )
        .catch(error => {
          alert(error)
        })

      }
      else {
        alert("Please specify a username and password before logging in")
      }

    }
    catch(err){
      alert(err)
    }
  };

  
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
      })
      .then(res => {
        localStorage.setItem('username', document.getElementById('username').value);
        window.location.href = "/query";
      })
      .catch(error => {
          console.log("check login")
      })
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
                      <form className="pl-5" onSubmit={this.handleClickLogIn}>
                        <div className="row ml-0">
                          <div className="col">
                            <label for="user-username">Enter username:</label><br></br>
                            <input type="text" id="user-username" placeholder="Enter username"></input><br></br>
                            <label for="user-password">Enter password:</label><br></br>
                            <input type="password" id="user-password" placeholder="Enter password"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            <button type="submit" id="login" className="btn btn-primary mt-4 yellow-btn">
                              Log In
                            </button>
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
                            <button type="submit" id="sign-up" className="btn btn-primary mt-4 yellow-btn">
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