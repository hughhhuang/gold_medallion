system"l kdbData"
\p 1234
connectedClients:();
if[`userRides in tables[];`userRides set `uniqueKey xkey select from userRides];
if[not `userRides in tables[];`userRides set enlist (`uniqueKey`userName`publicRide`rideDetails)!(first 0Ng;`;0b;enlist ())]
.z.ws:{connectedClients,:.z.w;neg[.z.w].j.j @[value;x;run x]}
/ run:{userQuery:.j.k x;show userQuery;:getTaxiData["I"$userQuery[`maxCount];"S"$userQuery[`fields]]}
run:{
	userQuery:.j.k x;
	show userQuery;
	if[`getUserEstimatedFare=`$userQuery[`function];
		:getUserEstimatedFare["I"$userQuery[`pl];"I"$userQuery[`dl]]
		];
	if[`addUserRide=`$userQuery[`function];
		:@[addUserRide;(userQuery;userRides);(`function;`result)!(`addUserRide;`NOTOK)]
		];
	}

getTaxiData:{[maxCount;fields] 
	data:maxCount#?[taxiData;();0b;fields!fields];
	result:(`maxcount;`data)!(maxCount;data)
	}


getUserEstimatedFare:{[pl;dl] 
	data:first select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount from taxiData where pickupLoc=pl, dropoffLoc=dl;
	result:(`pl`dl`data)!(pl;dl;data);
	dataByMonth:getDataByMonth[pl;dl];
	dataByDay:getDataByWeekDay[pl;dl];
	dataByHour:getDataByHour[pl;dl];
	result,:(`dataByMonth`dataByDay`dataByHour)!(dataByMonth;dataByDay;dataByHour);
	result
	}

getDataByMonth:{[pl;dl]
	monthMap:(1j;2j;3j;4j;5j;6j;7j;8j;9j;10j;11j;12j)!`Jan`Feb`Mar`Apr`May`Jun`Jul`Aug`Sep`Oct`Nov`Dec;
	data:select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount by month:(`mm$pickup) from taxiData where pickupLoc=pl, dropoffLoc=dl;
	data:0!update month:monthMap month from data;
	result:(`pl`dl`data)!(pl;dl;data)
	}

getDataByWeekDay:{[pl;dl]
	dayMap:(0j;1j;2j;3j;4j;5j;6j)!`Sat`Sun`Mon`Tue`Wed`Thu`Fri;
	data:select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount by day:("i"$"d"$pickup) mod 7 from taxiData where pickupLoc=pl, dropoffLoc=dl;
	data:0!update day:dayMap day from data;
	result:(`pl`dl`data)!(pl;dl;data)
	}

getDataByHour:{[pl;dl]
	data:0!select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount by hour:(`hh$pickup) from taxiData where pickupLoc=pl, dropoffLoc=dl;
	result:(`pl`dl`data)!(pl;dl;data)
	}

transformUserRideToValue:{[userRide]
	res:();
	if[not `~`$userRide[`pl];res,:(enlist `pl)!(enlist "i"$userRide[`pl])];
	if[not `~`$userRide[`dl];res,:(enlist `dl)!(enlist "i"$userRide[`dl])];
	if[not `~`$string userRide[`numOfPassengers];res,:(enlist `numOfPassengers)!(enlist "i"$userRide[`numOfPassengers])];
	if[not `~`$userRide[`taxiType];res,:(enlist `taxiType)!(enlist `$userRide[`taxiType])];
	if[not `~`$string userRide[`multiDestinationRide];res,:(enlist `multiDestinationRide)!(enlist "b"$userRide[`multiDestinationRide])];
	if[not `~`$string userRide[`taxiRideExperience];res,:(enlist `taxiRideExperience)!(enlist "i"$userRide[`taxiRideExperience])];
	if[not `~`$string userRide[`exposeRideToPublic];res,:(enlist `exposeRideToPublic)!(enlist "b"$userRide[`exposeRideToPublic])];
	if[not `~`$string userRide[`totalRideAmount];res,:(enlist `totalRideAmount)!(enlist "F"$userRide[`totalRideAmount])];
	if[not `~`$string userRide[`tipAmount];res,:(enlist `tipAmount)!(enlist "F"$userRide[`tipAmount])];
	if[not `~`$string userRide[`totalRideTime];res,:(enlist `totalRideTime)!(enlist "F"$userRide[`totalRideTime])];
	res
	}

updateUserRide:{[userRide;userRides]
	if[not ("g"$userRide[`uniqueKey]) in exec uniqueKey from userRides;'NotValid];
	/ `userRides set userRides upsert (`pl`dl`numOfPassengers`taxiType`multiDestinationRide`taxiRideExperi)!(`$userRide[`pl];`$userRide[`dl];`$string userRide[`numOfPassengers];`$userRide[`taxiType]);
	`userRides set (`uniqueKey xkey userRides) upsert enlist (`uniqueKey`userName`publicRide`rideDetails)!("g"$userRide[`uniqueKey];`$userRide[`userName];"b"$userRide[`exposeRideToPublic];transformUserRideToValue[userRide]);
	:(`function;`result)!(`addUserRide;`OK)
	}

addUserRide:{[data]
	userRide:data[0];
	userRides:data[1];
	/ `userRides set userRides upsert (`pl`dl`numOfPassengers`taxiType`multiDestinationRide`taxiRideExperi)!(`$userRide[`pl];`$userRide[`dl];`$string userRide[`numOfPassengers];`$userRide[`taxiType]);
	`userRides set (`uniqueKey xkey userRides) upsert enlist (`uniqueKey`userName`publicRide`rideDetails)!(first 1?0Ng;`$userRide[`userName];"b"$userRide[`exposeRideToPublic];transformUserRideToValue[userRide]);
	:(`function;`result)!(`addUserRide;`OK)
	}