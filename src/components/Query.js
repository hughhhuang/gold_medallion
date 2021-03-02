import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Query extends Component {
  render() {
    return (
        <div>
            <h4 className="display-4 page-header">Get your rate estimate by entering your information below</h4> 
            <div className="card" id="query-card">
                <div className="card-body">
                    <form id="query-selection">
                        <div className = "form-row justify-content-center">
                            <div className="col-md-3 text-center">
                                <label for="pickup">Pickup Zipcode:</label>
                                <input type="text" size="6" id="pickup" name="pickup" placeholder="Enter here"></input>
                            </div>
                            <div className="col-md-3 text-center">
                                <label for="dropoff">Dropoff Zipcode:</label>
                                <input type="text" size="6" id="dropoff" name="dropoff" placeholder="Enter here"></input>                        
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="month">Select Month of Travel:</label>
                                <select class="form-select" length="2" id="month" name="month">
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>  
                            </div>
                        </div>
                       
                    <div className="form-row py-3 justify-content-center">
                        <button id="query-submit" type="submit">Get my estimate</button>   
                    </div>
                    </form>
                </div>
            </div>    
        </div>
       
        
    )
  }
}

export default Query