import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import Jumbotron from './Jumbotron'
import Taxi from "../assets/img/taxi\ background.jpg"
import { FaDollarSign } from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';

class Dashboard extends Component {
  render() {
    
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row" id = "background">
            <Jumbotron />
          </div>
          <div id="opening-info-1">
            <h1 className="display-4">How we calculate our rates</h1> 
          </div>
          <div className="row"  id="opening-info-2">
            <div className="col-md-4" id="left-info-item">
              < FaLocationArrow className="icons"/>
              <p>Upon inputting your pickup and dropoff location, our database queries millions of historical rides since January 2018 
                and finds the trips that have the same pickup and dropoff location.</p>
            </div>
            <div className="col-md-4">
              < FaCalendar className="icons"/>
              <p>Since rates differ between seasons, our technology then narrows down the similar trips to trips of the same month.</p>
            </div>
            <div className="col-md-4" id="right-info-item">
              < FaDollarSign className="icons"/>
              <p>Now that the data is filtered, the estimated cost is modeled using linear regression and delivered to you, matched against
                the current costs from Uber and Lyft. </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard