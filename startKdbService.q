system"l kdbData"
\p 1234
.z.ws:{neg[.z.w].j.j @[value;x;run x]}
/ run:{userQuery:.j.k x;show userQuery;:getTaxiData["I"$userQuery[`maxCount];"S"$userQuery[`fields]]}
run:{userQuery:.j.k x;show userQuery;:getUserEstimatedFare["I"$userQuery[`pl];"I"$userQuery[`dl]]}
getTaxiData:{[maxCount;fields] data:maxCount#?[taxiData;();0b;fields!fields];result:(`maxcount;`data)!(maxCount;data)}
getUserEstimatedFare:{[pl;dl] data:first select avg totalAmount,avg mtaTax,avg tipAmount,avg fareAmount from taxiData where pickupLoc=pl, dropoffLoc=dl;result:(`pl`dl`data)!(pl;dl;data)}