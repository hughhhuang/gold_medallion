import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import Jumbotron from './Jumbotron'

class Dashboard extends Component {
  render() {
    
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row" id="background">
              <Jumbotron />
          </div>
          <div className="row">
            <div className="col-md-4">
              <p>Upon entering your start and end destination, our system gathers fare data from te </p>
            </div>
            <div className="col-md-4">
              <p>Step 2</p>
            </div>
            <div className="col-md-4">
              <p>Step 3: We compare prices to Uber and Lyft</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard