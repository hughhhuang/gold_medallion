import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Calculations from './Calculations'

class Jumbotron extends Component{
    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-4">Rediscover New York's Hidden Gem</h1>
                <p className="lead">Our powerful technology helps deliver you the best rates for your taxi travel in New York</p>
                <hr className="my-4"></hr>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" id='jumbo-button' to='/calculations'>
                        <b>Get started here</b>
                    </Link>
                </p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" id='jumbo-button' to='/adduserride'>
                        <b>Add Ride</b>
                    </Link>
                </p>
            </div>
        )
    }
}

export default Jumbotron