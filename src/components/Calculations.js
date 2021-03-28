import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Charts from './Charts'
class Calculations extends Component {
  render() {
    return (
      <div className="content" id="charts-page">
        <div className="container-fluid">
          <div className="row">
            <Charts />
          </div>
        </div>
      </div>
    )
  }
}

export default Calculations