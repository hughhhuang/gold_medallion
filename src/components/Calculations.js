import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Query from './Query'
class Calculations extends Component {
  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <Query />
          </div>
        </div>
      </div>
    )
  }
}

export default Calculations