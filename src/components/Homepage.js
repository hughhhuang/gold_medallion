import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import Jumbotron from './Jumbotron'
import InfoTab from './InfoTab'
import Taxi from "../assets/img/taxi\ background.jpg"


class HomePage extends Component {
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
          < InfoTab />
        </div>
      </div>
    )
  }
}

export default HomePage