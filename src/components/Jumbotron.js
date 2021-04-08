import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Main from './Main'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {username} from "./LoginSignUp";

export const client = new W3CWebSocket('ws://sp21-cs411-09.cs.illinois.edu:1234');

class Jumbotron extends Component{
    constructor(props){
        super(props)
        this.state = {
          loggedIn : false,
          loggedOut : true,
        }
    
        // This binding is necessary to make `this` work in the callback
        this.handleLoad = this.handleLoad.bind(this);
    }
    
    handleLoad(e){
        e.preventDefault();
        try{
            console.log(username);
            if (username === null){
                this.setState({ loggedIn: false});
                this.setState({ loggedOut: true});
            }
            else if (username !== null){
                this.setState({ loggedIn: true});
                this.setState({ loggedOut: false});
            }
        }
        catch(err){
            alert(err)
        }
    }
    render(){
        return(
            <div className="jumbotron" onMouseEnter = {this.handleLoad}>
                <h1 className="display-4 general-font">Rediscover New York's Hidden Gem</h1>
                <p className="lead">Our powerful technology helps deliver you the best rates for your taxi travel in New York</p>
                <hr className="my-4"></hr>
                <p className="lead">
                    {this.state.loggedOut && 
                    (<Link className="btn btn-primary btn-lg" id='jumbo-button' to='/loginsignup'>
                        <b>Get started here</b>
                    </Link>)
                    }
                    {this.state.loggedIn && 
                    (<Link className="btn btn-primary btn-lg" id='jumbo-button' to='/query'>
                        <b>Get started here</b>
                    </Link>)
                    }                       
                </p>
                {/* <p className="lead">
                    <Link className="btn btn-primary btn-lg" id='jumbo-button' to='/adduserride'>
                        <b>Add Ride</b>
                    </Link>
                    <Link className="btn btn-primary btn-lg" id='jumbo-button' to='/getuserrides'>
                        <b>See My Rides</b>
                    </Link>
                </p> */}
            </div>
        )
    }
}

export default Jumbotron