import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './Homepage'
import UserProfile from './UserProfile'
import Calculations from './Calculations'
import Charts from './Charts'

class Main extends Component {
  render() {
    return (
      <div className="main-panel">
        <Navbar />
        <Switch>
          <Route path="/homepage" component={HomePage} />
          <Route path="/charts" component={Charts} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/calculations" component={Calculations} />
          <Redirect from='*' to='/homepage' />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main