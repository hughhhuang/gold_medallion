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
        byDayGraphHeaders:['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],
        byDayGraphValues:[],
        byMonthGraphHeaders:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        byMonthGraphValues:[],
        byHourGraphHeaders:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        byHourGraphValues:[],
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
      var dataByDay=JSON.parse(message.data).dataByDay.data;
      var dataByMonth=JSON.parse(message.data).dataByMonth.data;
      var dataByHour=JSON.parse(message.data).dataByHour.data;
      var byDayGraphHeaders=[];
      var byDayGraphValues=[];
      var byMonthGraphHeaders=[];
      var byMonthGraphValues=[];
      var byHourGraphHeaders=[];
      var byHourGraphValues=[];
      
      dataByDay.forEach(function(entry){
        byDayGraphHeaders.push(entry.day);
        byDayGraphValues.push(parseFloat(entry.totalAmount).toFixed(2));
      });

      dataByMonth.forEach(function(entry){
        byMonthGraphHeaders.push(entry.month);
        byMonthGraphValues.push(parseFloat(entry.totalAmount).toFixed(2));
      });

      dataByHour.forEach(function(entry){
        byHourGraphHeaders.push(entry.hour);
        byHourGraphValues.push(parseFloat(entry.totalAmount).toFixed(2));
      });

        this.setState(state => ({
          averageTotalAmount: parseFloat(result.totalAmount).toFixed(2),
          averageMtaAmount: parseFloat(result.mtaTax).toFixed(2),
          averageTipAmount: parseFloat(result.tipAmount).toFixed(2),
          averageFareAmount: parseFloat(result.fareAmount).toFixed(2),
          byDayGraphHeaders:byDayGraphHeaders,
          byDayGraphValues:byDayGraphValues,
          byMonthGraphHeaders:byMonthGraphHeaders,
          byMonthGraphValues:byMonthGraphValues,
          byHourGraphHeaders:byHourGraphHeaders,
          byHourGraphValues:byHourGraphValues
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
    let misc = parseFloat((total - (mta+tip+fare)),2);

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

    let month = [
      {value:1, label:'January'},
      {value:2, label:'February'},
      {value:3, label:'March'},
      {value:4, label:'April'},
      {value:5, label:'May'},
      {value:6, label:'June'},
      {value:7, label:'July'},
      {value:8, label:'August'},
      {value:9, label:'September'},
      {value:10, label:'October'},
      {value:11, label:'November'},
      {value:12, label:'December'}
    ]

    let time_1 = [
      {value:1, label:'1:00'},
      {value:2, label:'2:00'},
      {value:3, label:'3:00'},
      {value:4, label:'4:00'},
      {value:5, label:'5:00'},
      {value:6, label:'6:00'},
      {value:7, label:'7:00'},
      {value:8, label:'8:00'},
      {value:9, label:'9:00'},
      {value:10, label:'10:00'},
      {value:11, label:'11:00'},
      {value:12, label:'12:00'}
    ]
    
    let time_2 = [
      {value:'AM',label:'AM'},
      {value:'PM',label:'PM'}
    ]

    let day = [
      {value:'Weekday',label:'Weekday (Mon-Fri)'},
      {value:'Weekend',label:'Weekend (Sat-Sun)'}
    ]
    
    let byDayData = {
      labels: this.state.byDayGraphHeaders,
      series: [this.state.byDayGraphValues]
    }

    let byMonthData = {
      labels: this.state.byMonthGraphHeaders,
      series: [this.state.byMonthGraphValues]
    }

    let byHourData = {
      labels: this.state.byHourGraphHeaders,
      series: [this.state.byHourGraphValues]
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
                    </div>
                    <div className="form-row justify-content-center">
                      <div className="col-6 mt-5">
                        <h6 className="text-center">Specify optional time details below for more precise analytics</h6>
                        <hr></hr>
                      </div>
                    </div>  
                    <div className="form-row justify-content-center">
                      <div className="col-3 text-center">
                        <label for="month">Month of Travel</label>
                        <Select id="month" onChange = {this.handleChangePO} options={month} />
                      </div>
                      <div className="col-3 text-center">
                        <label for="time-1">Time</label>
                        <Select id="time-2" onChange = {this.handleChangePO} options={time_1} />
                      </div>
                      <div className="col-2 text-center">
                        <label for="time-2">AM/PM</label>  
                        <Select id="time-2" onChange = {this.handleChangePO} options={time_2} />
                      </div>
                      <div className="col-2 text-center">
                        <label for="day">Weekday/Weekend</label>  
                        <Select id="day" onChange = {this.handleChangePO} options={day} />
                      </div>
                    </div>  
                    <div className="form-row py-3 justify-content-center">
                        <button id="query-submit" type="submit">Get my estimate</button>   
                    </div>
                  </form>
                </div>
              </div> 
              <div className="row pb-4">
                <div className="col justify-content-center">
                  <h4 className="general-font text-center">The average total amount paid for this trip is ${this.state.averageTotalAmount}</h4>
                </div>
              </div>
              {/* <div className="row justify-content-center">
                <div className="col-4 text-center">
                  <div className="card">
                    <div className="card-body general-font">
                        <li>Average MTA Amount: ${this.state.averageMtaAmount}</li>
                        <li>Average Tip Amount: ${this.state.averageTipAmount}</li>
                        <li>Average Fare Amount: ${this.state.averageFareAmount}</li>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="col-6">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">Breakdown of Total Cost</h4>
                      <p className="card-category">Miscellaneous costs include toll, surcharge, and congestion cost</p>
                    </div>
                    <div className="card-body ">
                      <div className="row">
                        <div className="col-8">
                          <ChartistGraph data={dataPie} options={pieOptions} type="Pie" />
                        </div>
                        <div className="col-4 pt-5 mt-4">
                          <div className="legend">
                            <i className="fa fa-circle ct-series-a"></i> Fare: ${total.toFixed(2)}
                            <br></br><i className="fa fa-circle ct-series-b"></i> MTA: ${mta.toFixed(2)}
                            <br></br><i className="fa fa-circle ct-series-c"></i> Tip: ${tip.toFixed(2)} 
                            <br></br><i className="fa fa-circle ct-series-d"></i> Misc: ${misc.toFixed(2)}
                          </div>
                        </div>
                       
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">Change in Fare Since 2018</h4>
                      <p className="card-category">Average Total Fare Per Month</p>
                    </div>
                    <div className="card-body ">
                      <div>
                        <ChartistGraph data={dataLine} type="Line" />
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
              <div className="row">
                <div className="col-4">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">Total Amount by Month</h4>
                      <p className="card-category">Average total trip amount by Month</p>
                    </div>
                    <div className="card-body ">
                      <ChartistGraph data={byMonthData} type="Bar" />
                      <hr />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">Total Amount by Day of Week</h4>
                      <p className="card-category">Average total trip amount by Day of Week</p>
                    </div>
                    <div className="card-body ">
                      <ChartistGraph data={byDayData} type="Bar" />
                      <hr />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">Total Amount by Hour</h4>
                      <p className="card-category">Average total trip amount by Hour</p>
                    </div>
                    <div className="card-body ">
                      <ChartistGraph data={byHourData} type="Bar" />
                      <hr />
                    </div>
                  </div>
                </div>
              </div>             
            </div>
          </div>        
        </div>
      )
    }
  }

export default Query
