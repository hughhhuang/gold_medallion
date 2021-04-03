import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NY from "../assets/img/ny-icon.png"

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg " color-on-scroll="500">
        <div className="container-fluid" id="main-nav">
          <a className="navbar-brand title-font" href="/">Gold Medallion<img id = 'ny-icon' src={ NY }></img></a>
          <div className="collapse navbar-collapse justify-content-end" id="navigation">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to='/profile'>
                  <span className="no-icon nav-text">User Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/'>
                  <span className="no-icon nav-text">Log out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar