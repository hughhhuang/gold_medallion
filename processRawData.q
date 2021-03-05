\c 1000 1000
/ rawOutputsDataPath:"C:\\Users\\Sandeep Vanka\\Documents\\UIUC\\CS598\\rawoutputs\\";
rawOutputsDataPath:"C:\\Users\\Sandeep Vanka\\Documents\\UIUC\\CS411\\data\\";

normalizeGreenTripData:{[rawData]
	show "Normalizing Green Trip Data, count: ", string count rawData;
	rawData:select 
		vendorID:VendorID,
		pickup:"Z"$string lpep_pickup_datetime, 
		dropoff:"Z"$string lpep_dropoff_datetime, 
		pickupLoc:"I"$string PULocationID, 
		dropoffLoc:"I"$string DOLocationID, 
		passengerCount:"I"$string passenger_count, 
		tripDistance:"F"$string trip_distance, 
		fareAmount:"F"$string fare_amount, 
		extraCharge:"F"$string extra, 
		mtaTax:"F"$string mta_tax, 
		tipAmount:"F"$string tip_amount,
		tollsAmount:"F"$string tolls_amount,
		improvementSurcharge:"F"$string improvement_surcharge,
		totalAmount:"F"$string total_amount,
		congestionSurcharge:"F"$string congestion_surcharge,
		taxiType:`Green
		from rawData;
	rawData
	}

normalizeYellowTripData:{[rawData]
	show "Normalizing Yellow Trip Data, count: ", string count rawData;
	rawData:select 
		vendorID:VendorID,
		pickup:"Z"$string tpep_pickup_datetime, 
		dropoff:"Z"$string tpep_dropoff_datetime, 
		pickupLoc:"I"$string PULocationID, 
		dropoffLoc:"I"$string DOLocationID, 
		passengerCount:"I"$string passenger_count, 
		tripDistance:"F"$string trip_distance, 
		fareAmount:"F"$string fare_amount, 
		extraCharge:"F"$string extra, 
		mtaTax:"F"$string mta_tax, 
		tipAmount:"F"$string tip_amount,
		tollsAmount:"F"$string tolls_amount,
		improvementSurcharge:"F"$string improvement_surcharge,
		totalAmount:"F"$string total_amount,
		congestionSurcharge:"F"$string congestion_surcharge,
		taxiType:`Yellow
		from rawData;
	rawData
	}

processGreenTripData:{[dir;fileName]
	path:raze (string dir),"/",(string fileName);
	show "Processing file:",path;
	rawData:((20#"S"); enlist ",") 0:hsym `$path;
	rawData
	}

processYellowTripData:{[dir;fileName]
	path:raze (string dir),"/",(string fileName);
	show "Processing file:",path;
	rawData:((18#"S"); enlist ",") 0:hsym `$path;
	rawData
	}

run:{[rawOutputsDataPath]
	dataPath:`$rawOutputsDataPath;
	files:key hsym dataPath;
	greenTripFiles:files where files like "green_tripdata*.csv";
	yellowTripFiles:files where files like "yellow_tripdata*.csv";
	rawGreenTripData:raze processGreenTripData[rawOutputsDataPath;] each greenTripFiles;
	rawYellowTripData:raze processYellowTripData[rawOutputsDataPath;] each yellowTripFiles;

	greenTripData:normalizeGreenTripData[rawGreenTripData];
	yellowTripData:normalizeYellowTripData[rawYellowTripData];
	.Q.dpft[`:kdbdata;`;`pickupLoc;`taxiData];
	}

/ run[rawOutputsDataPath]

/var ws = new WebSocket("ws://localhost:1234")
/ws.send("Hello World")

.z.ws:{neg[.z.w].j.j @[value;x;run x]}
/ run:{userQuery:.j.k x;show userQuery;:getTaxiData["I"$userQuery[`maxCount];"S"$userQuery[`fields]]}
run:{userQuery:.j.k x;show userQuery;:getUserEstimatedFare["I"$userQuery[`pl];"I"$userQuery[`dl]]}
getTaxiData:{[maxCount;fields] data:maxCount#?[taxiData;();0b;fields!fields];result:(`maxcount;`data)!(maxCount;data)}
getUserEstimatedFare:{[pl;dl] data:first select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount from taxiData where pickupLoc=pl, dropoffLoc=dl;result:(`pl`dl`data)!(pl;dl;data)}
exit 0;