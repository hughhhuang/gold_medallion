import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ZoneData extends Component {
    state = {
        loading: true
    }

    async componentDidMount(){
        const url = "http://172.22.152.9:8000/api/nygm/?format=json"
        // const url = "https://api.randomuser.me/"
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }
    render() {
        return (
            <div>
                {this.state.loading ? <div>loading</div> : <div>person..</div>}
            </div>
        )
}
}

export default ZoneData