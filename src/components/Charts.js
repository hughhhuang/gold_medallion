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
    let dataPie = {
      labels: ["40%", "20%", "40%"],
      series: [40, 20, 40]
    }
    let dataSales = {
      labels: [
        "9:00AM",
        "12:00AM",
        "3:00PM",
        "6:00PM",
        "9:00PM",
        "12:00PM",
        "3:00AM",
        "6:00AM"
      ],
      series: [
        [287, 385, 490, 492, 554, 586, 698, 695],
        [67, 152, 143, 240, 287, 335, 435, 437],
        [23, 113, 67, 108, 190, 239, 307, 308]
      ]
    }
    return (
        <div className="content border2">
            <div className="container-fluid">
                <div className="row">
                    < Query />
                </div>
                <div className="row">
                    <h2 className="page-header">
                        Your estimated fare is <span id="estimated-fare"></span>
                    </h2>
                </div><br></br>
                <div>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="first">Price Change Since 2018</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="second">View Real Time NYC COVID Data</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header ">
                                            <h4 className="card-title">Users Behavior</h4>
                                            <p className="card-category">24 Hours performance</p>
                                        </div>
                                        <div className="card-body ">
                                            <ChartistGraph data={dataSales} type="Line" />
                                        </div>
                                        <div className="card-footer ">
                                            <div className="legend">
                                                <i className="fa fa-circle text-info"></i> Open
                                                <i className="fa fa-circle text-danger"></i> Click
                                                <i className="fa fa-circle text-warning"></i> Click Second Time
                                            </div>
                                            <hr />
                                            <div className="stats">
                                                <i className="fa fa-history"></i> Updated 3 minutes ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <Sonnet /> */}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <iframe src="https://public.tableau.com/views/COVID-19VaccinationTracker/Geography?:language=en&:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=y&:origin=viz_share_link?:showVizHome=no&:embed=true" width="705" height="1385"></iframe>
                                {/* <Sonnet /> */}
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
                
                    {/* <div className="col-md-4">
                        <div className="card ">
                            <div className="card-header ">
                                <h4 className="card-title">Email Statistics</h4>
                                <p className="card-category">Last Campaign Performance</p>
                            </div>
                            <div className="card-body ">
                                <ChartistGraph data={dataPie} type="Pie" />
                                <div className="legend">
                                    <i className="fa fa-circle text-info"></i> Open
                                                        <i className="fa fa-circle text-danger"></i> Bounce
                                                        <i className="fa fa-circle text-warning"></i> Unsubscribe
                                </div>
                                <hr />
                                <div className="stats">
                                    <i className="fa fa-clock-o"></i> Campaign sent 2 days ago
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        
    )
  }
}

export default Charts