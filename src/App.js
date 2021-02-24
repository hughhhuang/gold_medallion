import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Router>
          {/* <Sidebar /> */}
          <Route path='/' component={Main} />
        </Router>
      </div>
    )
  }
}

export default App
