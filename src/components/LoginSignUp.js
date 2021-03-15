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
                    <div className="row form-contents">
                        <form>
                          <label for="user-email">Enter email address:</label><br></br>
                          <input type="text" id="user-email" placeholder="Enter email address here"></input><br></br>
                          <label for="user-password">Enter password:</label><br></br>
                          <input type="text" id="user-password" placeholder="Enter password here"></input>
                        </form>
                    </div>
                  </Tab>
                  <Tab eventKey="signup" title="Sign Up">
                    {/* <Sonnet /> */}sdfsdf
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