import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Select from 'react-select'
import ChartistGraph from 'react-chartist'
import {client} from './Jumbotron';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';


class Query extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isToggleOn: true, 
        toggleOnOpen: false,
        averageTotalAmount:"0",
        averageMtaAmount:"0",
        averageTipAmount:"0",
        averageFareAmount:"0",
        zoneData: [],
        pickupZone: 0,
        dropoffZone: 0,
        month:"",
        time_1:"",
        day:"",
        byDayGraphHeaders:['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],
        byDayGraphValues:[],
        byMonthGraphHeaders:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        byMonthGraphValues:[],
        byHourGraphHeaders:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        byHourGraphValues:[],
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);

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
      

      // Function that returns the data to be used in stacked bars
      function assignStack(vals, plotHeaders, plotVals, type){
        let fare = [];
        let mta = [];
        let tip = [];
        let misc = [];  
        let head = '';
        vals.forEach(function(entry){
          if (type === 'day'){
            head = entry.day;
          }
          else if (type === 'month'){
            head = entry.month;
          }
          else if (type === 'hour'){
            head = entry.hour;
          }
          plotHeaders.push(head);
          fare.push(parseFloat(entry.fareAmount).toFixed(2));
          mta.push(parseFloat(entry.mtaTax).toFixed(2));
          tip.push(parseFloat(entry.tipAmount).toFixed(2));
          misc.push(
            (
              parseFloat(entry.totalAmount,2) -
              (
                parseFloat(entry.fareAmount,2) +
                parseFloat(entry.mtaTax,2) +
                parseFloat(entry.tipAmount,2)
              )
            ).toFixed(2)
          )
        });
        plotVals.push(
          fare,mta,tip,misc
          // [10,2,3,5,7,8,9],
          // [3,5,8,1,2,48,9]
        );
        return ([plotHeaders,plotVals])
      }

        let dayData = assignStack(dataByDay,byDayGraphHeaders,byDayGraphValues,'day');
        let monthData = assignStack(dataByMonth,byMonthGraphHeaders,byMonthGraphValues,'month');
        let hourData = assignStack(dataByHour,byHourGraphHeaders,byHourGraphValues,'hour');

        this.setState(state => ({
          averageTotalAmount: parseFloat(result.totalAmount).toFixed(2),
          averageMtaAmount: parseFloat(result.mtaTax).toFixed(2),
          averageTipAmount: parseFloat(result.tipAmount).toFixed(2),
          averageFareAmount: parseFloat(result.fareAmount).toFixed(2),
          byDayGraphHeaders:dayData[0],
          byDayGraphValues:dayData[1],
          byMonthGraphHeaders:monthData[0],
          byMonthGraphValues:monthData[1],
          byHourGraphHeaders:hourData[0],
          byHourGraphValues:hourData[1]
        }));
    };
    
  }

  handleClick(e) {
    e.preventDefault();
    try{
      console.log(e);
      var inputObj = {
        "function":"getUserEstimatedFare",
        "pl": this.state.pickupZone.value.toString(),
        "dl": this.state.dropoffZone.value.toString()
      }
      if(this.state.month!="" && this.state.month.value!=""){
        inputObj.month= this.state.month.value.toString()
      }
      if(this.state.time_1!="" && this.state.time_1.value!=""){
        inputObj.startTime= this.state.time_1.value.toString()
      }
      if(this.state.day!="" && this.state.day.value.toString()!=""){
        inputObj.day= this.state.day.value.toString()
      }
      console.log(this.state.pickupZone.value)
      client.send(JSON.stringify(inputObj));
      this.setState({ toggleOnOpen : true });
      console.log(this.state.toggleOnOpen);
    }
    catch(err){
      alert("Please select a pickup and dropoff location");
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

  handleChangeMonth = (m) => {
    this.setState({ month:m });
  }

  handleChangeTime = (t) => {
    this.setState({ time_1:t });
  }

  handleChangeDay = (d) => {
    this.setState({ day:d });
  }

  handleReset(e){
    e.preventDefault();
    this.selectMonth.select.clearValue();
    this.selectDay.select.clearValue();
    this.selectTime.select.clearValue();
    this.setState({
      month: "",
      time_1: "",
      day: ""
    })
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
      {value:1, label:'1 AM'},
      {value:2, label:'2 AM'},
      {value:3, label:'3 AM'},
      {value:4, label:'4 AM'},
      {value:5, label:'5 AM'},
      {value:6, label:'6 AM'},
      {value:7, label:'7 AM'},
      {value:8, label:'8 AM'},
      {value:9, label:'9 AM'},
      {value:10, label:'10 AM'},
      {value:11, label:'11 AM'},
      {value:12, label:'12 PM'},
      {value:13, label:'1 PM'},
      {value:14, label:'2 PM'},
      {value:15, label:'3 PM'},
      {value:16, label:'4 PM'},
      {value:17, label:'5 PM'},
      {value:18, label:'6 PM'},
      {value:19, label:'7 PM'},
      {value:20, label:'8 PM'},
      {value:21, label:'9 PM'},
      {value:22, label:'10 PM'},
      {value:23, label:'11 PM'}
    ]
    
    let day = [
      {value:-1,label:'All Days'},
      {value:0,label:'Weekday (Mon-Fri)'},
      {value:1,label:'Weekend (Sat-Sun)'}
    ]
    
    let byDayData = {
      labels: this.state.byDayGraphHeaders,
      series: this.state.byDayGraphValues
    }

    let byMonthData = {
      labels: this.state.byMonthGraphHeaders,
      series: this.state.byMonthGraphValues
    }

    let byHourData = {
      labels: this.state.byHourGraphHeaders,
      series: this.state.byHourGraphValues
    }


    const stackedOptions = {
      stackBars: true,
      // axisY: {
      //   labelInterpolationFnc: function(value) {
      //     return (value / 1000) + 'k';
      //   }
      // },
      plugins: [
        ChartistTooltip({
          currency: '$',
          appendToBody: true,
        })
        
      ]
    }
	


    return (
      <div className="content" id="query-page">
        <div className="container-fluid pl-0 pr-0 ml-0 mr-0">
            <div className="ml-0 mr-0" id="query-body">
              <div className="card" id="query-card">
                <div className="card-body">
                  <form id="query-selection">
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
                        <Select id="month" onChange = {this.handleChangeMonth} options={month} 
                                  ref={ref => {
                                    this.selectMonth = ref;
                                  }}
                        />
                      </div>
                      <div className="col-3 text-center">
                        <label for="time-1">Time</label>
                        <Select id="time-2" onChange = {this.handleChangeTime} options={time_1} 
                                  ref={ref => {
                                    this.selectTime = ref;
                                  }}
                        />
                      </div>
                      <div className="col-2 text-center">
                        <label for="day">All Days/Weekday/Weekend</label>  
                        <Select id="day" onChange = {this.handleChangeDay} options={day} 
                                  ref={ref => {
                                    this.selectDay = ref;
                                  }}
                        />
                      </div>
                    </div>  

                    <div className="form-row py-4 justify-content-center">
                      <button id="query-submit" onClick={this.handleClick}>Get my estimate</button> 
                      <button id="query-submit" onClick={this.handleReset}>Reset Optional Filters</button>
                    </div>
                  </form>
                </div>
              </div> 
              {this.state.toggleOnOpen && (<div>
                <div className="row pb-4">
                  <div className="col justify-content-center">
                    <h4 className="general-font text-center">The average total amount paid for this trip is ${this.state.averageTotalAmount}</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
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
                              <i className="fa fa-circle ct-series-a"></i> Fare: ${fare.toFixed(2)}
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
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header ">
                        <h4 className="card-title">Total Amount by Hour</h4>
                        <p className="card-category">Average total trip amount by Hour</p>

                      </div>
                      <div className="card-body " id="hour-data">
                        <ChartistGraph data={byHourData} options={stackedOptions} type="Bar" />
                        <hr />
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header ">
                        <h4 className="card-title">Total Amount by Month</h4>
                        <p className="card-category">Average total trip amount by Month</p>
                      </div>
                      <div id="month-data" className="card-body">
                        <ChartistGraph data={byMonthData} options={stackedOptions} type="Bar" />
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header ">
                        <h4 className="card-title">Total Amount by Day of Week</h4>
                        <p className="card-category">Average total trip amount by Day of Week</p>
                      </div>
                      <div className="card-body " id="day-data">
                        <ChartistGraph data={byDayData} options={stackedOptions} type="Bar" />
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>  
              </div>)}         
            </div>
          </div>        
        </div>
      )
    }
  }

export default Query
