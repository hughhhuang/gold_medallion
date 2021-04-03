import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Main from './Main'
import { w3cwebsocket as W3CWebSocket } from "websocket";

export const client = new W3CWebSocket('ws://localhost:1234');

class Jumbotron extends Component{
    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-4 general-font">Rediscover New York's Hidden Gem</h1>
                <p className="lead">Our powerful technology helps deliver you the best rates for your taxi travel in New York</p>
                <hr className="my-4"></hr>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" id='jumbo-button' to='/loginsignup'>
                        <b>Get started here</b>
                    </Link>
                </p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" id='jumbo-button' to='/adduserride'>
                        <b>Add Ride</b>
                    </Link>
                    <Link className="btn btn-primary btn-lg" id='jumbo-button' to='/getuserrides'>
                        <b>See My Rides</b>
                    </Link>
                </p>
            </div>
        )
    }
}

export default Jumbotron