import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Main from './components/Main'

class App extends Component {
  state = {
    username : 'test',
  };

  render() {
    // let url = "http://172.22.152.9:8000/api/auth/jwt/create";
    // let response = fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   }).catch(error => {
    //     console.log("check login")
    //   })
  
    //   console.log(response)
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
