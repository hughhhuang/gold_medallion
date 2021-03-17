import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Select from 'react-select'
import ChartistGraph from 'react-chartist'

// ws://127.0.0.1:1234
const client = new W3CWebSocket('ws://sp21-cs411-09.cs.illinois.edu:1234');


class Query extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isToggleOn: true, 
        averageTotalAmount:"0",
        averageMtaAmount:"0",
        averageTipAmount:"0",
        averageFareAmount:"0",
        zoneData: [],
        pickupZone: 0,
        dropoffZone: 0,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);

  }
async componentWillMount() {
    const url = "http://172.22.152.9:8000/api/nygm/?format=json"
    const response = await fetch(url);
    const zones = await response.json();
    this.setState(state=> ({
        zoneData: zones,
    }))

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
      var result=JSON.parse(message.data).data;
        this.setState(state => ({
          averageTotalAmount: parseFloat(result.totalAmount).toFixed(2),
          averageMtaAmount: parseFloat(result.mtaTax).toFixed(2),
          averageTipAmount: parseFloat(result.tipAmount).toFixed(2),
          averageFareAmount: parseFloat(result.fareAmount).toFixed(2)
        }));
      // response=JSON.stringify(message);
        // this.setState(state => ({
        //   wsResponse: message
        // }));
    };
    
  }

  handleClick(e) {
    e.preventDefault();
    try{
      console.log("stan");
      console.log(e);
      // var inputObj = {
      //     "function":"getTaxiData",
      //     "maxCount":"10",
      //     "fields":["pickup","dropoff"]
      // };
      var inputObj = {"function":"getUserEstimatedFare","pl": this.state.pickupZone.value.toString(),"dl": this.state.dropoffZone.value.toString()}
      console.log(this.state.pickupZone.value)
      client.send(JSON.stringify(inputObj));
    }
    catch(err){
      alert("Please select a pickup and dropoff location")
    }
  }

  handleChangePO = (pickupZone) => {
    this.setState({ pickupZone });
    console.log(`Option selected:`, pickupZone);
  }

  handleChangeDO = (dropoffZone) => {
    this.setState({ dropoffZone });
    console.log(`Option selected:`, dropoffZone);
  }

  render() {

    // Creating zones for the select options
    let zones = this.state.zoneData;
    let zoneOptions = [
        {}
    ]
    zones.map((zone) =>
        zoneOptions.push({
            value : zone.zoneid,
            label : zone.zonename
        })
    );  
    const { pickupZone } = this.state;
    const { dropoffZone } = this.state;

    // Creating data for pie chart
    let total = parseFloat(this.state.averageTotalAmount);
    let mta = parseFloat(this.state.averageMtaAmount);
    let tip = parseFloat(this.state.averageTipAmount);
    let fare = parseFloat(this.state.averageFareAmount);
    let misc = (total - (mta+tip+fare));

    console.log([mta,tip,fare,misc]);
    let dataPie = {
      labels: [' ',' ',' ',' '],
      series: [
        fare*100 / total,
        mta*100 / total,
        tip*100 / total,
        misc*100 / total
      ]
    }
    let pieOptions = {
      chartPadding: 40,
      labelOffset: 60,
      labelDirection: 'explode',
    }
    let dataLine = {
      labels: ["2018","2019","2020"],
      series: [
        [21,23,25],
     ]
    }
    

    
    return (
      <div className="content" id="query-page">
        <div className="container-fluid pl-0 pr-0 ml-0 mr-0">
            <div className="ml-0 mr-0" id="query-body">
              <div className="card" id="query-card">
                <div className="card-body">
                  <form id="query-selection" onSubmit={this.handleClick}>
                    <div className = "form-row justify-content-center">
                      <div className="col-md-4 text-center">
                        <label for="pickup">Pickup Zone:</label>
                        <Select id="pickup" onChange = {this.handleChangePO} options={zoneOptions} />
                      </div>
                      <div className="col-md-4 text-center">
                        <label for="dropoff">Dropoff Zone:</label>
                        <Select id="dropoff" onChange = {this.handleChangeDO} options={zoneOptions} />                      
                      </div>
                              {/* <div className="col-md-4 text-center">
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
                              </div> */}
                    </div>
                        
                    <div className="form-row py-3 justify-content-center">
                        <button id="query-submit" type="submit">Get my estimate</button>   
                    </div>
                  </form>
                </div>
              </div> 
              <div className="ml-0 pl-0">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Breakdown of Total Cost</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Change in Fare Since 2018</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="row">
                          <div className="general-font">
                            <h4 className="general-font">The average total amount paid for this trip is ${this.state.averageTotalAmount}</h4>
                            <ul>
                              <li><i>Average MTA Amount: ${this.state.averageMtaAmount}</i></li>
                              <li><i>Average Tip Amount: ${this.state.averageTipAmount}</i></li>
                              <li><i>Average Fare Amount: ${this.state.averageFareAmount}</i></li>
                            </ul>
                          </div>
                          {/* <div className="col">
                            <div className="card" id="calc-card">
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col">
                                            <h6>Average Total Amount: ${this.state.averageTotalAmount}</h6><br></br>
                                            <h6>Average MTA Amount: ${this.state.averageMtaAmount}</h6><br></br>
                                            <h6>Average Tip Amount: ${this.state.averageTipAmount}</h6><br></br>
                                            <h6>Average Fare Amount: ${this.state.averageFareAmount}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                          </div> */}
                          <div className="row ml-0">
                            <div className="card">
                              <div className="card-header ">
                                  <h4 className="card-title">Breakdown of Total Cost</h4>
                                  <p className="card-category">Miscellaneous costs include toll, surcharge, and congestion cost</p>
                                </div>
                                <div className="card-body ">
                                  <ChartistGraph data={dataPie} options={pieOptions} type="Pie" />
                                  <div className="legend">
                                      <i className="fa fa-circle ct-series-a"></i> Fare 
                                      <i className="fa fa-circle ct-series-b"></i> MTA 
                                      <i className="fa fa-circle ct-series-c"></i> Tip 
                                      <i className="fa fa-circle ct-series-d"></i> Misc 
                                  </div>
                                  <hr />
                                </div>
                              </div>
                          </div>
                        </div>


                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                      <div className="col">
                        <div className="card">
                          <div className="card-header ">
                            <h4 className="card-title">Change in Fare Since 2018</h4>
                            <p className="card-category">Average Total Fare Per Month</p>
                          </div>
                          <div className="card-body ">
                            <div>
                              <ChartistGraph data={dataLine} options={{fullWidth: true}} type="Line" />
                              <hr />
                            </div>
                          </div>
                        </div>
                      </div>  
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>  
              </div>
              
            </div>
          </div>        
        </div>
      )
    }
  }

export default Query
