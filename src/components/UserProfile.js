import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import face0 from "../assets/img/faces/face-0.jpg"

class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="card card-user">
                <div className="card-image">
                  <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..." />
                </div>
                <div className="card-body">
                  <div className="author">
                    <Link to='/'>
                      <img className="avatar border-gray" src={face0} alt="..." />
                      <h5 className="title">this.firstName + this.lastName</h5>
                    </Link>
                    <p className="description">
                      this.username
                    </p>
                  </div>
                </div>
                <hr /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile