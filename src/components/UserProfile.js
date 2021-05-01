import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import face0 from "../assets/img/faces/face-0.jpg"
import { Row, Form, Col, Modal, Button } from 'react-bootstrap';
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// import StarRating from 'react-star-rating'

import {username} from "./LoginSignUp";
import { client } from './Jumbotron';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    //TODO need to add date as an additional field
    // var rideToEdit=JSON.parse(props.location.state)
    this.state = {
      username: username,
      firstname: ' ',
      lastname: ' ',
      age: 0,
      prefride: ' ',
      newPrefride: ' ',
      vaccine: ' ',
      homezone: 0,
      newHomezone: 0,
      zipcode: 0,
      favzoneid: 0,
      newFavzoneid: 0,
      // zoneData: [],
      zoneData: [{"zoneid": 1, "zonename": "Newark Airport", "boroughName": "EWR"}, {"zoneid": 2, "zonename": "Jamaica Bay", "boroughName": "Queens"}, {"zoneid": 3, "zonename": "Allerton/Pelham Gardens", "boroughName": "Bronx"}, {"zoneid": 4, "zonename": "Alphabet City", "boroughName": "Manhattan"}, {"zoneid": 5, "zonename": "Arden Heights", "boroughName": "Staten Island"}, {"zoneid": 6, "zonename": "Arrochar/Fort Wadsworth", "boroughName": "Staten Island"}, {"zoneid": 7, "zonename": "Astoria", "boroughName": "Queens"}, {"zoneid": 8, "zonename": "Astoria Park", "boroughName": "Queens"}, {"zoneid": 9, "zonename": "Auburndale", "boroughName": "Queens"}, {"zoneid": 10, "zonename": "Baisley Park", "boroughName": "Queens"}, {"zoneid": 11, "zonename": "Bath Beach", "boroughName": "Brooklyn"}, {"zoneid": 12, "zonename": "Battery Park", "boroughName": "Manhattan"}, {"zoneid": 13, "zonename": "Battery Park City", "boroughName": "Manhattan"}, {"zoneid": 14, "zonename": "Bay Ridge", "boroughName": "Brooklyn"}, {"zoneid": 15, "zonename": "Bay Terrace/Fort Totten", "boroughName": "Queens"}, {"zoneid": 16, "zonename": "Bayside", "boroughName": "Queens"}, {"zoneid": 17, "zonename": "Bedford", "boroughName": "Brooklyn"}, {"zoneid": 18, "zonename": "Bedford Park", "boroughName": "Bronx"}, {"zoneid": 19, "zonename": "Bellerose", "boroughName": "Queens"}, {"zoneid": 20, "zonename": "Belmont", "boroughName": "Bronx"}, {"zoneid": 21, "zonename": "Bensonhurst East", "boroughName": "Brooklyn"}, {"zoneid": 22, "zonename": "Bensonhurst West", "boroughName": "Brooklyn"}, {"zoneid": 23, "zonename": "Bloomfield/Emerson Hill", "boroughName": "Staten Island"}, {"zoneid": 24, "zonename": "Bloomingdale", "boroughName": "Manhattan"}, {"zoneid": 25, "zonename": "Boerum Hill", "boroughName": "Brooklyn"}, {"zoneid": 26, "zonename": "Borough Park", "boroughName": "Brooklyn"}, {"zoneid": 27, "zonename": "Breezy Point/Fort Tilden/Riis Beach", "boroughName": "Queens"}, {"zoneid": 28, "zonename": "Briarwood/Jamaica Hills", "boroughName": "Queens"}, {"zoneid": 29, "zonename": "Brighton Beach", "boroughName": "Brooklyn"}, {"zoneid": 30, "zonename": "Broad Channel", "boroughName": "Queens"}, {"zoneid": 31, "zonename": "Bronx Park", "boroughName": "Bronx"}, {"zoneid": 32, "zonename": "Bronxdale", "boroughName": "Bronx"}, {"zoneid": 33, "zonename": "Brooklyn Heights", "boroughName": "Brooklyn"}, {"zoneid": 34, "zonename": "Brooklyn Navy Yard", "boroughName": "Brooklyn"}, {"zoneid": 35, "zonename": "Brownsville", "boroughName": "Brooklyn"}, {"zoneid": 36, "zonename": "Bushwick North", "boroughName": "Brooklyn"}, {"zoneid": 37, "zonename": "Bushwick South", "boroughName": "Brooklyn"}, {"zoneid": 38, "zonename": "Cambria Heights", "boroughName": "Queens"}, {"zoneid": 39, "zonename": "Canarsie", "boroughName": "Brooklyn"}, {"zoneid": 40, "zonename": "Carroll Gardens", "boroughName": "Brooklyn"}, {"zoneid": 41, "zonename": "Central Harlem", "boroughName": "Manhattan"}, {"zoneid": 42, "zonename": "Central Harlem North", "boroughName": "Manhattan"}, {"zoneid": 43, "zonename": "Central Park", "boroughName": "Manhattan"}, {"zoneid": 44, "zonename": "Charleston/Tottenville", "boroughName": "Staten Island"}, {"zoneid": 45, "zonename": "Chinatown", "boroughName": "Manhattan"}, {"zoneid": 46, "zonename": "City Island", "boroughName": "Bronx"}, {"zoneid": 47, "zonename": "Claremont/Bathgate", "boroughName": "Bronx"}, {"zoneid": 48, "zonename": "Clinton East", "boroughName": "Manhattan"}, {"zoneid": 49, "zonename": "Clinton Hill", "boroughName": "Brooklyn"}, {"zoneid": 50, "zonename": "Clinton West", "boroughName": "Manhattan"}, {"zoneid": 51, "zonename": "Co-Op City", "boroughName": "Bronx"}, {"zoneid": 52, "zonename": "Cobble Hill", "boroughName": "Brooklyn"}, {"zoneid": 53, "zonename": "College Point", "boroughName": "Queens"}, {"zoneid": 54, "zonename": "Columbia Street", "boroughName": "Brooklyn"}, {"zoneid": 55, "zonename": "Coney Island", "boroughName": "Brooklyn"}, {"zoneid": 56, "zonename": "Corona", "boroughName": "Queens"}, {"zoneid": 57, "zonename": "Corona", "boroughName": "Queens"}, {"zoneid": 58, "zonename": "Country Club", "boroughName": "Bronx"}, {"zoneid": 59, "zonename": "Crotona Park", "boroughName": "Bronx"}, {"zoneid": 60, "zonename": "Crotona Park East", "boroughName": "Bronx"}, {"zoneid": 61, "zonename": "Crown Heights North", "boroughName": "Brooklyn"}, {"zoneid": 62, "zonename": "Crown Heights South", "boroughName": "Brooklyn"}, {"zoneid": 63, "zonename": "Cypress Hills", "boroughName": "Brooklyn"}, {"zoneid": 64, "zonename": "Douglaston", "boroughName": "Queens"}, {"zoneid": 65, "zonename": "Downtown Brooklyn/MetroTech", "boroughName": "Brooklyn"}, {"zoneid": 66, "zonename": "DUMBO/Vinegar Hill", "boroughName": "Brooklyn"}, {"zoneid": 67, "zonename": "Dyker Heights", "boroughName": "Brooklyn"}, {"zoneid": 68, "zonename": "East Chelsea", "boroughName": "Manhattan"}, {"zoneid": 69, "zonename": "East Concourse/Concourse Village", "boroughName": "Bronx"}, {"zoneid": 70, "zonename": "East Elmhurst", "boroughName": "Queens"}, {"zoneid": 71, "zonename": "East Flatbush/Farragut", "boroughName": "Brooklyn"}, {"zoneid": 72, "zonename": "East Flatbush/Remsen Village", "boroughName": "Brooklyn"}, {"zoneid": 73, "zonename": "East Flushing", "boroughName": "Queens"}, {"zoneid": 74, "zonename": "East Harlem North", "boroughName": "Manhattan"}, {"zoneid": 75, "zonename": "East Harlem South", "boroughName": "Manhattan"}, {"zoneid": 76, "zonename": "East New York", "boroughName": "Brooklyn"}, {"zoneid": 77, "zonename": "East New York/Pennsylvania Avenue", "boroughName": "Brooklyn"}, {"zoneid": 78, "zonename": "East Tremont", "boroughName": "Bronx"}, {"zoneid": 79, "zonename": "East Village", "boroughName": "Manhattan"}, {"zoneid": 80, "zonename": "East Williamsburg", "boroughName": "Brooklyn"}, {"zoneid": 81, "zonename": "Eastchester", "boroughName": "Bronx"}, {"zoneid": 82, "zonename": "Elmhurst", "boroughName": "Queens"}, {"zoneid": 83, "zonename": "Elmhurst/Maspeth", "boroughName": "Queens"}, {"zoneid": 84, "zonename": "Eltingville/Annadale/Prince's Bay", "boroughName": "Staten Island"}, {"zoneid": 85, "zonename": "Erasmus", "boroughName": "Brooklyn"}, {"zoneid": 86, "zonename": "Far Rockaway", "boroughName": "Queens"}, {"zoneid": 87, "zonename": "Financial District North", "boroughName": "Manhattan"}, {"zoneid": 88, "zonename": "Financial District South", "boroughName": "Manhattan"}, {"zoneid": 89, "zonename": "Flatbush/Ditmas Park", "boroughName": "Brooklyn"}, {"zoneid": 90, "zonename": "Flatiron", "boroughName": "Manhattan"}, {"zoneid": 91, "zonename": "Flatlands", "boroughName": "Brooklyn"}, {"zoneid": 92, "zonename": "Flushing", "boroughName": "Queens"}, {"zoneid": 93, "zonename": "Flushing Meadows-Corona Park", "boroughName": "Queens"}, {"zoneid": 94, "zonename": "Fordham South", "boroughName": "Bronx"}, {"zoneid": 95, "zonename": "Forest Hills", "boroughName": "Queens"}, {"zoneid": 96, "zonename": "Forest Park/Highland Park", "boroughName": "Queens"}, {"zoneid": 97, "zonename": "Fort Greene", "boroughName": "Brooklyn"}, {"zoneid": 98, "zonename": "Fresh Meadows", "boroughName": "Queens"}, {"zoneid": 99, "zonename": "Freshkills Park", "boroughName": "Staten Island"}, {"zoneid": 100, "zonename": "Garment District", "boroughName": "Manhattan"}, {"zoneid": 101, "zonename": "Glen Oaks", "boroughName": "Queens"}, {"zoneid": 102, "zonename": "Glendale", "boroughName": "Queens"}, {"zoneid": 103, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 104, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 105, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 106, "zonename": "Gowanus", "boroughName": "Brooklyn"}, {"zoneid": 107, "zonename": "Gramercy", "boroughName": "Manhattan"}, {"zoneid": 108, "zonename": "Gravesend", "boroughName": "Brooklyn"}, {"zoneid": 109, "zonename": "Great Kills", "boroughName": "Staten Island"}, {"zoneid": 110, "zonename": "Great Kills Park", "boroughName": "Staten Island"}, {"zoneid": 111, "zonename": "Green-Wood Cemetery", "boroughName": "Brooklyn"}, {"zoneid": 112, "zonename": "Greenpoint", "boroughName": "Brooklyn"}, {"zoneid": 113, "zonename": "Greenwich Village North", "boroughName": "Manhattan"}, {"zoneid": 114, "zonename": "Greenwich Village South", "boroughName": "Manhattan"}, {"zoneid": 115, "zonename": "Grymes Hill/Clifton", "boroughName": "Staten Island"}, {"zoneid": 116, "zonename": "Hamilton Heights", "boroughName": "Manhattan"}, {"zoneid": 117, "zonename": "Hammels/Arverne", "boroughName": "Queens"}, {"zoneid": 118, "zonename": "Heartland Village/Todt Hill", "boroughName": "Staten Island"}, {"zoneid": 119, "zonename": "Highbridge", "boroughName": "Bronx"}, {"zoneid": 120, "zonename": "Highbridge Park", "boroughName": "Manhattan"}, {"zoneid": 121, "zonename": "Hillcrest/Pomonok", "boroughName": "Queens"}, {"zoneid": 122, "zonename": "Hollis", "boroughName": "Queens"}, {"zoneid": 123, "zonename": "Homecrest", "boroughName": "Brooklyn"}, {"zoneid": 124, "zonename": "Howard Beach", "boroughName": "Queens"}, {"zoneid": 125, "zonename": "Hudson Sq", "boroughName": "Manhattan"}, {"zoneid": 126, "zonename": "Hunts Point", "boroughName": "Bronx"}, {"zoneid": 127, "zonename": "Inwood", "boroughName": "Manhattan"}, {"zoneid": 128, "zonename": "Inwood Hill Park", "boroughName": "Manhattan"}, {"zoneid": 129, "zonename": "Jackson Heights", "boroughName": "Queens"}, {"zoneid": 130, "zonename": "Jamaica", "boroughName": "Queens"}, {"zoneid": 131, "zonename": "Jamaica Estates", "boroughName": "Queens"}, {"zoneid": 132, "zonename": "JFK Airport", "boroughName": "Queens"}, {"zoneid": 133, "zonename": "Kensington", "boroughName": "Brooklyn"}, {"zoneid": 134, "zonename": "Kew Gardens", "boroughName": "Queens"}, {"zoneid": 135, "zonename": "Kew Gardens Hills", "boroughName": "Queens"}, {"zoneid": 136, "zonename": "Kingsbridge Heights", "boroughName": "Bronx"}, {"zoneid": 137, "zonename": "Kips Bay", "boroughName": "Manhattan"}, {"zoneid": 138, "zonename": "LaGuardia Airport", "boroughName": "Queens"}, {"zoneid": 139, "zonename": "Laurelton", "boroughName": "Queens"}, {"zoneid": 140, "zonename": "Lenox Hill East", "boroughName": "Manhattan"}, {"zoneid": 141, "zonename": "Lenox Hill West", "boroughName": "Manhattan"}, {"zoneid": 142, "zonename": "Lincoln Square East", "boroughName": "Manhattan"}, {"zoneid": 143, "zonename": "Lincoln Square West", "boroughName": "Manhattan"}, {"zoneid": 144, "zonename": "Little Italy/NoLiTa", "boroughName": "Manhattan"}, {"zoneid": 145, "zonename": "Long Island City/Hunters Point", "boroughName": "Queens"}, {"zoneid": 146, "zonename": "Long Island City/Queens Plaza", "boroughName": "Queens"}, {"zoneid": 147, "zonename": "Longwood", "boroughName": "Bronx"}, {"zoneid": 148, "zonename": "Lower East Side", "boroughName": "Manhattan"}, {"zoneid": 149, "zonename": "Madison", "boroughName": "Brooklyn"}, {"zoneid": 150, "zonename": "Manhattan Beach", "boroughName": "Brooklyn"}, {"zoneid": 151, "zonename": "Manhattan Valley", "boroughName": "Manhattan"}, {"zoneid": 152, "zonename": "Manhattanville", "boroughName": "Manhattan"}, {"zoneid": 153, "zonename": "Marble Hill", "boroughName": "Manhattan"}, {"zoneid": 154, "zonename": "Marine Park/Floyd Bennett Field", "boroughName": "Brooklyn"}, {"zoneid": 155, "zonename": "Marine Park/Mill Basin", "boroughName": "Brooklyn"}, {"zoneid": 156, "zonename": "Mariners Harbor", "boroughName": "Staten Island"}, {"zoneid": 157, "zonename": "Maspeth", "boroughName": "Queens"}, {"zoneid": 158, "zonename": "Meatpacking/West Village West", "boroughName": "Manhattan"}, {"zoneid": 159, "zonename": "Melrose South", "boroughName": "Bronx"}, {"zoneid": 160, "zonename": "Middle Village", "boroughName": "Queens"}, {"zoneid": 161, "zonename": "Midtown Center", "boroughName": "Manhattan"}, {"zoneid": 162, "zonename": "Midtown East", "boroughName": "Manhattan"}, {"zoneid": 163, "zonename": "Midtown North", "boroughName": "Manhattan"}, {"zoneid": 164, "zonename": "Midtown South", "boroughName": "Manhattan"}, {"zoneid": 165, "zonename": "Midwood", "boroughName": "Brooklyn"}, {"zoneid": 166, "zonename": "Morningside Heights", "boroughName": "Manhattan"}, {"zoneid": 167, "zonename": "Morrisania/Melrose", "boroughName": "Bronx"}, {"zoneid": 168, "zonename": "Mott Haven/Port Morris", "boroughName": "Bronx"}, {"zoneid": 169, "zonename": "Mount Hope", "boroughName": "Bronx"}, {"zoneid": 170, "zonename": "Murray Hill", "boroughName": "Manhattan"}, {"zoneid": 171, "zonename": "Murray Hill-Queens", "boroughName": "Queens"}, {"zoneid": 172, "zonename": "New Dorp/Midland Beach", "boroughName": "Staten Island"}, {"zoneid": 173, "zonename": "North Corona", "boroughName": "Queens"}, {"zoneid": 174, "zonename": "Norwood", "boroughName": "Bronx"}, {"zoneid": 175, "zonename": "Oakland Gardens", "boroughName": "Queens"}, {"zoneid": 176, "zonename": "Oakwood", "boroughName": "Staten Island"}, {"zoneid": 177, "zonename": "Ocean Hill", "boroughName": "Brooklyn"}, {"zoneid": 178, "zonename": "Ocean Parkway South", "boroughName": "Brooklyn"}, {"zoneid": 179, "zonename": "Old Astoria", "boroughName": "Queens"}, {"zoneid": 180, "zonename": "Ozone Park", "boroughName": "Queens"}, {"zoneid": 181, "zonename": "Park Slope", "boroughName": "Brooklyn"}, {"zoneid": 182, "zonename": "Parkchester", "boroughName": "Bronx"}, {"zoneid": 183, "zonename": "Pelham Bay", "boroughName": "Bronx"}, {"zoneid": 184, "zonename": "Pelham Bay Park", "boroughName": "Bronx"}, {"zoneid": 185, "zonename": "Pelham Parkway", "boroughName": "Bronx"}, {"zoneid": 186, "zonename": "Penn Station/Madison Sq West", "boroughName": "Manhattan"}, {"zoneid": 187, "zonename": "Port Richmond", "boroughName": "Staten Island"}, {"zoneid": 188, "zonename": "Prospect-Lefferts Gardens", "boroughName": "Brooklyn"}, {"zoneid": 189, "zonename": "Prospect Heights", "boroughName": "Brooklyn"}, {"zoneid": 190, "zonename": "Prospect Park", "boroughName": "Brooklyn"}, {"zoneid": 191, "zonename": "Queens Village", "boroughName": "Queens"}, {"zoneid": 192, "zonename": "Queensboro Hill", "boroughName": "Queens"}, {"zoneid": 193, "zonename": "Queensbridge/Ravenswood", "boroughName": "Queens"}, {"zoneid": 194, "zonename": "Randalls Island", "boroughName": "Manhattan"}, {"zoneid": 195, "zonename": "Red Hook", "boroughName": "Brooklyn"}, {"zoneid": 196, "zonename": "Rego Park", "boroughName": "Queens"}, {"zoneid": 197, "zonename": "Richmond Hill", "boroughName": "Queens"}, {"zoneid": 198, "zonename": "Ridgewood", "boroughName": "Queens"}, {"zoneid": 199, "zonename": "Rikers Island", "boroughName": "Bronx"}, {"zoneid": 200, "zonename": "Riverdale/North Riverdale/Fieldston", "boroughName": "Bronx"}, {"zoneid": 201, "zonename": "Rockaway Park", "boroughName": "Queens"}, {"zoneid": 202, "zonename": "Roosevelt Island", "boroughName": "Manhattan"}, {"zoneid": 203, "zonename": "Rosedale", "boroughName": "Queens"}, {"zoneid": 204, "zonename": "Rossville/Woodrow", "boroughName": "Staten Island"}, {"zoneid": 205, "zonename": "Saint Albans", "boroughName": "Queens"}, {"zoneid": 206, "zonename": "Saint George/New Brighton", "boroughName": "Staten Island"}, {"zoneid": 207, "zonename": "Saint Michaels Cemetery/Woodside", "boroughName": "Queens"}, {"zoneid": 208, "zonename": "Schuylerville/Edgewater Park", "boroughName": "Bronx"}, {"zoneid": 209, "zonename": "Seaport", "boroughName": "Manhattan"}, {"zoneid": 210, "zonename": "Sheepshead Bay", "boroughName": "Brooklyn"}, {"zoneid": 211, "zonename": "SoHo", "boroughName": "Manhattan"}, {"zoneid": 212, "zonename": "Soundview/Bruckner", "boroughName": "Bronx"}, {"zoneid": 213, "zonename": "Soundview/Castle Hill", "boroughName": "Bronx"}, {"zoneid": 214, "zonename": "South Beach/Dongan Hills", "boroughName": "Staten Island"}, {"zoneid": 215, "zonename": "South Jamaica", "boroughName": "Queens"}, {"zoneid": 216, "zonename": "South Ozone Park", "boroughName": "Queens"}, {"zoneid": 217, "zonename": "South Williamsburg", "boroughName": "Brooklyn"}, {"zoneid": 218, "zonename": "Springfield Gardens North", "boroughName": "Queens"}, {"zoneid": 219, "zonename": "Springfield Gardens South", "boroughName": "Queens"}, {"zoneid": 220, "zonename": "Spuyten Duyvil/Kingsbridge", "boroughName": "Bronx"}, {"zoneid": 221, "zonename": "Stapleton", "boroughName": "Staten Island"}, {"zoneid": 222, "zonename": "Starrett City", "boroughName": "Brooklyn"}, {"zoneid": 223, "zonename": "Steinway", "boroughName": "Queens"}, {"zoneid": 224, "zonename": "Stuy Town/Peter Cooper Village", "boroughName": "Manhattan"}, {"zoneid": 225, "zonename": "Stuyvesant Heights", "boroughName": "Brooklyn"}, {"zoneid": 226, "zonename": "Sunnyside", "boroughName": "Queens"}, {"zoneid": 227, "zonename": "Sunset Park East", "boroughName": "Brooklyn"}, {"zoneid": 228, "zonename": "Sunset Park West", "boroughName": "Brooklyn"}, {"zoneid": 229, "zonename": "Sutton Place/Turtle Bay North", "boroughName": "Manhattan"}, {"zoneid": 230, "zonename": "Times Sq/Theatre District", "boroughName": "Manhattan"}, {"zoneid": 231, "zonename": "TriBeCa/Civic Center", "boroughName": "Manhattan"}, {"zoneid": 232, "zonename": "Two Bridges/Seward Park", "boroughName": "Manhattan"}, {"zoneid": 233, "zonename": "UN/Turtle Bay South", "boroughName": "Manhattan"}, {"zoneid": 234, "zonename": "Union Sq", "boroughName": "Manhattan"}, {"zoneid": 235, "zonename": "University Heights/Morris Heights", "boroughName": "Bronx"}, {"zoneid": 236, "zonename": "Upper East Side North", "boroughName": "Manhattan"}, {"zoneid": 237, "zonename": "Upper East Side South", "boroughName": "Manhattan"}, {"zoneid": 238, "zonename": "Upper West Side North", "boroughName": "Manhattan"}, {"zoneid": 239, "zonename": "Upper West Side South", "boroughName": "Manhattan"}, {"zoneid": 240, "zonename": "Van Cortlandt Park", "boroughName": "Bronx"}, {"zoneid": 241, "zonename": "Van Cortlandt Village", "boroughName": "Bronx"}, {"zoneid": 242, "zonename": "Van Nest/Morris Park", "boroughName": "Bronx"}, {"zoneid": 243, "zonename": "Washington Heights North", "boroughName": "Manhattan"}, {"zoneid": 244, "zonename": "Washington Heights South", "boroughName": "Manhattan"}, {"zoneid": 245, "zonename": "West Brighton", "boroughName": "Staten Island"}, {"zoneid": 246, "zonename": "West Chelsea/Hudson Yards", "boroughName": "Manhattan"}, {"zoneid": 247, "zonename": "West Concourse", "boroughName": "Bronx"}, {"zoneid": 248, "zonename": "West Farms/Bronx River", "boroughName": "Bronx"}, {"zoneid": 249, "zonename": "West Village", "boroughName": "Manhattan"}, {"zoneid": 250, "zonename": "Westchester Village/Unionport", "boroughName": "Bronx"}, {"zoneid": 251, "zonename": "Westerleigh", "boroughName": "Staten Island"}, {"zoneid": 252, "zonename": "Whitestone", "boroughName": "Queens"}, {"zoneid": 253, "zonename": "Willets Point", "boroughName": "Queens"}, {"zoneid": 254, "zonename": "Williamsbridge/Olinville", "boroughName": "Bronx"}, {"zoneid": 255, "zonename": "Williamsburg (North Side)", "boroughName": "Brooklyn"}, {"zoneid": 256, "zonename": "Williamsburg (South Side)", "boroughName": "Brooklyn"}, {"zoneid": 257, "zonename": "Windsor Terrace", "boroughName": "Brooklyn"}, {"zoneid": 258, "zonename": "Woodhaven", "boroughName": "Queens"}, {"zoneid": 259, "zonename": "Woodlawn/Wakefield", "boroughName": "Bronx"}, {"zoneid": 260, "zonename": "Woodside", "boroughName": "Queens"}, {"zoneid": 261, "zonename": "World Trade Center", "boroughName": "Manhattan"}, {"zoneid": 262, "zonename": "Yorkville East", "boroughName": "Manhattan"}, {"zoneid": 263, "zonename": "Yorkville West", "boroughName": "Manhattan"}, {"zoneid": 264, "zonename": "NV", "boroughName": "Unknown"}, {"zoneid": 265, "zonename": "NA", "boroughName": "Unknown"}],
      minspend:10,
      maxspend:20,
      minDist:20,
      maxDist:40,
      maxTime:20,
      showSuggestions: false,
      userNeigh: [],
      userZones: [],
      recommendedRides: []
    }
     
    this.handleClick = this.handleClick.bind(this);
    this.handlePreferences = this.handlePreferences.bind(this);
  }


  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  handleClick(e) {
    // Updating the user's information in the user table
    e.preventDefault();
    try{
      const url = "http://172.22.152.9:8000/api/editusertable/";
      const response = fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          firstname: document.getElementById("new-firstname").value,
          lastname: document.getElementById("new-lastname").value,
          age: document.getElementById("new-age").value,
          prefride: this.state.newPrefride.value,
          vaccine: document.getElementById("new-vaccine").value,
          zoneid: this.state.newHomezone.value,
          zipcode: parseInt(document.getElementById("new-zipcode").value),
          favzoneid: this.state.newFavzoneid.value,
          minspend: this.state.minspend,
          maxspend: this.state.maxspend,
          minRideDistance: this.state.minDist,
          maxRideDistance: this.state.maxDist,
          maxRideTime: this.state.maxTime,
          favborough: this.state.zoneData[this.state.newFavzoneid.value-1].boroughname
        })
      })
      .then(res => res.json())
      .then(data => {
        window.location.href = '/profile';
      })
      .catch(error => {
        if (error.toString() === "SyntaxError: Unexpected token I in JSON at position 0"){
          alert("Please enter a valid NYC zipcode");
        }
        else if (error.toString() === "SyntaxError: Unexpected token K in JSON at position 0"){
          alert("Please select an option from the dropdown menu")
        }
        else{
          alert(error.toString())
          console.log(error.toString())
        }
      })  
            
    }
    catch(err){
      alert(err)
      console.log(err)
    }
  }

  
  handlePreferences(e) {
    // Updating the user's ride preferences in the user table
    e.preventDefault();
    try{
      const url = "http://172.22.152.9:8000/api/planRide/";
      const response = fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username.toString(),
          minspend: this.state.minspend,
          maxspend: this.state.maxspend,
          vaccpref: parseInt(this.state.vaccine),
          minridedistance: this.state.minDist,
          maxridedistance: this.state.maxDist,
          maxridetime: document.getElementById("minutes").value
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const neighUrl = "http://172.22.152.9:8000/api/getUserNeighborhoods/";
        const response = fetch(neighUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            firstname: " ",
            lastname: " ",
            age: 1,
            prefride: " ",
            vaccine: " ",
            zoneid: 1,
            zipcode: 11101,
            favzoneid: 1,
            favborough: " ",
            minspend: 0,
            maxspend: 1,
            vaccpref: 1,
            minridedistance: 0,
            maxridedistance: 1,
            maxridetime: 1
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.setState({
            userNeigh: data,
          })
        })

        const zoneUrl = "http://172.22.152.9:8000/api/getUserZoneIDs/";
        const zoneResponse = fetch(zoneUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            firstname: " ",
            lastname: " ",
            age: 1,
            prefride: " ",
            vaccine: " ",
            zoneid: 1,
            zipcode: 11101,
            favzoneid: 1,
            favborough: " ",
            minspend: 0,
            maxspend: 1,
            vaccpref: 1,
            minridedistance: 0,
            maxridedistance: 1,
            maxridetime: 1
          })
        }).then(res => res.json())
        .then(data => {
          let userZoneIds = [];
          for (var zone in data){
            userZoneIds.push(data[zone].zoneID);
          }
          this.setState({
            userZones: userZoneIds,
          })

          // Getting recommended rides
          var inputObj = {
            "function":"getUserRideRecommendations",
            "userZone":this.state.newHomezone,
            "zoneIds": this.state.userZones,
            "minSpendature": this.state.minspend,
            "maxSpendature": this.state.maxspend,
            "maxDistance": this.state.maxDist
          };
          console.log(this.state.newHomezone)
          console.log(this.state.userZones)
          console.log(this.state.minspend)
          console.log(this.state.maxspend)
          console.log(this.state.maxDist)
          client.send(JSON.stringify(inputObj));
          client.onmessage = (message) => {
            var result=JSON.parse(message.data);
            console.log(result)
            this.setState({
              recommendedRides: result.recommendations
            });
          }
        })
      }).then(data => {
        this.setState({
          showSuggestions: true
        })
      })
      .catch(error => {
        alert(error.toString());
      }) 
    }
    catch(err){
      alert(err);
    }
  }

  handleChangePrefRide = (newPrefride) => {
    this.setState({ newPrefride });
    console.log(`Option selected:`, newPrefride);
  }

  handleChangeHomeZone = (newHomezone) => {
    this.setState({ newHomezone });
    console.log(`Option selected:`, newHomezone);
  }

  handleChangeFavZone = (newFavzoneid) => {
    this.setState({ newFavzoneid });
    console.log(`Option selected:`, newFavzoneid);
  }

  handleChangeSpend = (spendRange) => {
    this.setState({
      minspend: spendRange[0],
      maxspend: spendRange[1]
    })
  }

  handleChangeDistance = (distRange) => {
    this.setState({
      minDist: distRange[0],
      maxDist: distRange[1]
    })
  }


  async componentWillMount() {

    //Getting data for zones
    const zonesUrl = "http://172.22.152.9:8000/api/nygm/?format=json"
    const zonesRes = await fetch(zonesUrl);
    const zones = await zonesRes.json();
    
    this.setState(state=> ({
        zoneData: zones,
    }))

    // Getting user data from the user table
    const userTableUrl = "http://172.22.152.9:8000/api/usertable/?format=json";
    const userTableRes = await fetch(userTableUrl);
    const user = await userTableRes.json();
    for (var u in user){
      if (user[u].username === this.state.username){
        this.setState(state=> ({
          firstname: user[u].firstname,
          lastname: user[u].lastname,
          age: user[u].age,
          prefride: user[u].prefride,
          vaccine: user[u].vaccine,
          zoneid: this.state.zoneData[user[u].zoneid-1].zonename,
          newHomezone: this.state.zoneData[user[u].zoneid-1].zoneid,
          zipcode: user[u].zipcode,
          favzoneid: this.state.zoneData[user[u].favzoneid-1].zonename,
          newFavzoneid: this.state.zoneData[user[u].favzoneid-1].zoneid
        }))
      }
    }
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    }
    client.onmessage = (message) => {
      var result=JSON.parse(message.data);
    };
  
  }

  render() {

    let taxiType = [{value:'Sedan',label:'Sedan'},{value:'SUV',label:'SUV'},{value:'Compact SUV',label:'Compact SUV'}];
    let vaccineOptions = []
    // Creating zones for the select options
    let zones = this.state.zoneData;
    let zoneOptions = [{}];
    zones.map((zone) =>
        zoneOptions.push({
            value : zone.zoneid,
            label : zone.zonename
        })
    );
    // Adding marks for slider
    const budgetMarks = {
      0: '$0', 10: '$10', 20: '$20', 30: '$30', 40: '$40', 50: '$50',
      60: '$60', 70: '$70', 80: '$80', 90: '$90', 100: '$100',
    }

    const distanceMarks = {
      0: '0', 10: '10', 20: '20', 30: '30', 40: '40', 50: '50'
    }
    return (
      <div className="content"> 
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 text-align-center">
              <div className="card card-user">
                <div className="card-image">
                  <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..." />
                </div>
                <div className="card-body">
                  <div className="author">
                      <img className="avatar border-gray" src={face0} alt="..." />
                      <h3 className="general-font">{this.state.firstname} {this.state.lastname}</h3>
                    <h5>
                      <b>{username}</b>
                    </h5>
                    <h5 className="mt-5"><u>View My Information</u></h5>
                    <div className="row ml-0 mr-0">
                      <div className="col">
                        <table>
                          <tr>
                            <td className="tr">
                              <h5>Age:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.age}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Preferred Ride:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.prefride}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Preferred % Vaccinated of Destination Zone:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.vaccine}%</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Home Zip Code:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.zipcode}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Home Zone:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.zoneid}</h5>
                            </td>
                          </tr>
                          <tr>
                            <td className="tr">
                              <h5>Favorite Zone to Travel To:</h5>
                            </td>
                            <td className="tl">
                              <h5>{this.state.favzoneid}</h5>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <Link className="btn btn-primary yellow-btn" onClick={this.openModal}>
                          <b>Edit User Information</b>
                        </Link>
                      </div>
                    </div>
                  
                    
                  </div>
                </div>
                <hr /> 
              </div>
            </div>
            <div className="col-lg-8 text-align-center">
              <div className="card card-user">
                <div className="card-body">
                  <div className="row">
                    <h4 className="general-font text-center">
                      Adjust the settings below to see personalized ride suggestions
                    </h4>                    
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col">
                      <label className="text-center" for="budget">Adjust budget for trip</label>
                    </div>
                    <Slider.Range id='budget' marks={budgetMarks} defaultValue={[20, 40]} onChange={this.handleChangeSpend}></Slider.Range> 
                  </div><br></br>
                  <div className="row">
                    <div className="col">
                      <label for="miles" className="text-center pr-3">Specify maximum distance of trip (miles)</label>
                    </div>
                    <Slider.Range id='distance' marks={distanceMarks} max={50} defaultValue={[10, 20]} onChange={this.handleChangeDistance}></Slider.Range> 
                  </div>
                  <div className="row pt-2">
                    <div className="col">
                      <label for="minutes" className="text-center pr-2">Specify maximum length of trip (minutes)</label>
                      <input size="5" type="text" id="minutes"></input>
                    </div>
                  </div>
                  <div className="row py-4">
                    <div className="col text-center">
                      <Link className="btn btn-primary yellow-btn" onClick={this.handlePreferences}>
                        <b>See New Ride Suggestions</b>
                      </Link>
                    </div>
                  </div>
                  {this.state.showSuggestions && (<div>
                    <hr/>
                    {this.state.recommendedRides.map(ride => (
                      <div>
                        <div className="mx-3 py-2">
                          {/* <h4 class="general-font my-1">From: {ride.pickupLoc} </h4>
                          <h4 class="general-font my-1">To: {ride.dropoffLoc}</h4> */}
                          <h4 class="general-font my-1">From: {zoneOptions[ride.pickupLoc].label} </h4>
                          <h4 class="general-font mt-1">To: {zoneOptions[ride.dropoffLoc].label}</h4>
                          <p><b>Total Amount: </b>${ride.avgTotalAmount.toFixed(2)}</p>
                          <p><b>Total Trip Distance: </b>{ride.avgTripDistance.toFixed(2)} miles</p>
                          <hr/>
                        </div>
                      </div>
                    ))}
                  </div>)}
                </div>
              </div>
            </div>
              
              {/* <div className="row">
                <div className="card">
                  <div className="card-body">
                    <div className="row ml-4">
                      <h4 className="general-font">User Uploaded Rides</h4>
                    </div>
                    
                    <hr></hr>
                    <div className="row ml-4">
                    <Form >
                      {['checkbox', 'radio'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                          <Form.Check 
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                          />

                          <Form.Check
                            disabled
                            type={type}
                            label={`disabled ${type}`}
                            id={`disabled-default-${type}`}
                          />
                        </div>
                      ))}
                    <Link className="btn btn-primary yellow-btn"  onClick={this.openModal}>
                      <b>Update Selected Ride</b>
                    </Link>
                    </Form> */}
                    <Modal show={this.state.isOpen} onHide={this.closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Updating User Information for <i><b>{username}</b></i></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form id="query-selection" onSubmit={this.handleClick}>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="new-firstname">First Name</label>
                                <input id="new-firstname" defaultValue={this.state.firstname}></input>
                            </div>
                            <div className="col-md-6 text-center">
                                <label for="new-lastname">Last Name</label>
                                <input id="new-lastname" defaultValue={this.state.lastname}></input>                            
                            </div>
                          </div>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="new-age">Age</label>
                                <input id="new-age" defaultValue={this.state.age}></input>
                            </div>
                            <div className="col-md-6 text-center">
                                <label for="new-zipcode">Home Zip Code</label>
                                <input id="new-zipcode" defaultValue={this.state.zipcode}></input>
                            </div>
                          </div>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="new-vaccine">Preferred % Vaccinated of Destination Zone</label>
                                <input type="text" defaultValue={this.state.vaccine} id="new-vaccine" ></input>
                            </div>
                            <div className="col-md-6 text-center">
                                <br/><label for="new-prefride">Preferred Ride</label><br/>
                                <Select id="new-prefride" options={taxiType} onChange={this.handleChangePrefRide}/>                         
                            </div>
                          </div>
                          <div className = "form-row justify-content-center">
                            <div className="col-md-6 text-center">
                                <label for="new-homezone">Home Zone</label>
                                <Select id="new-homezone" options={zoneOptions} onChange={this.handleChangeHomeZone} />                         
                            </div>
                            <div className="col-md-6 text-center">
                                <label for="new-favzone">Favorite Zone to Travel To</label>
                                <Select id="new-favzone" options={zoneOptions} onChange={this.handleChangeFavZone} />                         
                            </div>
                          </div>
                          <div className="form-row py-3 justify-content-center">
                              <button id="query-submit" type="submit">Update User Information</button>   
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
{/*                     
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile