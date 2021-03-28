import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Jumbotron from './Jumbotron'
import Query from './Query'

class Charts extends Component {
  render() {
   
    return (
        <div className="content border2">
            <div className="container-fluid">
                <div className="row">
                    < Query />
                </div>

            </div>
        </div>
        
    )
  }
}

export default Charts