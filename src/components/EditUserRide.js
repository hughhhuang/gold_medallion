import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import StarRating from 'react-star-rating'

import { client } from './Jumbotron';
import { username } from './LoginSignUp';

class EditUserRide extends Component {

  constructor(props) {
    super(props);
    //TODO need to add date as an additional field
    var rideToEdit=JSON.parse(props.location.state)
    this.state = {
      // zoneData: [{"zoneid": 1, "zonename": "Newark Airport", "boroughName": "EWR"}, {"zoneid": 2, "zonename": "Jamaica Bay", "boroughName": "Queens"}, {"zoneid": 3, "zonename": "Allerton/Pelham Gardens", "boroughName": "Bronx"}, {"zoneid": 4, "zonename": "Alphabet City", "boroughName": "Manhattan"}, {"zoneid": 5, "zonename": "Arden Heights", "boroughName": "Staten Island"}, {"zoneid": 6, "zonename": "Arrochar/Fort Wadsworth", "boroughName": "Staten Island"}, {"zoneid": 7, "zonename": "Astoria", "boroughName": "Queens"}, {"zoneid": 8, "zonename": "Astoria Park", "boroughName": "Queens"}, {"zoneid": 9, "zonename": "Auburndale", "boroughName": "Queens"}, {"zoneid": 10, "zonename": "Baisley Park", "boroughName": "Queens"}, {"zoneid": 11, "zonename": "Bath Beach", "boroughName": "Brooklyn"}, {"zoneid": 12, "zonename": "Battery Park", "boroughName": "Manhattan"}, {"zoneid": 13, "zonename": "Battery Park City", "boroughName": "Manhattan"}, {"zoneid": 14, "zonename": "Bay Ridge", "boroughName": "Brooklyn"}, {"zoneid": 15, "zonename": "Bay Terrace/Fort Totten", "boroughName": "Queens"}, {"zoneid": 16, "zonename": "Bayside", "boroughName": "Queens"}, {"zoneid": 17, "zonename": "Bedford", "boroughName": "Brooklyn"}, {"zoneid": 18, "zonename": "Bedford Park", "boroughName": "Bronx"}, {"zoneid": 19, "zonename": "Bellerose", "boroughName": "Queens"}, {"zoneid": 20, "zonename": "Belmont", "boroughName": "Bronx"}, {"zoneid": 21, "zonename": "Bensonhurst East", "boroughName": "Brooklyn"}, {"zoneid": 22, "zonename": "Bensonhurst West", "boroughName": "Brooklyn"}, {"zoneid": 23, "zonename": "Bloomfield/Emerson Hill", "boroughName": "Staten Island"}, {"zoneid": 24, "zonename": "Bloomingdale", "boroughName": "Manhattan"}, {"zoneid": 25, "zonename": "Boerum Hill", "boroughName": "Brooklyn"}, {"zoneid": 26, "zonename": "Borough Park", "boroughName": "Brooklyn"}, {"zoneid": 27, "zonename": "Breezy Point/Fort Tilden/Riis Beach", "boroughName": "Queens"}, {"zoneid": 28, "zonename": "Briarwood/Jamaica Hills", "boroughName": "Queens"}, {"zoneid": 29, "zonename": "Brighton Beach", "boroughName": "Brooklyn"}, {"zoneid": 30, "zonename": "Broad Channel", "boroughName": "Queens"}, {"zoneid": 31, "zonename": "Bronx Park", "boroughName": "Bronx"}, {"zoneid": 32, "zonename": "Bronxdale", "boroughName": "Bronx"}, {"zoneid": 33, "zonename": "Brooklyn Heights", "boroughName": "Brooklyn"}, {"zoneid": 34, "zonename": "Brooklyn Navy Yard", "boroughName": "Brooklyn"}, {"zoneid": 35, "zonename": "Brownsville", "boroughName": "Brooklyn"}, {"zoneid": 36, "zonename": "Bushwick North", "boroughName": "Brooklyn"}, {"zoneid": 37, "zonename": "Bushwick South", "boroughName": "Brooklyn"}, {"zoneid": 38, "zonename": "Cambria Heights", "boroughName": "Queens"}, {"zoneid": 39, "zonename": "Canarsie", "boroughName": "Brooklyn"}, {"zoneid": 40, "zonename": "Carroll Gardens", "boroughName": "Brooklyn"}, {"zoneid": 41, "zonename": "Central Harlem", "boroughName": "Manhattan"}, {"zoneid": 42, "zonename": "Central Harlem North", "boroughName": "Manhattan"}, {"zoneid": 43, "zonename": "Central Park", "boroughName": "Manhattan"}, {"zoneid": 44, "zonename": "Charleston/Tottenville", "boroughName": "Staten Island"}, {"zoneid": 45, "zonename": "Chinatown", "boroughName": "Manhattan"}, {"zoneid": 46, "zonename": "City Island", "boroughName": "Bronx"}, {"zoneid": 47, "zonename": "Claremont/Bathgate", "boroughName": "Bronx"}, {"zoneid": 48, "zonename": "Clinton East", "boroughName": "Manhattan"}, {"zoneid": 49, "zonename": "Clinton Hill", "boroughName": "Brooklyn"}, {"zoneid": 50, "zonename": "Clinton West", "boroughName": "Manhattan"}, {"zoneid": 51, "zonename": "Co-Op City", "boroughName": "Bronx"}, {"zoneid": 52, "zonename": "Cobble Hill", "boroughName": "Brooklyn"}, {"zoneid": 53, "zonename": "College Point", "boroughName": "Queens"}, {"zoneid": 54, "zonename": "Columbia Street", "boroughName": "Brooklyn"}, {"zoneid": 55, "zonename": "Coney Island", "boroughName": "Brooklyn"}, {"zoneid": 56, "zonename": "Corona", "boroughName": "Queens"}, {"zoneid": 57, "zonename": "Corona", "boroughName": "Queens"}, {"zoneid": 58, "zonename": "Country Club", "boroughName": "Bronx"}, {"zoneid": 59, "zonename": "Crotona Park", "boroughName": "Bronx"}, {"zoneid": 60, "zonename": "Crotona Park East", "boroughName": "Bronx"}, {"zoneid": 61, "zonename": "Crown Heights North", "boroughName": "Brooklyn"}, {"zoneid": 62, "zonename": "Crown Heights South", "boroughName": "Brooklyn"}, {"zoneid": 63, "zonename": "Cypress Hills", "boroughName": "Brooklyn"}, {"zoneid": 64, "zonename": "Douglaston", "boroughName": "Queens"}, {"zoneid": 65, "zonename": "Downtown Brooklyn/MetroTech", "boroughName": "Brooklyn"}, {"zoneid": 66, "zonename": "DUMBO/Vinegar Hill", "boroughName": "Brooklyn"}, {"zoneid": 67, "zonename": "Dyker Heights", "boroughName": "Brooklyn"}, {"zoneid": 68, "zonename": "East Chelsea", "boroughName": "Manhattan"}, {"zoneid": 69, "zonename": "East Concourse/Concourse Village", "boroughName": "Bronx"}, {"zoneid": 70, "zonename": "East Elmhurst", "boroughName": "Queens"}, {"zoneid": 71, "zonename": "East Flatbush/Farragut", "boroughName": "Brooklyn"}, {"zoneid": 72, "zonename": "East Flatbush/Remsen Village", "boroughName": "Brooklyn"}, {"zoneid": 73, "zonename": "East Flushing", "boroughName": "Queens"}, {"zoneid": 74, "zonename": "East Harlem North", "boroughName": "Manhattan"}, {"zoneid": 75, "zonename": "East Harlem South", "boroughName": "Manhattan"}, {"zoneid": 76, "zonename": "East New York", "boroughName": "Brooklyn"}, {"zoneid": 77, "zonename": "East New York/Pennsylvania Avenue", "boroughName": "Brooklyn"}, {"zoneid": 78, "zonename": "East Tremont", "boroughName": "Bronx"}, {"zoneid": 79, "zonename": "East Village", "boroughName": "Manhattan"}, {"zoneid": 80, "zonename": "East Williamsburg", "boroughName": "Brooklyn"}, {"zoneid": 81, "zonename": "Eastchester", "boroughName": "Bronx"}, {"zoneid": 82, "zonename": "Elmhurst", "boroughName": "Queens"}, {"zoneid": 83, "zonename": "Elmhurst/Maspeth", "boroughName": "Queens"}, {"zoneid": 84, "zonename": "Eltingville/Annadale/Prince's Bay", "boroughName": "Staten Island"}, {"zoneid": 85, "zonename": "Erasmus", "boroughName": "Brooklyn"}, {"zoneid": 86, "zonename": "Far Rockaway", "boroughName": "Queens"}, {"zoneid": 87, "zonename": "Financial District North", "boroughName": "Manhattan"}, {"zoneid": 88, "zonename": "Financial District South", "boroughName": "Manhattan"}, {"zoneid": 89, "zonename": "Flatbush/Ditmas Park", "boroughName": "Brooklyn"}, {"zoneid": 90, "zonename": "Flatiron", "boroughName": "Manhattan"}, {"zoneid": 91, "zonename": "Flatlands", "boroughName": "Brooklyn"}, {"zoneid": 92, "zonename": "Flushing", "boroughName": "Queens"}, {"zoneid": 93, "zonename": "Flushing Meadows-Corona Park", "boroughName": "Queens"}, {"zoneid": 94, "zonename": "Fordham South", "boroughName": "Bronx"}, {"zoneid": 95, "zonename": "Forest Hills", "boroughName": "Queens"}, {"zoneid": 96, "zonename": "Forest Park/Highland Park", "boroughName": "Queens"}, {"zoneid": 97, "zonename": "Fort Greene", "boroughName": "Brooklyn"}, {"zoneid": 98, "zonename": "Fresh Meadows", "boroughName": "Queens"}, {"zoneid": 99, "zonename": "Freshkills Park", "boroughName": "Staten Island"}, {"zoneid": 100, "zonename": "Garment District", "boroughName": "Manhattan"}, {"zoneid": 101, "zonename": "Glen Oaks", "boroughName": "Queens"}, {"zoneid": 102, "zonename": "Glendale", "boroughName": "Queens"}, {"zoneid": 103, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 104, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 105, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 106, "zonename": "Gowanus", "boroughName": "Brooklyn"}, {"zoneid": 107, "zonename": "Gramercy", "boroughName": "Manhattan"}, {"zoneid": 108, "zonename": "Gravesend", "boroughName": "Brooklyn"}, {"zoneid": 109, "zonename": "Great Kills", "boroughName": "Staten Island"}, {"zoneid": 110, "zonename": "Great Kills Park", "boroughName": "Staten Island"}, {"zoneid": 111, "zonename": "Green-Wood Cemetery", "boroughName": "Brooklyn"}, {"zoneid": 112, "zonename": "Greenpoint", "boroughName": "Brooklyn"}, {"zoneid": 113, "zonename": "Greenwich Village North", "boroughName": "Manhattan"}, {"zoneid": 114, "zonename": "Greenwich Village South", "boroughName": "Manhattan"}, {"zoneid": 115, "zonename": "Grymes Hill/Clifton", "boroughName": "Staten Island"}, {"zoneid": 116, "zonename": "Hamilton Heights", "boroughName": "Manhattan"}, {"zoneid": 117, "zonename": "Hammels/Arverne", "boroughName": "Queens"}, {"zoneid": 118, "zonename": "Heartland Village/Todt Hill", "boroughName": "Staten Island"}, {"zoneid": 119, "zonename": "Highbridge", "boroughName": "Bronx"}, {"zoneid": 120, "zonename": "Highbridge Park", "boroughName": "Manhattan"}, {"zoneid": 121, "zonename": "Hillcrest/Pomonok", "boroughName": "Queens"}, {"zoneid": 122, "zonename": "Hollis", "boroughName": "Queens"}, {"zoneid": 123, "zonename": "Homecrest", "boroughName": "Brooklyn"}, {"zoneid": 124, "zonename": "Howard Beach", "boroughName": "Queens"}, {"zoneid": 125, "zonename": "Hudson Sq", "boroughName": "Manhattan"}, {"zoneid": 126, "zonename": "Hunts Point", "boroughName": "Bronx"}, {"zoneid": 127, "zonename": "Inwood", "boroughName": "Manhattan"}, {"zoneid": 128, "zonename": "Inwood Hill Park", "boroughName": "Manhattan"}, {"zoneid": 129, "zonename": "Jackson Heights", "boroughName": "Queens"}, {"zoneid": 130, "zonename": "Jamaica", "boroughName": "Queens"}, {"zoneid": 131, "zonename": "Jamaica Estates", "boroughName": "Queens"}, {"zoneid": 132, "zonename": "JFK Airport", "boroughName": "Queens"}, {"zoneid": 133, "zonename": "Kensington", "boroughName": "Brooklyn"}, {"zoneid": 134, "zonename": "Kew Gardens", "boroughName": "Queens"}, {"zoneid": 135, "zonename": "Kew Gardens Hills", "boroughName": "Queens"}, {"zoneid": 136, "zonename": "Kingsbridge Heights", "boroughName": "Bronx"}, {"zoneid": 137, "zonename": "Kips Bay", "boroughName": "Manhattan"}, {"zoneid": 138, "zonename": "LaGuardia Airport", "boroughName": "Queens"}, {"zoneid": 139, "zonename": "Laurelton", "boroughName": "Queens"}, {"zoneid": 140, "zonename": "Lenox Hill East", "boroughName": "Manhattan"}, {"zoneid": 141, "zonename": "Lenox Hill West", "boroughName": "Manhattan"}, {"zoneid": 142, "zonename": "Lincoln Square East", "boroughName": "Manhattan"}, {"zoneid": 143, "zonename": "Lincoln Square West", "boroughName": "Manhattan"}, {"zoneid": 144, "zonename": "Little Italy/NoLiTa", "boroughName": "Manhattan"}, {"zoneid": 145, "zonename": "Long Island City/Hunters Point", "boroughName": "Queens"}, {"zoneid": 146, "zonename": "Long Island City/Queens Plaza", "boroughName": "Queens"}, {"zoneid": 147, "zonename": "Longwood", "boroughName": "Bronx"}, {"zoneid": 148, "zonename": "Lower East Side", "boroughName": "Manhattan"}, {"zoneid": 149, "zonename": "Madison", "boroughName": "Brooklyn"}, {"zoneid": 150, "zonename": "Manhattan Beach", "boroughName": "Brooklyn"}, {"zoneid": 151, "zonename": "Manhattan Valley", "boroughName": "Manhattan"}, {"zoneid": 152, "zonename": "Manhattanville", "boroughName": "Manhattan"}, {"zoneid": 153, "zonename": "Marble Hill", "boroughName": "Manhattan"}, {"zoneid": 154, "zonename": "Marine Park/Floyd Bennett Field", "boroughName": "Brooklyn"}, {"zoneid": 155, "zonename": "Marine Park/Mill Basin", "boroughName": "Brooklyn"}, {"zoneid": 156, "zonename": "Mariners Harbor", "boroughName": "Staten Island"}, {"zoneid": 157, "zonename": "Maspeth", "boroughName": "Queens"}, {"zoneid": 158, "zonename": "Meatpacking/West Village West", "boroughName": "Manhattan"}, {"zoneid": 159, "zonename": "Melrose South", "boroughName": "Bronx"}, {"zoneid": 160, "zonename": "Middle Village", "boroughName": "Queens"}, {"zoneid": 161, "zonename": "Midtown Center", "boroughName": "Manhattan"}, {"zoneid": 162, "zonename": "Midtown East", "boroughName": "Manhattan"}, {"zoneid": 163, "zonename": "Midtown North", "boroughName": "Manhattan"}, {"zoneid": 164, "zonename": "Midtown South", "boroughName": "Manhattan"}, {"zoneid": 165, "zonename": "Midwood", "boroughName": "Brooklyn"}, {"zoneid": 166, "zonename": "Morningside Heights", "boroughName": "Manhattan"}, {"zoneid": 167, "zonename": "Morrisania/Melrose", "boroughName": "Bronx"}, {"zoneid": 168, "zonename": "Mott Haven/Port Morris", "boroughName": "Bronx"}, {"zoneid": 169, "zonename": "Mount Hope", "boroughName": "Bronx"}, {"zoneid": 170, "zonename": "Murray Hill", "boroughName": "Manhattan"}, {"zoneid": 171, "zonename": "Murray Hill-Queens", "boroughName": "Queens"}, {"zoneid": 172, "zonename": "New Dorp/Midland Beach", "boroughName": "Staten Island"}, {"zoneid": 173, "zonename": "North Corona", "boroughName": "Queens"}, {"zoneid": 174, "zonename": "Norwood", "boroughName": "Bronx"}, {"zoneid": 175, "zonename": "Oakland Gardens", "boroughName": "Queens"}, {"zoneid": 176, "zonename": "Oakwood", "boroughName": "Staten Island"}, {"zoneid": 177, "zonename": "Ocean Hill", "boroughName": "Brooklyn"}, {"zoneid": 178, "zonename": "Ocean Parkway South", "boroughName": "Brooklyn"}, {"zoneid": 179, "zonename": "Old Astoria", "boroughName": "Queens"}, {"zoneid": 180, "zonename": "Ozone Park", "boroughName": "Queens"}, {"zoneid": 181, "zonename": "Park Slope", "boroughName": "Brooklyn"}, {"zoneid": 182, "zonename": "Parkchester", "boroughName": "Bronx"}, {"zoneid": 183, "zonename": "Pelham Bay", "boroughName": "Bronx"}, {"zoneid": 184, "zonename": "Pelham Bay Park", "boroughName": "Bronx"}, {"zoneid": 185, "zonename": "Pelham Parkway", "boroughName": "Bronx"}, {"zoneid": 186, "zonename": "Penn Station/Madison Sq West", "boroughName": "Manhattan"}, {"zoneid": 187, "zonename": "Port Richmond", "boroughName": "Staten Island"}, {"zoneid": 188, "zonename": "Prospect-Lefferts Gardens", "boroughName": "Brooklyn"}, {"zoneid": 189, "zonename": "Prospect Heights", "boroughName": "Brooklyn"}, {"zoneid": 190, "zonename": "Prospect Park", "boroughName": "Brooklyn"}, {"zoneid": 191, "zonename": "Queens Village", "boroughName": "Queens"}, {"zoneid": 192, "zonename": "Queensboro Hill", "boroughName": "Queens"}, {"zoneid": 193, "zonename": "Queensbridge/Ravenswood", "boroughName": "Queens"}, {"zoneid": 194, "zonename": "Randalls Island", "boroughName": "Manhattan"}, {"zoneid": 195, "zonename": "Red Hook", "boroughName": "Brooklyn"}, {"zoneid": 196, "zonename": "Rego Park", "boroughName": "Queens"}, {"zoneid": 197, "zonename": "Richmond Hill", "boroughName": "Queens"}, {"zoneid": 198, "zonename": "Ridgewood", "boroughName": "Queens"}, {"zoneid": 199, "zonename": "Rikers Island", "boroughName": "Bronx"}, {"zoneid": 200, "zonename": "Riverdale/North Riverdale/Fieldston", "boroughName": "Bronx"}, {"zoneid": 201, "zonename": "Rockaway Park", "boroughName": "Queens"}, {"zoneid": 202, "zonename": "Roosevelt Island", "boroughName": "Manhattan"}, {"zoneid": 203, "zonename": "Rosedale", "boroughName": "Queens"}, {"zoneid": 204, "zonename": "Rossville/Woodrow", "boroughName": "Staten Island"}, {"zoneid": 205, "zonename": "Saint Albans", "boroughName": "Queens"}, {"zoneid": 206, "zonename": "Saint George/New Brighton", "boroughName": "Staten Island"}, {"zoneid": 207, "zonename": "Saint Michaels Cemetery/Woodside", "boroughName": "Queens"}, {"zoneid": 208, "zonename": "Schuylerville/Edgewater Park", "boroughName": "Bronx"}, {"zoneid": 209, "zonename": "Seaport", "boroughName": "Manhattan"}, {"zoneid": 210, "zonename": "Sheepshead Bay", "boroughName": "Brooklyn"}, {"zoneid": 211, "zonename": "SoHo", "boroughName": "Manhattan"}, {"zoneid": 212, "zonename": "Soundview/Bruckner", "boroughName": "Bronx"}, {"zoneid": 213, "zonename": "Soundview/Castle Hill", "boroughName": "Bronx"}, {"zoneid": 214, "zonename": "South Beach/Dongan Hills", "boroughName": "Staten Island"}, {"zoneid": 215, "zonename": "South Jamaica", "boroughName": "Queens"}, {"zoneid": 216, "zonename": "South Ozone Park", "boroughName": "Queens"}, {"zoneid": 217, "zonename": "South Williamsburg", "boroughName": "Brooklyn"}, {"zoneid": 218, "zonename": "Springfield Gardens North", "boroughName": "Queens"}, {"zoneid": 219, "zonename": "Springfield Gardens South", "boroughName": "Queens"}, {"zoneid": 220, "zonename": "Spuyten Duyvil/Kingsbridge", "boroughName": "Bronx"}, {"zoneid": 221, "zonename": "Stapleton", "boroughName": "Staten Island"}, {"zoneid": 222, "zonename": "Starrett City", "boroughName": "Brooklyn"}, {"zoneid": 223, "zonename": "Steinway", "boroughName": "Queens"}, {"zoneid": 224, "zonename": "Stuy Town/Peter Cooper Village", "boroughName": "Manhattan"}, {"zoneid": 225, "zonename": "Stuyvesant Heights", "boroughName": "Brooklyn"}, {"zoneid": 226, "zonename": "Sunnyside", "boroughName": "Queens"}, {"zoneid": 227, "zonename": "Sunset Park East", "boroughName": "Brooklyn"}, {"zoneid": 228, "zonename": "Sunset Park West", "boroughName": "Brooklyn"}, {"zoneid": 229, "zonename": "Sutton Place/Turtle Bay North", "boroughName": "Manhattan"}, {"zoneid": 230, "zonename": "Times Sq/Theatre District", "boroughName": "Manhattan"}, {"zoneid": 231, "zonename": "TriBeCa/Civic Center", "boroughName": "Manhattan"}, {"zoneid": 232, "zonename": "Two Bridges/Seward Park", "boroughName": "Manhattan"}, {"zoneid": 233, "zonename": "UN/Turtle Bay South", "boroughName": "Manhattan"}, {"zoneid": 234, "zonename": "Union Sq", "boroughName": "Manhattan"}, {"zoneid": 235, "zonename": "University Heights/Morris Heights", "boroughName": "Bronx"}, {"zoneid": 236, "zonename": "Upper East Side North", "boroughName": "Manhattan"}, {"zoneid": 237, "zonename": "Upper East Side South", "boroughName": "Manhattan"}, {"zoneid": 238, "zonename": "Upper West Side North", "boroughName": "Manhattan"}, {"zoneid": 239, "zonename": "Upper West Side South", "boroughName": "Manhattan"}, {"zoneid": 240, "zonename": "Van Cortlandt Park", "boroughName": "Bronx"}, {"zoneid": 241, "zonename": "Van Cortlandt Village", "boroughName": "Bronx"}, {"zoneid": 242, "zonename": "Van Nest/Morris Park", "boroughName": "Bronx"}, {"zoneid": 243, "zonename": "Washington Heights North", "boroughName": "Manhattan"}, {"zoneid": 244, "zonename": "Washington Heights South", "boroughName": "Manhattan"}, {"zoneid": 245, "zonename": "West Brighton", "boroughName": "Staten Island"}, {"zoneid": 246, "zonename": "West Chelsea/Hudson Yards", "boroughName": "Manhattan"}, {"zoneid": 247, "zonename": "West Concourse", "boroughName": "Bronx"}, {"zoneid": 248, "zonename": "West Farms/Bronx River", "boroughName": "Bronx"}, {"zoneid": 249, "zonename": "West Village", "boroughName": "Manhattan"}, {"zoneid": 250, "zonename": "Westchester Village/Unionport", "boroughName": "Bronx"}, {"zoneid": 251, "zonename": "Westerleigh", "boroughName": "Staten Island"}, {"zoneid": 252, "zonename": "Whitestone", "boroughName": "Queens"}, {"zoneid": 253, "zonename": "Willets Point", "boroughName": "Queens"}, {"zoneid": 254, "zonename": "Williamsbridge/Olinville", "boroughName": "Bronx"}, {"zoneid": 255, "zonename": "Williamsburg (North Side)", "boroughName": "Brooklyn"}, {"zoneid": 256, "zonename": "Williamsburg (South Side)", "boroughName": "Brooklyn"}, {"zoneid": 257, "zonename": "Windsor Terrace", "boroughName": "Brooklyn"}, {"zoneid": 258, "zonename": "Woodhaven", "boroughName": "Queens"}, {"zoneid": 259, "zonename": "Woodlawn/Wakefield", "boroughName": "Bronx"}, {"zoneid": 260, "zonename": "Woodside", "boroughName": "Queens"}, {"zoneid": 261, "zonename": "World Trade Center", "boroughName": "Manhattan"}, {"zoneid": 262, "zonename": "Yorkville East", "boroughName": "Manhattan"}, {"zoneid": 263, "zonename": "Yorkville West", "boroughName": "Manhattan"}, {"zoneid": 264, "zonename": "NV", "boroughName": "Unknown"}, {"zoneid": 265, "zonename": "NA", "boroughName": "Unknown"}],
      zoneData:[],
      serviceResponse: "N/A",
      rideId: rideToEdit.uniqueKey,
      form:{
        isToggleOn: true,
        pickupZone: parseInt(rideToEdit.rideDetails.pl),
        dropoffZone: parseInt(rideToEdit.rideDetails.dl),
        numOfPassengers: parseInt(rideToEdit.rideDetails.numOfPassengers),
        taxiType: rideToEdit.rideDetails.taxiType,
        multiDestinationRide: (rideToEdit.rideDetails.multiDestinationRide==='1'),
        taxiRideExperience: parseInt(rideToEdit.rideDetails.taxiRideExperience),
        exposeRideToPublic: (rideToEdit.rideDetails.exposeRideToPublic==='1'),
        totalRideAmount: rideToEdit.rideDetails.totalRideAmount,
        tipAmount: rideToEdit.rideDetails.tipAmount,
        totalRideTime: rideToEdit.rideDetails.totalRideTime
      }
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    var inputObj = {
      "function":"editUserRide",
      "rideId": this.state.rideId,
      "pl": this.state.form.pickupZone,
      "dl": this.state.form.dropoffZone,
      "numOfPassengers": this.state.form.numOfPassengers,
      "taxiType": this.state.form.taxiType,
      "multiDestinationRide": this.state.form.multiDestinationRide,
      "taxiRideExperience": this.state.form.taxiRideExperience,
      "exposeRideToPublic": this.state.form.exposeRideToPublic,
      "totalRideAmount": this.state.form.totalRideAmount,
      "tipAmount": this.state.form.tipAmount,
      "totalRideTime": this.state.form.totalRideTime,
      "userName":username
      };
    client.send(JSON.stringify(inputObj));
  }

  handleChange = (e,field) => {
    let currState = this.state.form;
    if(field=="tipAmount" || field=="totalRideAmount" || field=="totalRideTime"){
        currState[field] = e.target.value;
    }
    else{
        currState[field] = e.value;
    }
    this.setState({ form:currState });
  }

  async componentWillMount() {
  	// let zones=this.state.zoneData;

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
      var result=JSON.parse(message.data);
      if(result.function=="editUserRide"){
        if(result.result=="OK"){
            //print success
            toast("Successfully updated ride");
            // this.state.serviceResponse="Successfully added ride";
        }
        else{
            //print unccessful message
            toast("Failed to update ride");
            // this.state.serviceResponse="Failed to add ride";
        }
      }
    };
  }
  render() {
    // Creating zones for the select options
    let zones = this.state.zoneData;
    let zoneOptions = [{}];
    zones.map((zone) =>
        zoneOptions.push({
            value : zone.zoneid,
            label : zone.zonename
        })
    );

    let numOfPassengers = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6}];
    let taxiType = [{value:'Sedan',label:'Sedan'},{value:'SUV',label:'SUV'},{value:'Compact SUV',label:'Compact SUV'}];
    let multiDestinationRide = [{value:true,label:'Yes'},{value:false,label:'No'}];
    let taxiRideExperience = [{value:1,label:'1 Star'},{value:2,label:'2 Stars'},{value:3,label:'3 Stars'},{value:4,label:'4 Stars'},{value:5,label:'5 Stars'}];
    let exposeRideToPublic = [{value:true,label:'Yes'},{value:false,label:'No'}];
    let totalRideTime = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6}];
    let tipAmount = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6}];
    let totalRideAmount = [{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6}];

    const { form:pickupZone } = this.state;
    const { form:dropoffZone } = this.state;
    // const { form:tipAmount } = this.state;

    const notify = () => toast(this.state.serviceResponse);

    return (
        <div className="ml-0 mr-0" id="query-body">
            <div className="card" id="query-card">
                <div className="card-body">
                    <form id="query-selection" onSubmit={this.handleClick}>
                        <div className = "form-row justify-content-center">
                            <div classssName="col-md-4 text-center">
                                <label for="pickupZone">Pickup Zone:</label>
                                <Select id="pickupZone" onChange = {(e)=> this.handleChange(e,'pickupZone')} options={zoneOptions} value={zoneOptions.filter(({value}) => value === this.state.form.pickupZone)} />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="dropoffZone">Dropoff Zone:</label>
                                <Select id="dropoffZone" onChange = {(e)=> this.handleChange(e,'dropoffZone')} options={zoneOptions} value={zoneOptions.filter(({value}) => value === this.state.form.dropoffZone)} />                      
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="numOfPassengers">Number of Passengers</label>
                                <Select id="numOfPassengers" onChange = {(e)=> this.handleChange(e,'numOfPassengers')} options={numOfPassengers} value={numOfPassengers.filter(({value}) => value === this.state.form.numOfPassengers)}  />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="taxiType">Taxi Type</label>
                                <Select id="taxiType" onChange = {(e)=> this.handleChange(e,'taxiType')} options={taxiType} value={taxiType.filter(({value}) => value === this.state.form.taxiType)} />                      
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="multiDestinationRide">Multi Destination Ride</label>
                                <Select id="multiDestinationRide" onChange = {(e)=> this.handleChange(e,'multiDestinationRide')} options={multiDestinationRide} value={multiDestinationRide.filter(({value}) => value === this.state.form.multiDestinationRide)} />
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="taxiRideExperience">Ride Experience</label>
                                <Select id="taxiRideExperience" onChange = {(e)=> this.handleChange(e,'taxiRideExperience')} options={taxiRideExperience} value={taxiRideExperience.filter(({value}) => value === this.state.form.taxiRideExperience)} />
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="exposeRideToPublic">Expose Ride To Public</label>
                                <Select id="exposeRideToPublic" onChange = {(e)=> this.handleChange(e,'exposeRideToPublic')} options={exposeRideToPublic} value={exposeRideToPublic.filter(({value}) => value === this.state.form.exposeRideToPublic)} />
                            </div>
                        </div>
                        <div className = "form-row justify-content-center">
                            <div className="col-md-4 text-center">
                                <label for="tipAmount">Tip Amount</label>
                                <input type="text" id="tipAmount" placeholder="$"  onChange = {(e)=> this.handleChange(e,'tipAmount')} defaultValue={this.state.form.tipAmount}></input><br></br>
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="totalRideAmount">Total Ride Amount</label>
                                <input type="text" id="totalRideAmount" placeholder="$"  onChange = {(e)=> this.handleChange(e,'totalRideAmount')} defaultValue={this.state.form.totalRideAmount} ></input><br></br>
                            </div>
                            <div className="col-md-4 text-center">
                                <label for="totalRideTime">Total Ride Time</label>
                                <input type="text" id="totalRideTime" placeholder="min"  onChange = {(e)=> this.handleChange(e,'totalRideTime')} defaultValue={this.state.form.totalRideTime} ></input><br></br>
                            </div>
                        </div>
                       
                    <div className="form-row py-3 justify-content-center">
                        <button id="query-submit" type="submit">Save Ride</button>   
                    </div>
                    </form>
                    <div>
                        <button onClick={notify}>Notify</button>
                        <ToastContainer />
                    </div>
                </div>
            </div>   
        </div>
    )
  }
}

export default EditUserRide