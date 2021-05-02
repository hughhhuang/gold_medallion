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
        // zoneData: [],
        zoneData: [{"zoneid": 1, "zonename": "Newark Airport", "boroughName": "EWR"}, {"zoneid": 2, "zonename": "Jamaica Bay", "boroughName": "Queens"}, {"zoneid": 3, "zonename": "Allerton/Pelham Gardens", "boroughName": "Bronx"}, {"zoneid": 4, "zonename": "Alphabet City", "boroughName": "Manhattan"}, {"zoneid": 5, "zonename": "Arden Heights", "boroughName": "Staten Island"}, {"zoneid": 6, "zonename": "Arrochar/Fort Wadsworth", "boroughName": "Staten Island"}, {"zoneid": 7, "zonename": "Astoria", "boroughName": "Queens"}, {"zoneid": 8, "zonename": "Astoria Park", "boroughName": "Queens"}, {"zoneid": 9, "zonename": "Auburndale", "boroughName": "Queens"}, {"zoneid": 10, "zonename": "Baisley Park", "boroughName": "Queens"}, {"zoneid": 11, "zonename": "Bath Beach", "boroughName": "Brooklyn"}, {"zoneid": 12, "zonename": "Battery Park", "boroughName": "Manhattan"}, {"zoneid": 13, "zonename": "Battery Park City", "boroughName": "Manhattan"}, {"zoneid": 14, "zonename": "Bay Ridge", "boroughName": "Brooklyn"}, {"zoneid": 15, "zonename": "Bay Terrace/Fort Totten", "boroughName": "Queens"}, {"zoneid": 16, "zonename": "Bayside", "boroughName": "Queens"}, {"zoneid": 17, "zonename": "Bedford", "boroughName": "Brooklyn"}, {"zoneid": 18, "zonename": "Bedford Park", "boroughName": "Bronx"}, {"zoneid": 19, "zonename": "Bellerose", "boroughName": "Queens"}, {"zoneid": 20, "zonename": "Belmont", "boroughName": "Bronx"}, {"zoneid": 21, "zonename": "Bensonhurst East", "boroughName": "Brooklyn"}, {"zoneid": 22, "zonename": "Bensonhurst West", "boroughName": "Brooklyn"}, {"zoneid": 23, "zonename": "Bloomfield/Emerson Hill", "boroughName": "Staten Island"}, {"zoneid": 24, "zonename": "Bloomingdale", "boroughName": "Manhattan"}, {"zoneid": 25, "zonename": "Boerum Hill", "boroughName": "Brooklyn"}, {"zoneid": 26, "zonename": "Borough Park", "boroughName": "Brooklyn"}, {"zoneid": 27, "zonename": "Breezy Point/Fort Tilden/Riis Beach", "boroughName": "Queens"}, {"zoneid": 28, "zonename": "Briarwood/Jamaica Hills", "boroughName": "Queens"}, {"zoneid": 29, "zonename": "Brighton Beach", "boroughName": "Brooklyn"}, {"zoneid": 30, "zonename": "Broad Channel", "boroughName": "Queens"}, {"zoneid": 31, "zonename": "Bronx Park", "boroughName": "Bronx"}, {"zoneid": 32, "zonename": "Bronxdale", "boroughName": "Bronx"}, {"zoneid": 33, "zonename": "Brooklyn Heights", "boroughName": "Brooklyn"}, {"zoneid": 34, "zonename": "Brooklyn Navy Yard", "boroughName": "Brooklyn"}, {"zoneid": 35, "zonename": "Brownsville", "boroughName": "Brooklyn"}, {"zoneid": 36, "zonename": "Bushwick North", "boroughName": "Brooklyn"}, {"zoneid": 37, "zonename": "Bushwick South", "boroughName": "Brooklyn"}, {"zoneid": 38, "zonename": "Cambria Heights", "boroughName": "Queens"}, {"zoneid": 39, "zonename": "Canarsie", "boroughName": "Brooklyn"}, {"zoneid": 40, "zonename": "Carroll Gardens", "boroughName": "Brooklyn"}, {"zoneid": 41, "zonename": "Central Harlem", "boroughName": "Manhattan"}, {"zoneid": 42, "zonename": "Central Harlem North", "boroughName": "Manhattan"}, {"zoneid": 43, "zonename": "Central Park", "boroughName": "Manhattan"}, {"zoneid": 44, "zonename": "Charleston/Tottenville", "boroughName": "Staten Island"}, {"zoneid": 45, "zonename": "Chinatown", "boroughName": "Manhattan"}, {"zoneid": 46, "zonename": "City Island", "boroughName": "Bronx"}, {"zoneid": 47, "zonename": "Claremont/Bathgate", "boroughName": "Bronx"}, {"zoneid": 48, "zonename": "Clinton East", "boroughName": "Manhattan"}, {"zoneid": 49, "zonename": "Clinton Hill", "boroughName": "Brooklyn"}, {"zoneid": 50, "zonename": "Clinton West", "boroughName": "Manhattan"}, {"zoneid": 51, "zonename": "Co-Op City", "boroughName": "Bronx"}, {"zoneid": 52, "zonename": "Cobble Hill", "boroughName": "Brooklyn"}, {"zoneid": 53, "zonename": "College Point", "boroughName": "Queens"}, {"zoneid": 54, "zonename": "Columbia Street", "boroughName": "Brooklyn"}, {"zoneid": 55, "zonename": "Coney Island", "boroughName": "Brooklyn"}, {"zoneid": 56, "zonename": "Corona", "boroughName": "Queens"}, {"zoneid": 57, "zonename": "Corona", "boroughName": "Queens"}, {"zoneid": 58, "zonename": "Country Club", "boroughName": "Bronx"}, {"zoneid": 59, "zonename": "Crotona Park", "boroughName": "Bronx"}, {"zoneid": 60, "zonename": "Crotona Park East", "boroughName": "Bronx"}, {"zoneid": 61, "zonename": "Crown Heights North", "boroughName": "Brooklyn"}, {"zoneid": 62, "zonename": "Crown Heights South", "boroughName": "Brooklyn"}, {"zoneid": 63, "zonename": "Cypress Hills", "boroughName": "Brooklyn"}, {"zoneid": 64, "zonename": "Douglaston", "boroughName": "Queens"}, {"zoneid": 65, "zonename": "Downtown Brooklyn/MetroTech", "boroughName": "Brooklyn"}, {"zoneid": 66, "zonename": "DUMBO/Vinegar Hill", "boroughName": "Brooklyn"}, {"zoneid": 67, "zonename": "Dyker Heights", "boroughName": "Brooklyn"}, {"zoneid": 68, "zonename": "East Chelsea", "boroughName": "Manhattan"}, {"zoneid": 69, "zonename": "East Concourse/Concourse Village", "boroughName": "Bronx"}, {"zoneid": 70, "zonename": "East Elmhurst", "boroughName": "Queens"}, {"zoneid": 71, "zonename": "East Flatbush/Farragut", "boroughName": "Brooklyn"}, {"zoneid": 72, "zonename": "East Flatbush/Remsen Village", "boroughName": "Brooklyn"}, {"zoneid": 73, "zonename": "East Flushing", "boroughName": "Queens"}, {"zoneid": 74, "zonename": "East Harlem North", "boroughName": "Manhattan"}, {"zoneid": 75, "zonename": "East Harlem South", "boroughName": "Manhattan"}, {"zoneid": 76, "zonename": "East New York", "boroughName": "Brooklyn"}, {"zoneid": 77, "zonename": "East New York/Pennsylvania Avenue", "boroughName": "Brooklyn"}, {"zoneid": 78, "zonename": "East Tremont", "boroughName": "Bronx"}, {"zoneid": 79, "zonename": "East Village", "boroughName": "Manhattan"}, {"zoneid": 80, "zonename": "East Williamsburg", "boroughName": "Brooklyn"}, {"zoneid": 81, "zonename": "Eastchester", "boroughName": "Bronx"}, {"zoneid": 82, "zonename": "Elmhurst", "boroughName": "Queens"}, {"zoneid": 83, "zonename": "Elmhurst/Maspeth", "boroughName": "Queens"}, {"zoneid": 84, "zonename": "Eltingville/Annadale/Prince's Bay", "boroughName": "Staten Island"}, {"zoneid": 85, "zonename": "Erasmus", "boroughName": "Brooklyn"}, {"zoneid": 86, "zonename": "Far Rockaway", "boroughName": "Queens"}, {"zoneid": 87, "zonename": "Financial District North", "boroughName": "Manhattan"}, {"zoneid": 88, "zonename": "Financial District South", "boroughName": "Manhattan"}, {"zoneid": 89, "zonename": "Flatbush/Ditmas Park", "boroughName": "Brooklyn"}, {"zoneid": 90, "zonename": "Flatiron", "boroughName": "Manhattan"}, {"zoneid": 91, "zonename": "Flatlands", "boroughName": "Brooklyn"}, {"zoneid": 92, "zonename": "Flushing", "boroughName": "Queens"}, {"zoneid": 93, "zonename": "Flushing Meadows-Corona Park", "boroughName": "Queens"}, {"zoneid": 94, "zonename": "Fordham South", "boroughName": "Bronx"}, {"zoneid": 95, "zonename": "Forest Hills", "boroughName": "Queens"}, {"zoneid": 96, "zonename": "Forest Park/Highland Park", "boroughName": "Queens"}, {"zoneid": 97, "zonename": "Fort Greene", "boroughName": "Brooklyn"}, {"zoneid": 98, "zonename": "Fresh Meadows", "boroughName": "Queens"}, {"zoneid": 99, "zonename": "Freshkills Park", "boroughName": "Staten Island"}, {"zoneid": 100, "zonename": "Garment District", "boroughName": "Manhattan"}, {"zoneid": 101, "zonename": "Glen Oaks", "boroughName": "Queens"}, {"zoneid": 102, "zonename": "Glendale", "boroughName": "Queens"}, {"zoneid": 103, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 104, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 105, "zonename": "Governor's Island/Ellis Island/Liberty Island", "boroughName": "Manhattan"}, {"zoneid": 106, "zonename": "Gowanus", "boroughName": "Brooklyn"}, {"zoneid": 107, "zonename": "Gramercy", "boroughName": "Manhattan"}, {"zoneid": 108, "zonename": "Gravesend", "boroughName": "Brooklyn"}, {"zoneid": 109, "zonename": "Great Kills", "boroughName": "Staten Island"}, {"zoneid": 110, "zonename": "Great Kills Park", "boroughName": "Staten Island"}, {"zoneid": 111, "zonename": "Green-Wood Cemetery", "boroughName": "Brooklyn"}, {"zoneid": 112, "zonename": "Greenpoint", "boroughName": "Brooklyn"}, {"zoneid": 113, "zonename": "Greenwich Village North", "boroughName": "Manhattan"}, {"zoneid": 114, "zonename": "Greenwich Village South", "boroughName": "Manhattan"}, {"zoneid": 115, "zonename": "Grymes Hill/Clifton", "boroughName": "Staten Island"}, {"zoneid": 116, "zonename": "Hamilton Heights", "boroughName": "Manhattan"}, {"zoneid": 117, "zonename": "Hammels/Arverne", "boroughName": "Queens"}, {"zoneid": 118, "zonename": "Heartland Village/Todt Hill", "boroughName": "Staten Island"}, {"zoneid": 119, "zonename": "Highbridge", "boroughName": "Bronx"}, {"zoneid": 120, "zonename": "Highbridge Park", "boroughName": "Manhattan"}, {"zoneid": 121, "zonename": "Hillcrest/Pomonok", "boroughName": "Queens"}, {"zoneid": 122, "zonename": "Hollis", "boroughName": "Queens"}, {"zoneid": 123, "zonename": "Homecrest", "boroughName": "Brooklyn"}, {"zoneid": 124, "zonename": "Howard Beach", "boroughName": "Queens"}, {"zoneid": 125, "zonename": "Hudson Sq", "boroughName": "Manhattan"}, {"zoneid": 126, "zonename": "Hunts Point", "boroughName": "Bronx"}, {"zoneid": 127, "zonename": "Inwood", "boroughName": "Manhattan"}, {"zoneid": 128, "zonename": "Inwood Hill Park", "boroughName": "Manhattan"}, {"zoneid": 129, "zonename": "Jackson Heights", "boroughName": "Queens"}, {"zoneid": 130, "zonename": "Jamaica", "boroughName": "Queens"}, {"zoneid": 131, "zonename": "Jamaica Estates", "boroughName": "Queens"}, {"zoneid": 132, "zonename": "JFK Airport", "boroughName": "Queens"}, {"zoneid": 133, "zonename": "Kensington", "boroughName": "Brooklyn"}, {"zoneid": 134, "zonename": "Kew Gardens", "boroughName": "Queens"}, {"zoneid": 135, "zonename": "Kew Gardens Hills", "boroughName": "Queens"}, {"zoneid": 136, "zonename": "Kingsbridge Heights", "boroughName": "Bronx"}, {"zoneid": 137, "zonename": "Kips Bay", "boroughName": "Manhattan"}, {"zoneid": 138, "zonename": "LaGuardia Airport", "boroughName": "Queens"}, {"zoneid": 139, "zonename": "Laurelton", "boroughName": "Queens"}, {"zoneid": 140, "zonename": "Lenox Hill East", "boroughName": "Manhattan"}, {"zoneid": 141, "zonename": "Lenox Hill West", "boroughName": "Manhattan"}, {"zoneid": 142, "zonename": "Lincoln Square East", "boroughName": "Manhattan"}, {"zoneid": 143, "zonename": "Lincoln Square West", "boroughName": "Manhattan"}, {"zoneid": 144, "zonename": "Little Italy/NoLiTa", "boroughName": "Manhattan"}, {"zoneid": 145, "zonename": "Long Island City/Hunters Point", "boroughName": "Queens"}, {"zoneid": 146, "zonename": "Long Island City/Queens Plaza", "boroughName": "Queens"}, {"zoneid": 147, "zonename": "Longwood", "boroughName": "Bronx"}, {"zoneid": 148, "zonename": "Lower East Side", "boroughName": "Manhattan"}, {"zoneid": 149, "zonename": "Madison", "boroughName": "Brooklyn"}, {"zoneid": 150, "zonename": "Manhattan Beach", "boroughName": "Brooklyn"}, {"zoneid": 151, "zonename": "Manhattan Valley", "boroughName": "Manhattan"}, {"zoneid": 152, "zonename": "Manhattanville", "boroughName": "Manhattan"}, {"zoneid": 153, "zonename": "Marble Hill", "boroughName": "Manhattan"}, {"zoneid": 154, "zonename": "Marine Park/Floyd Bennett Field", "boroughName": "Brooklyn"}, {"zoneid": 155, "zonename": "Marine Park/Mill Basin", "boroughName": "Brooklyn"}, {"zoneid": 156, "zonename": "Mariners Harbor", "boroughName": "Staten Island"}, {"zoneid": 157, "zonename": "Maspeth", "boroughName": "Queens"}, {"zoneid": 158, "zonename": "Meatpacking/West Village West", "boroughName": "Manhattan"}, {"zoneid": 159, "zonename": "Melrose South", "boroughName": "Bronx"}, {"zoneid": 160, "zonename": "Middle Village", "boroughName": "Queens"}, {"zoneid": 161, "zonename": "Midtown Center", "boroughName": "Manhattan"}, {"zoneid": 162, "zonename": "Midtown East", "boroughName": "Manhattan"}, {"zoneid": 163, "zonename": "Midtown North", "boroughName": "Manhattan"}, {"zoneid": 164, "zonename": "Midtown South", "boroughName": "Manhattan"}, {"zoneid": 165, "zonename": "Midwood", "boroughName": "Brooklyn"}, {"zoneid": 166, "zonename": "Morningside Heights", "boroughName": "Manhattan"}, {"zoneid": 167, "zonename": "Morrisania/Melrose", "boroughName": "Bronx"}, {"zoneid": 168, "zonename": "Mott Haven/Port Morris", "boroughName": "Bronx"}, {"zoneid": 169, "zonename": "Mount Hope", "boroughName": "Bronx"}, {"zoneid": 170, "zonename": "Murray Hill", "boroughName": "Manhattan"}, {"zoneid": 171, "zonename": "Murray Hill-Queens", "boroughName": "Queens"}, {"zoneid": 172, "zonename": "New Dorp/Midland Beach", "boroughName": "Staten Island"}, {"zoneid": 173, "zonename": "North Corona", "boroughName": "Queens"}, {"zoneid": 174, "zonename": "Norwood", "boroughName": "Bronx"}, {"zoneid": 175, "zonename": "Oakland Gardens", "boroughName": "Queens"}, {"zoneid": 176, "zonename": "Oakwood", "boroughName": "Staten Island"}, {"zoneid": 177, "zonename": "Ocean Hill", "boroughName": "Brooklyn"}, {"zoneid": 178, "zonename": "Ocean Parkway South", "boroughName": "Brooklyn"}, {"zoneid": 179, "zonename": "Old Astoria", "boroughName": "Queens"}, {"zoneid": 180, "zonename": "Ozone Park", "boroughName": "Queens"}, {"zoneid": 181, "zonename": "Park Slope", "boroughName": "Brooklyn"}, {"zoneid": 182, "zonename": "Parkchester", "boroughName": "Bronx"}, {"zoneid": 183, "zonename": "Pelham Bay", "boroughName": "Bronx"}, {"zoneid": 184, "zonename": "Pelham Bay Park", "boroughName": "Bronx"}, {"zoneid": 185, "zonename": "Pelham Parkway", "boroughName": "Bronx"}, {"zoneid": 186, "zonename": "Penn Station/Madison Sq West", "boroughName": "Manhattan"}, {"zoneid": 187, "zonename": "Port Richmond", "boroughName": "Staten Island"}, {"zoneid": 188, "zonename": "Prospect-Lefferts Gardens", "boroughName": "Brooklyn"}, {"zoneid": 189, "zonename": "Prospect Heights", "boroughName": "Brooklyn"}, {"zoneid": 190, "zonename": "Prospect Park", "boroughName": "Brooklyn"}, {"zoneid": 191, "zonename": "Queens Village", "boroughName": "Queens"}, {"zoneid": 192, "zonename": "Queensboro Hill", "boroughName": "Queens"}, {"zoneid": 193, "zonename": "Queensbridge/Ravenswood", "boroughName": "Queens"}, {"zoneid": 194, "zonename": "Randalls Island", "boroughName": "Manhattan"}, {"zoneid": 195, "zonename": "Red Hook", "boroughName": "Brooklyn"}, {"zoneid": 196, "zonename": "Rego Park", "boroughName": "Queens"}, {"zoneid": 197, "zonename": "Richmond Hill", "boroughName": "Queens"}, {"zoneid": 198, "zonename": "Ridgewood", "boroughName": "Queens"}, {"zoneid": 199, "zonename": "Rikers Island", "boroughName": "Bronx"}, {"zoneid": 200, "zonename": "Riverdale/North Riverdale/Fieldston", "boroughName": "Bronx"}, {"zoneid": 201, "zonename": "Rockaway Park", "boroughName": "Queens"}, {"zoneid": 202, "zonename": "Roosevelt Island", "boroughName": "Manhattan"}, {"zoneid": 203, "zonename": "Rosedale", "boroughName": "Queens"}, {"zoneid": 204, "zonename": "Rossville/Woodrow", "boroughName": "Staten Island"}, {"zoneid": 205, "zonename": "Saint Albans", "boroughName": "Queens"}, {"zoneid": 206, "zonename": "Saint George/New Brighton", "boroughName": "Staten Island"}, {"zoneid": 207, "zonename": "Saint Michaels Cemetery/Woodside", "boroughName": "Queens"}, {"zoneid": 208, "zonename": "Schuylerville/Edgewater Park", "boroughName": "Bronx"}, {"zoneid": 209, "zonename": "Seaport", "boroughName": "Manhattan"}, {"zoneid": 210, "zonename": "Sheepshead Bay", "boroughName": "Brooklyn"}, {"zoneid": 211, "zonename": "SoHo", "boroughName": "Manhattan"}, {"zoneid": 212, "zonename": "Soundview/Bruckner", "boroughName": "Bronx"}, {"zoneid": 213, "zonename": "Soundview/Castle Hill", "boroughName": "Bronx"}, {"zoneid": 214, "zonename": "South Beach/Dongan Hills", "boroughName": "Staten Island"}, {"zoneid": 215, "zonename": "South Jamaica", "boroughName": "Queens"}, {"zoneid": 216, "zonename": "South Ozone Park", "boroughName": "Queens"}, {"zoneid": 217, "zonename": "South Williamsburg", "boroughName": "Brooklyn"}, {"zoneid": 218, "zonename": "Springfield Gardens North", "boroughName": "Queens"}, {"zoneid": 219, "zonename": "Springfield Gardens South", "boroughName": "Queens"}, {"zoneid": 220, "zonename": "Spuyten Duyvil/Kingsbridge", "boroughName": "Bronx"}, {"zoneid": 221, "zonename": "Stapleton", "boroughName": "Staten Island"}, {"zoneid": 222, "zonename": "Starrett City", "boroughName": "Brooklyn"}, {"zoneid": 223, "zonename": "Steinway", "boroughName": "Queens"}, {"zoneid": 224, "zonename": "Stuy Town/Peter Cooper Village", "boroughName": "Manhattan"}, {"zoneid": 225, "zonename": "Stuyvesant Heights", "boroughName": "Brooklyn"}, {"zoneid": 226, "zonename": "Sunnyside", "boroughName": "Queens"}, {"zoneid": 227, "zonename": "Sunset Park East", "boroughName": "Brooklyn"}, {"zoneid": 228, "zonename": "Sunset Park West", "boroughName": "Brooklyn"}, {"zoneid": 229, "zonename": "Sutton Place/Turtle Bay North", "boroughName": "Manhattan"}, {"zoneid": 230, "zonename": "Times Sq/Theatre District", "boroughName": "Manhattan"}, {"zoneid": 231, "zonename": "TriBeCa/Civic Center", "boroughName": "Manhattan"}, {"zoneid": 232, "zonename": "Two Bridges/Seward Park", "boroughName": "Manhattan"}, {"zoneid": 233, "zonename": "UN/Turtle Bay South", "boroughName": "Manhattan"}, {"zoneid": 234, "zonename": "Union Sq", "boroughName": "Manhattan"}, {"zoneid": 235, "zonename": "University Heights/Morris Heights", "boroughName": "Bronx"}, {"zoneid": 236, "zonename": "Upper East Side North", "boroughName": "Manhattan"}, {"zoneid": 237, "zonename": "Upper East Side South", "boroughName": "Manhattan"}, {"zoneid": 238, "zonename": "Upper West Side North", "boroughName": "Manhattan"}, {"zoneid": 239, "zonename": "Upper West Side South", "boroughName": "Manhattan"}, {"zoneid": 240, "zonename": "Van Cortlandt Park", "boroughName": "Bronx"}, {"zoneid": 241, "zonename": "Van Cortlandt Village", "boroughName": "Bronx"}, {"zoneid": 242, "zonename": "Van Nest/Morris Park", "boroughName": "Bronx"}, {"zoneid": 243, "zonename": "Washington Heights North", "boroughName": "Manhattan"}, {"zoneid": 244, "zonename": "Washington Heights South", "boroughName": "Manhattan"}, {"zoneid": 245, "zonename": "West Brighton", "boroughName": "Staten Island"}, {"zoneid": 246, "zonename": "West Chelsea/Hudson Yards", "boroughName": "Manhattan"}, {"zoneid": 247, "zonename": "West Concourse", "boroughName": "Bronx"}, {"zoneid": 248, "zonename": "West Farms/Bronx River", "boroughName": "Bronx"}, {"zoneid": 249, "zonename": "West Village", "boroughName": "Manhattan"}, {"zoneid": 250, "zonename": "Westchester Village/Unionport", "boroughName": "Bronx"}, {"zoneid": 251, "zonename": "Westerleigh", "boroughName": "Staten Island"}, {"zoneid": 252, "zonename": "Whitestone", "boroughName": "Queens"}, {"zoneid": 253, "zonename": "Willets Point", "boroughName": "Queens"}, {"zoneid": 254, "zonename": "Williamsbridge/Olinville", "boroughName": "Bronx"}, {"zoneid": 255, "zonename": "Williamsburg (North Side)", "boroughName": "Brooklyn"}, {"zoneid": 256, "zonename": "Williamsburg (South Side)", "boroughName": "Brooklyn"}, {"zoneid": 257, "zonename": "Windsor Terrace", "boroughName": "Brooklyn"}, {"zoneid": 258, "zonename": "Woodhaven", "boroughName": "Queens"}, {"zoneid": 259, "zonename": "Woodlawn/Wakefield", "boroughName": "Bronx"}, {"zoneid": 260, "zonename": "Woodside", "boroughName": "Queens"}, {"zoneid": 261, "zonename": "World Trade Center", "boroughName": "Manhattan"}, {"zoneid": 262, "zonename": "Yorkville East", "boroughName": "Manhattan"}, {"zoneid": 263, "zonename": "Yorkville West", "boroughName": "Manhattan"}, {"zoneid": 264, "zonename": "NV", "boroughName": "Unknown"}, {"zoneid": 265, "zonename": "NA", "boroughName": "Unknown"}],
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
        mlTip: 0,
        showCovidStats: false,
        covidLabels:['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        covidValues: [[5, 2, 4, 2, 0]],
        dropoffBurough: '',
        vaccineDataByBur: []      
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);

  }
async componentWillMount() {
    // const url = "http://172.22.152.9:8000/api/nygm/?format=json"
    // const response = await fetch(url);
    // const zones = await response.json();
    
    // this.setState(state=> ({
    //     zoneData: zones,
    // }))
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
      var mlTipAmount=JSON.parse(message.data).mlRecommendedTipAmount;
      
      console.log(JSON.parse(message.data).mlRecommendedTipAmount)

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

        console.log(result);
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
          byHourGraphValues:hourData[1],
          mlTip: parseFloat(mlTipAmount).toFixed(2)
        }));
    };

    // Pulling the vaccine data by borough
    var vacBurroughs = {
      'Manhattan':{},
      'Queens':{},
      'StatenIsland':{},
      'Bronx':{},
      'Brooklyn':{}
    }
    for (var key in vacBurroughs){
      const url = "http://172.22.152.9:8000/api/covidDatabyDay"+key+'/';
      const respoe = await  fetch(url,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await respoe.json();
      for (var val in res){
        let newDate = Date.parse(res[val].date_of_interest)
        vacBurroughs[key][newDate] = res[val].case_count_7day_avg
      }
      Object.keys(vacBurroughs[key]).sort().reduce((r, k) => (r[k] = vacBurroughs[key][k], r), {})
    }
    console.log(vacBurroughs);
    this.setState({
      vaccineDataByBur: vacBurroughs
    })
    
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

    try{
      let borough = this.state.zoneData[dropoffZone.value-1].boroughName.replace(/\s/g, '');
      var vals = this.state.vaccineDataByBur[borough];

      console.log(vals)
      let covidLabels = Object.keys(vals).sort();
      let covidVals = [];

      for (var val in covidLabels){
        covidVals.push(vals[covidLabels[val]]);
      }
      console.log(covidLabels)
      console.log(covidVals)
      this.setState({
        covidLabels: [covidLabels],
        covidValues: [covidVals],
        showCovidStats: true,
        dropoffBurough: this.state.zoneData[dropoffZone.value-1].boroughName
      })
    }
    catch{
      alert("Covid data unavailable for this zone");
      this.setState({
        showCovidStats: false
      })
    }
  
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
      height: "300px"
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

    let covidData = {
      labels: this.state.covidLabels,
      series: this.state.covidValues
    }

    let covidOptions = {
      // high:1000,
      low:0,
      showPoint: false,
      width: '600px',
      height: '200px',
      axisX:{
        showLabel:false
      },
      axisY:{
        showLabel:false
      }
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
                    {this.state.showCovidStats && (<div className="form-row justify-content-center py-0 mb-5">
                      <div className="col-6 my-0 py-0 text-center" id="covid-graph">
                        <h6 className="text-center pt-3">Trend in Covid Cases for Dropoff Burough since November 2020 ({this.state.dropoffBurough})</h6>
                        <hr/>
                        <ChartistGraph id="covid" data={covidData} options={covidOptions} type="Line" />
                      </div>
                    </div>)}
                    <div className="form-row justify-content-center pt-4">
                      <div className="col-6">
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
                    <h5 className="general-font text-center"><i>Although the average rider tips ${tip}, our algorithms recommend that you tip ${this.state.mlTip}</i></h5>
                  </div> 
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-5 text-center">
                    <div className="card">
                      <div className="card-header ">
                        <h4 className="card-title">Color Scheme Used in Plots</h4>
                        <p className="card-category">Miscellaneous costs include toll, surcharge, and congestion cost</p>
                      </div>
                      <div className="card-body">
                        <i className="fa fa-square ct-series-a"></i>Fare
                        <i className="fa fa-square ct-series-b pl-5 mr-3"></i> MTA 
                        <i className="fa fa-square ct-series-c pl-5 mr-3"></i> Tip
                        <i className="fa fa-square ct-series-d pl-5 mr-3"></i> Misc 
                      </div>
                    </div>
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
                            <ChartistGraph className="mt-0" data={dataPie} options={pieOptions} type="Pie" />
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
