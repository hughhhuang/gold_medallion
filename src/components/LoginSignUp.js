import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Link } from 'react-router-dom'

class LoginSignUp extends Component {
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
                      <form className="pl-5">
                        <div className="row ml-0">
                          <div className="col">
                            <label for="user-email">Enter email address:</label><br></br>
                            <input type="text" id="user-email" placeholder="Enter email"></input><br></br>
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
                      <form className="pl-5">
                        {/* <div className="row ml-0">
                          <div className="col">
                            <label for="first-name">First name:</label><br></br>
                            <input type="text" id="first-name" size="12"></input>
                          </div>
                          <div className="col">
                            <label for="last-name">Last name:</label><br></br>
                            <input type="text" id="last-name" size="12"></input>
                          </div>
                        </div> */}
                        <div className="row ml-0">
                          <div className="col">
                            <label for="username">Username:</label><br></br>
                            <input type="text" id="username" size="35"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            <label for="email">Email:</label><br></br>
                            <input type="email" id="email" size="35"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            <label for="confirm-email">Confirm Email:</label><br></br>
                            <input type="email" id="confirm-email" size="35"></input>
                          </div>
                        </div>
                        <div className="row ml-0">
                          <div className="col">
                            <label for="password">Password:</label><br></br>
                            <input type="password" id="password" size="12"></input>
                          </div>
                          {/* <div className="col">
                            <label for="confirm-password">Confirm Password:</label><br></br>
                            <input type="password" id="confirm-password" size="12"></input>
                          </div> */}
                        </div>
                        <div className="row ml-0">
                          {/* <div className="col">
                            <label for="home-burough">Name of Home Burough:</label><br></br>
                            <input type="text" id="home-burough" size="35"></input>
                          </div> */}
                          <div className="col">
                            <button type="submit" id="sign-up" className="btn btn-primary mt-4 yellow-btn">Sign Up</button>
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