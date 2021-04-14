import React, { Component } from 'react'
import { NavDropdown } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Link, Dropdown } from 'react-router-dom'
import NY from "../assets/img/ny-icon.png"
import {username} from "./LoginSignUp"

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn : false,
      loggedOut : true,
    }

    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginLogout = this.handleLoginLogout.bind(this);
  }

  handleChange(e){
    if (username === null){
      this.setState({ loggedIn: false});
      this.setState({ loggedOut: true});
    }
    else if (username !== null){
      this.setState({ loggedIn: true});
      this.setState({ loggedOut: false});
    }
  }

  handleLoginLogout(e){
    localStorage.removeItem('username');
    this.setState({ loggedIn: false});
    window.location.href = "/";
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg " color-on-scroll="500" onLoad= {this.handleChange}>
        <div className="container-fluid" id="main-nav">
          <a className="navbar-brand title-font" href="/">Gold Medallion<img id = 'ny-icon' src={ NY }></img></a>
          <div className="collapse navbar-collapse justify-content-end" id="navigation">
            <ul className="navbar-nav ml-auto">
              {/* {this.state.loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to='/profile'>
                    <span className="no-icon nav-text">User Profile</span>
                  </Link>
                </li>
              )} */}
              {this.state.loggedIn && (
                <li className="nav-item">
                <Link className="nav-link" to='/adduserride'>
                  <span className="no-icon nav-text">Add Ride</span>
                </Link>
                </li>
              )}
              {this.state.loggedIn && (
                <li className="nav-item">
                <Link className="nav-link" to='/getuserrides'>
                  <span className="no-icon nav-text">See My Rides</span>
                </Link>
                </li>
              )}
              {this.state.loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to='/query'>
                    <span className="no-icon nav-text">Search Ride</span>
                  </Link>
                </li>

              )}
              {this.state.loggedIn && (
              // <Dropdown className="nav-item" title={username}>
              //   <DropdownItem>
              //     <Link className="nav-link" onClick={this.handleLoginLogout}>
              //       <span className="no-icon nav-text">Log out</span>
              //     </Link>
              //   </DropdownItem>
              // </Dropdown>
              <NavDropdown id="username-dropdown" title={username}>
                <NavDropdown.Item href="/profile">User Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleLoginLogout}>Log Out</NavDropdown.Item>
              </NavDropdown>
              )}
              {this.state.loggedOut && (
              <li className="nav-item">
                <Link className="nav-link" to='/LoginSignUp'>
                  <span className="no-icon nav-text">Log in</span>
                </Link>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar