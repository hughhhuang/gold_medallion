system"l kdbData"
\p 1234
connectedClients:();
`taxiData set update `g#pickup,`g#dropoffLoc,month:("i"$"m"$pickup) mod 12,startTime:`hh$pickup,day:?[1<(`date$pickup) mod 7;0i;1i] from taxiData;
if[`userRides in tables[];`userRides set `uniqueKey xkey select from userRides];
if[not `userRides in tables[];`userRides set enlist (`uniqueKey`userName`publicRide`rideDetails)!(`$string "j"$.z.P;`;0b;enlist ())]
.z.ws:{connectedClients,:.z.w;neg[.z.w].j.j @[value;x;run x]}
/ run:{userQuery:.j.k x;show userQuery;:getTaxiData["I"$userQuery[`maxCount];"S"$userQuery[`fields]]}
run:{
	userQuery:.j.k x;
	show userQuery;
	if[`getUserEstimatedFare=`$userQuery[`function];
		:getUserEstimatedFare["I"$userQuery[`pl];"I"$userQuery[`dl];parseOptionalFields[userQuery]]
		];
	if[`addUserRide=`$userQuery[`function];
		:@[addUserRide;(userQuery;userRides);(`function;`result)!(`addUserRide;`NOTOK)]
		];
	if[`getUserRides=`$userQuery[`function];
		:@[getUserRides;`$userQuery[`userName];(`function;`result)!(`getUserRides;`NOTOK)]
		];
	if[`deleteUserRide=`$userQuery[`function];
		:@[deleteUserRide;userQuery;(`function;`result)!(`deleteUserRide;`NOTOK)]
		];
	if[`editUserRide=`$userQuery[`function];
		:@[editUserRide;userQuery;(`function;`result)!(`editUserRide;`NOTOK)]
		];
	if[`getUserRideRecommendations=`$userQuery[`function];
		:@[getUserRideRecommendations;userQuery;(`function;`result)!(`getUserRideRecommendations;`NOTOK)]
		];
	}

getTaxiData:{[maxCount;fields] 
	data:maxCount#?[taxiData;();0b;fields!fields];
	result:(`maxcount;`data)!(maxCount;data)
	}

parseOptionalFields:{[usrQuery]
	res:();
	if[(`month in key usrQuery) and not `~`$string usrQuery[`month];res,:(enlist `month)!(enlist  "I"$usrQuery[`month])];
	if[(`startTime in key usrQuery) and not `~`$string usrQuery[`startTime];res,:(enlist `startTime)!(enlist "I"$usrQuery[`startTime])];
	if[(`day in key usrQuery) and not `~`$string usrQuery[`day];res,:(enlist `day)!(enlist "I"$usrQuery[`day])];
	res
	}

getRequiredConds:{[pl;dl;optionalFields]
	requiredConds:((=;`pickupLoc;pl);(=;`dropoffLoc;dl));
	if[count optionalFields;
		if[`month in key optionalFields;
			requiredConds,:enlist (=;`month;first optionalFields[`month])
			];
		if[`startTime in key optionalFields;
			requiredConds,:enlist (=;`startTime;first optionalFields[`startTime])
			];
		if[(`day in key optionalFields) and (optionalFields[`day]>-1);
			requiredConds,:enlist (=;`day;first optionalFields[`day])
			];
		];
	:requiredConds
	}


getUserEstimatedFare:{[pl;dl;optionalFields]
	requiredConds:getRequiredConds[pl;dl;optionalFields];
	data:first ?[`taxiData;requiredConds;0b;(`totalAmount`mtaTax`tipAmount`fareAmount)!((avg;`totalAmount);(avg;`mtaTax);(avg;`tipAmount);(avg;`fareAmount))];
	result:(`pl`dl`data)!(pl;dl;data);
	dataByMonth:getDataByMonth[pl;dl;requiredConds];
	dataByDay:getDataByWeekDay[pl;dl;requiredConds];
	dataByHour:getDataByHour[pl;dl;requiredConds];
	result,:(`dataByMonth`dataByDay`dataByHour)!(dataByMonth;dataByDay;dataByHour);
	result,:(enlist `getPlanRideStats)!enlist getPlanRideStats[requiredConds];
	result,:(enlist `mlRecommendedTipAmount)!(enlist getMlRecommendedTipValue[pl;dl;0N;1;0N]);
	result
	}

getDataByMonth:{[pl;dl;requiredConds]
	monthMap:(0j;1j;2j;3j;4j;5j;6j;7j;8j;9j;10j;11j)!`Jan`Feb`Mar`Apr`May`Jun`Jul`Aug`Sep`Oct`Nov`Dec;
	/ data:select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount by month:(`mm$pickup) from taxiData where pickupLoc=pl, dropoffLoc=dl;
	data:?[`taxiData;requiredConds;(enlist `month)!enlist (`month);(`totalAmount`mtaTax`tipAmount`fareAmount)!((avg;`totalAmount);(avg;`mtaTax);(avg;`tipAmount);(avg;`fareAmount))];
	data:0!update month:monthMap month from data;
	result:(`pl`dl`data)!(pl;dl;data)
	}

getDataByWeekDay:{[pl;dl;requiredConds]
	dayMap:(0j;1j;2j;3j;4j;5j;6j)!`Sat`Sun`Mon`Tue`Wed`Thu`Fri;
	/ data:select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount by day:("i"$"d"$pickup) mod 7 from taxiData where pickupLoc=pl, dropoffLoc=dl;
	data:?[`taxiData;requiredConds;(enlist `day)!enlist (mod;($;"i";($;"d";`pickup));7);(`totalAmount`mtaTax`tipAmount`fareAmount)!((avg;`totalAmount);(avg;`mtaTax);(avg;`tipAmount);(avg;`fareAmount))];
	data:0!update day:dayMap day from data;
	result:(`pl`dl`data)!(pl;dl;data)
	}

getDataByHour:{[pl;dl;requiredConds]
	data:?[`taxiData;requiredConds;(enlist `hour)!enlist ($;enlist `hh;`pickup);(`totalAmount`mtaTax`tipAmount`fareAmount)!((avg;`totalAmount);(avg;`mtaTax);(avg;`tipAmount);(avg;`fareAmount))];
	/ data:0!select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount by hour:(`hh$pickup) from taxiData where pickupLoc=pl, dropoffLoc=dl;
	result:(`pl`dl`data)!(pl;dl;data)
	}

transformUserRideToValue:{[userRide]
	res:();
	if[not `~`$string userRide[`pl];res,:(enlist `pl)!(enlist `$string userRide[`pl])];
	if[not `~`$string userRide[`dl];res,:(enlist `dl)!(enlist `$string userRide[`dl])];
	if[not `~`$string userRide[`numOfPassengers];res,:(enlist `numOfPassengers)!(enlist `$string userRide[`numOfPassengers])];
	if[not `~`$userRide[`taxiType];res,:(enlist `taxiType)!(enlist `$userRide[`taxiType])];
	if[not `~`$string userRide[`multiDestinationRide];res,:(enlist `multiDestinationRide)!(enlist `$string userRide[`multiDestinationRide])];
	if[not `~`$string userRide[`taxiRideExperience];res,:(enlist `taxiRideExperience)!(enlist `$string userRide[`taxiRideExperience])];
	if[not `~`$string userRide[`exposeRideToPublic];res,:(enlist `exposeRideToPublic)!(enlist `$string userRide[`exposeRideToPublic])];
	if[not `~`$string userRide[`totalRideAmount];res,:(enlist `totalRideAmount)!(enlist `$userRide[`totalRideAmount])];
	if[not `~`$string userRide[`tipAmount];res,:(enlist `tipAmount)!(enlist `$userRide[`tipAmount])];
	if[not `~`$string userRide[`totalRideTime];res,:(enlist `totalRideTime)!(enlist `$userRide[`totalRideTime])];
	res
	}

getPlanRideStats:{[conditions]
	conditions:conditions[;1]!`$string conditions[;2];
	getPercentileStats["I"$string conditions[`pickupLoc];
		"I"$string conditions[`dropoffLoc];
		$[`month in key conditions;"I"$string conditions[`month];0 + til 12];
		$[`startTime in key conditions;"I"$string conditions[`startTime];0 + til 12];
		$[`day in key conditions;"I"$string conditions[`day];(0;1)];1]
	}

getUserRideStats:{[ride]
	rideDetails:ride[`rideDetails];
	res:getPercentileStats["I"$string rideDetails[`pl];
		"I"$string rideDetails[`dl];
		$[`month in key rideDetails;"I"$string rideDetails[`month];0 + til 12];
		$[`startTime in key rideDetails;"I"$string rideDetails[`startTime];0 + til 12];
		$[`day in key rideDetails;"I"$string rideDetails[`day];(0;1)];1];
	(`uniqueKey`userRideStats)!(ride[`uniqueKey];res)
	}

getUserRidesStats:{[rides]
	getUserRideStats each rides
	}

getUserRideRecommendations:{[userQuery]
	createUserRideRecommendations[userQuery[`userZone];userQuery[`zoneIds];userQuery[`minSpendature];userQuery[`maxSpendature];userQuery[`maxDistance]]
	}

/createUserRideRecommendations[236;(238;235;234;231);10;20;5]
createUserRideRecommendations:{[userZone;zoneIds;minSpendature;maxSpendature;maxDistance]
	timeConstraint:`true;
	data:select totalAmount,tripDistance,dropoffLoc from taxiData where pickupLoc="i"$userZone,dropoffLoc in "i"$zoneIds, not tripDistance=0,startTime=`hh$.z.P;
	/too few samples, going to relax time constraint
	if[100>count data;
		timeConstraint:`false;
		data:select from taxiData where pickupLoc=userZone,dropoffLoc in zoneIds, not tripDistance=0;
		];
	calcData:select pickupLoc:userZone,avgTotalAmount:avg totalAmount, avgTripDistance:avg tripDistance by dropoffLoc from data;
	recommendations:0!select from calcData where avgTotalAmount>=minSpendature, avgTotalAmount<=maxSpendature, avgTripDistance<=maxDistance;
	/returning the count of data used in the result can tell the user, there weren't many historical rides used for these recommendations. and to widen preference if possible
	res:(`countOfData`recommendations`timeConstraint)!(count data;recommendations;timeConstraint);
	res
	}

updateUserRide:{[userRide;userRides]
	if[not (`$string userRide[`uniqueKey]) in exec uniqueKey from userRides;'NotValid];
	/ `userRides set userRides upsert (`pl`dl`numOfPassengers`taxiType`multiDestinationRide`taxiRideExperi)!(`$userRide[`pl];`$userRide[`dl];`$string userRide[`numOfPassengers];`$userRide[`taxiType]);
	`userRides set (`uniqueKey xkey userRides) upsert enlist (`uniqueKey`userName`publicRide`rideDetails)!(`$string userRide[`uniqueKey];`$userRide[`userName];"b"$userRide[`exposeRideToPublic];transformUserRideToValue[userRide]);
	:(`function;`result)!(`addUserRide;`OK)
	}

addUserRide:{[data]
	userRide:data[0];
	userRides:data[1];
	/ `userRides set userRides upsert (`pl`dl`numOfPassengers`taxiType`multiDestinationRide`taxiRideExperi)!(`$userRide[`pl];`$userRide[`dl];`$string userRide[`numOfPassengers];`$userRide[`taxiType]);
	`userRides set (`uniqueKey xkey userRides) upsert enlist (`uniqueKey`userName`publicRide`rideDetails)!(`$string "j"$.z.P;`$userRide[`userName];"b"$userRide[`exposeRideToPublic];transformUserRideToValue[userRide]);
	save `:userRides;
	:(`function;`result)!(`addUserRide;`OK)
	}

getUserRides:{[username]
	data:0!select from userRides where userName=username;
	publicData:0!select from userRides where not userName=username, publicRide=1b;
	if[not count data;
		:(`username`data`function`publicData`result)!(username;();`getUserRides;publicData;`OK)	
		];
	userRidesStats:getUserRidesStats[data];
	data:0!(`uniqueKey xkey data) lj (`uniqueKey xkey userRidesStats);
	result:(`username`data`function`publicData`result)!(username;data;`getUserRides;publicData;`OK)
	}

deleteUserRide:{[data]
	username:`$data[`userName];
	rideId:`$data[`rideId];
	delete from `userRides where userName=username, uniqueKey=rideId;
	save `:userRides;
	updatedUserRides:getUserRides[username];
	:(`function;`result;`data;`publicData)!(`deleteUserRide;`OK;updatedUserRides`data;updatedUserRides`publicData)
	}

editUserRide:{[data]
	userRide:data;
	`userRides set (`uniqueKey xkey userRides) upsert enlist (`uniqueKey`userName`publicRide`rideDetails)!(`$userRide[`rideId];`$userRide[`userName];"b"$userRide[`exposeRideToPublic];transformUserRideToValue[userRide]);
	save `:userRides;
	:(`function;`result)!(`editUserRide;`OK)
	}

/select pickupLoc,dropoffLoc,month,startTime,day,passengerCount,fareAmount,tripDistance,totalAmount,tollsAmount,tipAmount from taxiData where not tripDistance=0, not totalAmount<0, not pickupLoc=dropoffLoc, not passengerCount=0
/select avg fareAmount from taxiData where pickupLoc=237,dropoffLoc=236,month=1,startTime=11, day=0, passengerCount=1

/percentile 
/  Sorts list and grabs value nearest (rounding down) to the given percentile.
/INPUT
/  ls - original data as a list
/  pct - percentile
/OUTPUT
/  out - nearest value at percentile
percentile:{[ls;pct] (asc ls) ["i"$(1 xbar (pct*(count ls)%100) )] } 

/percentile[exec fareAmount from select fareAmount from taxiData where pickupLoc=237,dropoffLoc=236,month=1,startTime=11, day=0, passengerCount=1;75]
getPercentileStats:{[pl;dl;m;st;d;pc]
	data:select totalAmount,tipAmount,tripDistance from taxiData where pickupLoc=pl,dropoffLoc=dl,month in m,startTime in st, day in d, passengerCount=pc, not tripDistance=0;
	totalAmountData:exec totalAmount from data;
	tipAmountData:exec tipAmount from data;
	tripDistance:exec tripDistance from data;
	totalAmountPercentiles:(percentile[totalAmountData;25];percentile[totalAmountData;50];percentile[totalAmountData;75]);
	tipAmountPercentiles:(percentile[tipAmountData;25];percentile[tipAmountData;50];percentile[tipAmountData;75]);
	tripDistancePercentiles:(percentile[tripDistance;25];percentile[tripDistance;50];percentile[tripDistance;75]);
	:(`totalAmountPercentiles`tipAmountPercentiles`tripDistancePercentiles)!(totalAmountPercentiles;tipAmountPercentiles;tripDistancePercentiles)
	}


/olsfit
/   Obtain Ordinary Least Squares (OLS) coefficients.
/INPUT
/   x: predictors (as a N x M list)
/   y: responses (as an N x 1 list)
/OUTPUT
/   out: M x 1 list of coefficients
olsfit:{[x;y] (inv (flip x) mmu x) mmu ((flip x) mmu y) }

getMlRecommendedTipValue:{[pl;dl;tripDistance;passengerCount;fareAmount]
	if[null tripDistance;tripDistance:exec first tripDistance from select avg tripDistance from taxiData where pickupLoc=pl,dropoffLoc=dl, not tripDistance=0];
	if[null fareAmount;fareAmount:exec first fareAmount from select avg fareAmount from taxiData where pickupLoc=pl,dropoffLoc=dl,not fareAmount=0];
	numericalDataToUse:select tripDistance:"f"$tripDistance,passengerCount:"f"$passengerCount,fareAmount:"f"$fareAmount,tipAmount:"f"$tipAmount from taxiData where pickupLoc=pl,dropoffLoc=dl, not tripDistance=0, not null tripDistance, not null passengerCount, not null fareAmount,not null tipAmount,not passengerCount=0;
	if[not count numericalDataToUse;:0N];
	res:olsfit[flip value exec tripDistance,passengerCount, fareAmount from numericalDataToUse;enlist each exec tipAmount from numericalDataToUse];
	(tripDistance*first res[0])+(passengerCount*first res[1])+(fareAmount*first res[2])
	}
