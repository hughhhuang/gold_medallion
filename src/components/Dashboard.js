import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import Jumbotron from './Jumbotron'
import { FaDollarSign } from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';

class Dashboard extends Component {
  render() {
    
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row" id="background">
              <Jumbotron />
          </div>
          <div className="row" id="opening-info">
            <div className="col-md-4" id="left-info-item">
              < FaCalendar className="icons"/>
              <p>Upon entering your start and end destination, our system gathers fare data from te </p>
            </div>
            <div className="col-md-4">
              < FaLocationArrow className="icons"/>
              <p>Step 2</p>
            </div>
            <div className="col-md-4" id="right-info-item">
              < FaDollarSign className="icons"/>
              <p>Step 3: We compare prices to Uber and Lyft</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard