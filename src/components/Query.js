import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Query extends Component {
  render() {
    return (
        <div className="card">
            <h4 className="display-4">Get your rate estimate by inputing the fields below.</h4>
            <div className="card-body">
                <form className = "form-row" id="query-selection">
                    <div className="col-3 text-center">
                        <label for="pickup">Pickup Zipcode:</label>
                        <input type="text" size="10" id="pickup" name="pickup" placeholder="Enter here"></input>
                    </div>
                    <div className="col-3 text-center">
                        <label for="dropoff">Dropoff Zipcode:</label>
                        <input type="text" size="10" id="dropoff" name="dropoff" placeholder="Enter here"></input>                        
                    </div>
                    <div className="col-4 text-center">
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
                    <div className="col-2 text-center">
                        <button type="submit">Get my estimate</button>   
                    </div>
                </form>
            </div>
        </div>
        
    )
  }
}

export default Query