/*TABLE CREATE STATEMENTS*/
/*auth_user table used for user registration and login. Stores user's email, username and password. 
User is assigned an id, which is PK. Username must be unique*/
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL, -- stored in PBKDF2 format <algorithm>$<iterations>$<salt>$<hash>
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

/*userTable stores basic information about the user, including username, name, age, zipcode, zoneId, etc. Username is the PK, and 
username is the only required field. All other fields are optional. zoneId, favZoneId and zipcode are foreign keys referencing 
zoneData.zoneID, zoneData.zoneID, and nycBoroughs.Zcta Num respectively. minSpend, maxSpend, vaccPref, minRideDistance, 
maxRideDistance, and maxRideTime are fields used for us to suggest taxi rides according to these preferences*/ 
CREATE TABLE `userTable` (
  `username` varchar(45) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `prefRide` varchar(45) DEFAULT NULL, -- preferred type of taxi vehicle ex. Sedan
  `vaccine` varchar(45) DEFAULT NULL, -- vaccinated or not
  `zoneId` int(11) DEFAULT NULL, -- home zoneId
  `zipcode` int(11) DEFAULT NULL, -- home zipcode
  `favZoneId` int(11) DEFAULT NULL,
  `favBorough` varchar(45) DEFAULT NULL,
  `minSpend` int(11) DEFAULT NULL, -- minimum amount to spend for a taxi ride
  `maxSpend` int(11) DEFAULT NULL, -- maximum amount to spend for a taxi ride
  `vaccPref` int(11) DEFAULT NULL, -- minimum vaccination percentage of the destination for a taxi ride
  `minRideDistance` int(11) DEFAULT NULL, -- minimum ride distance for a taxi ride
  `maxRideDistance` int(11) DEFAULT NULL, -- maximum ride distance for a taxi ride
  `maxRideTime` int(11) DEFAULT NULL, -- maximum ride time for a taxi ride
  PRIMARY KEY (`username`),
  KEY `zoneId_idx` (`zoneId`),
  KEY `zipcode_idx` (`zipcode`),
  KEY `favZoneId_idx` (`favZoneId`),
  CONSTRAINT `favZoneId` FOREIGN KEY (`favZoneId`) REFERENCES `zoneData` (`zoneID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `zipcode` FOREIGN KEY (`zipcode`) REFERENCES `nycBoroughs` (`Zcta Num`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `zoneId` FOREIGN KEY (`zoneId`) REFERENCES `zoneData` (`zoneID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*zoneData stores info about taxizones, their names and IDs, which borough they are in, and the type of service zone. zoneID is PK*/
CREATE TABLE `zoneData` (
  `zoneID` int(11) NOT NULL,
  `boroughName` text, -- which borough the zone is in
  `zoneName` text,
  `serviceZone` text, -- type of service: Boro Zone vs Yellow Zone
  PRIMARY KEY (`zoneID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*nycBoroughs contains COVID-19 vaccination data for NYC neighborhoods and boroughs. Zcta Num is PK. PERC_FULLY is the percent of 
population in that neighborhood that is fully vaccinated. Data is from 4/22/21. Source: NYC Vaccine Command Center 
https://www1.nyc.gov/site/doh/covid/covid-19-data-vaccines.page */
CREATE TABLE `nycBoroughs` (
  `NEIGHBORHOOD_NAME` text,
  `Zcta Num` int(11) NOT NULL,
  `At least 1 dose` text, -- number of adults in the neighborhood who have received at least 1 COVID vaccine dose
  `Indicator` text,
  `N_FULLY_VACCINATED_CUMULATIVE` text, -- number of adults in the neighborhood who are fully vaccinated against COVID
  `PERC_FULLY` text, -- percent of adults in the neighborhood who are fully vaccinated
  `PERC_at least 1 dose` text, -- percent of adults in the neighborhood who have received at least 1 COVID vaccine dose
  `POPULATION_ESTIMATE` text, -- approximate population of neighborhood
  `BOROUGH_NAME` text, -- which borough the neighborhood is in
  PRIMARY KEY (`Zcta Num`),
  KEY `zipcodeindex` (`Zcta Num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*covidDatabyDay contains COVID case count data, death count, probable case count, etc. for each borough of NYC. date_of_interest is PK.
Table contains data from 2020-10-24 to 2021-04-22. Source: NYC health department https://github.com/nychealth/coronavirus-data */
CREATE TABLE `covidDatabyDay` (
  `date_of_interest` date NOT NULL,
  `CASE_COUNT` int(11) DEFAULT NULL,
  `PROBABLE_CASE_COUNT` int(11) DEFAULT NULL,
  `HOSPITALIZED_COUNT` int(11) DEFAULT NULL,
  `DEATH_COUNT` int(11) DEFAULT NULL,
  `PROBABLE_DEATH_COUNT` int(11) DEFAULT NULL,
  `CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `ALL_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `HOSP_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `ALL_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BX_CASE_COUNT` int(11) DEFAULT NULL, -- BX = BRONX data
  `BX_PROBABLE_CASE_COUNT` int(11) DEFAULT NULL,
  `BX_HOSPITALIZED_COUNT` int(11) DEFAULT NULL,
  `BX_DEATH_COUNT` int(11) DEFAULT NULL,
  `BX_PROBABLE_DEATH_COUNT` int(11) DEFAULT NULL,
  `BX_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BX_ALL_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BX_HOSPITALIZED_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BX_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BX_ALL_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BK_CASE_COUNT` int(11) DEFAULT NULL, -- BK = Brooklyn data
  `BK_PROBABLE_CASE_COUNT` int(11) DEFAULT NULL,
  `BK_HOSPITALIZED_COUNT` int(11) DEFAULT NULL,
  `BK_DEATH_COUNT` int(11) DEFAULT NULL,
  `BK_PROBABLE_DEATH_COUNT` int(11) DEFAULT NULL,
  `BK_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BK_ALL_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BK_HOSPITALIZED_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BK_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `BK_ALL_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `MN_CASE_COUNT` int(11) DEFAULT NULL, -- MN = Manhattan data
  `MN_PROBABLE_CASE_COUNT` int(11) DEFAULT NULL,
  `MN_HOSPITALIZED_COUNT` int(11) DEFAULT NULL,
  `MN_DEATH_COUNT` int(11) DEFAULT NULL,
  `MN_PROBABLE_DEATH_COUNT` int(11) DEFAULT NULL,
  `MN_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `MN_ALL_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `MN_HOSPITALIZED_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `MN_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `MN_ALL_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `QN_CASE_COUNT` int(11) DEFAULT NULL, -- QN = Queens data
  `QN_PROBABLE_CASE_COUNT` int(11) DEFAULT NULL,
  `QN_HOSPITALIZED_COUNT` int(11) DEFAULT NULL,
  `QN_DEATH_COUNT` int(11) DEFAULT NULL,
  `QN_PROBABLE_DEATH_COUNT` int(11) DEFAULT NULL,
  `QN_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `QN_ALL_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `QN_HOSPITALIZED_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `QN_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `QN_ALL_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `SI_CASE_COUNT` int(11) DEFAULT NULL, -- SI = Staten Island data
  `SI_PROBABLE_CASE_COUNT` int(11) DEFAULT NULL,
  `SI_HOSPITALIZED_COUNT` int(11) DEFAULT NULL,
  `SI_DEATH_COUNT` int(11) DEFAULT NULL,
  `SI_PROBABLE_DEATH_COUNT` int(11) DEFAULT NULL,
  `SI_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `SI_ALL_CASE_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `SI_HOSPITALIZED_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `SI_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `SI_ALL_DEATH_COUNT_7DAY_AVG` int(11) DEFAULT NULL,
  `INCOMPLETE` int(11) DEFAULT NULL,
  PRIMARY KEY (`date_of_interest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*VIEWS*/
/*view of covidDatabyDay table with just Manhattan data. Used to analyze Manhattan covid case data and show trendlines for this borough*/ 
CREATE VIEW `covidDatabyDayManhattan` AS
    SELECT 
        `covidDatabyDay`.`date_of_interest` AS `date_of_interest`,
        `covidDatabyDay`.`MN_CASE_COUNT` AS `case_count`,
        `covidDatabyDay`.`MN_PROBABLE_CASE_COUNT` AS `probable_case_count`,
        `covidDatabyDay`.`MN_HOSPITALIZED_COUNT` AS `hospitalized_count`,
        `covidDatabyDay`.`MN_DEATH_COUNT` AS `death_count`,
        `covidDatabyDay`.`MN_PROBABLE_DEATH_COUNT` AS `probable_death_count`,
        `covidDatabyDay`.`MN_CASE_COUNT_7DAY_AVG` AS `case_count_7day_avg`, -- used for trendlines
        `covidDatabyDay`.`MN_ALL_CASE_COUNT_7DAY_AVG` AS `all_case_count_7day_avg`, -- case_count + probable_case_count
        `covidDatabyDay`.`MN_HOSPITALIZED_COUNT_7DAY_AVG` AS `hospitalized_count_7day_avg`,
        `covidDatabyDay`.`MN_DEATH_COUNT_7DAY_AVG` AS `death_count_7day_avg`,
        `covidDatabyDay`.`MN_ALL_DEATH_COUNT_7DAY_AVG` AS `all_death_count_7day_avg`
    FROM
        `covidDatabyDay`;
        
/*view of covidDatabyDay table with just Queens data. Used to analyze Queens covid case data and show trendlines for this borough*/         
CREATE VIEW `covidDatabyDayQueens` AS
    SELECT 
        `covidDatabyDay`.`date_of_interest` AS `date_of_interest`,
        `covidDatabyDay`.`QN_CASE_COUNT` AS `case_count`,
        `covidDatabyDay`.`QN_PROBABLE_CASE_COUNT` AS `probable_case_count`,
        `covidDatabyDay`.`QN_HOSPITALIZED_COUNT` AS `hospitalized_count`,
        `covidDatabyDay`.`QN_DEATH_COUNT` AS `death_count`,
        `covidDatabyDay`.`QN_PROBABLE_DEATH_COUNT` AS `probable_death_count`,
        `covidDatabyDay`.`QN_CASE_COUNT_7DAY_AVG` AS `case_count_7day_avg`,-- used for trendlines
        `covidDatabyDay`.`QN_ALL_CASE_COUNT_7DAY_AVG` AS `all_case_count_7day_avg`,-- case_count + probable_case_count
        `covidDatabyDay`.`QN_HOSPITALIZED_COUNT_7DAY_AVG` AS `hospitalized_count_7day_avg`,
        `covidDatabyDay`.`QN_DEATH_COUNT_7DAY_AVG` AS `death_count_7day_avg`,
        `covidDatabyDay`.`QN_ALL_DEATH_COUNT_7DAY_AVG` AS `all_death_count_7day_avg`
    FROM
        `covidDatabyDay`;
        
/*view of covidDatabyDay table with just Bronx data. Used to analyze Bronx covid case data and show trendlines for this borough*/        
CREATE VIEW `covidDatabyDayBronx` AS
    SELECT 
        `covidDatabyDay`.`date_of_interest` AS `date_of_interest`,
        `covidDatabyDay`.`BX_CASE_COUNT` AS `case_count`,
        `covidDatabyDay`.`BX_PROBABLE_CASE_COUNT` AS `probable_case_count`,
        `covidDatabyDay`.`BX_HOSPITALIZED_COUNT` AS `hospitalized_count`,
        `covidDatabyDay`.`BX_DEATH_COUNT` AS `death_count`,
        `covidDatabyDay`.`BX_PROBABLE_DEATH_COUNT` AS `probable_death_count`,
        `covidDatabyDay`.`BX_CASE_COUNT_7DAY_AVG` AS `case_count_7day_avg`,-- used for trendlines
        `covidDatabyDay`.`BX_ALL_CASE_COUNT_7DAY_AVG` AS `all_case_count_7day_avg`,-- case_count + probable_case_count
        `covidDatabyDay`.`BX_HOSPITALIZED_COUNT_7DAY_AVG` AS `hospitalized_count_7day_avg`,
        `covidDatabyDay`.`BX_DEATH_COUNT_7DAY_AVG` AS `death_count_7day_avg`,
        `covidDatabyDay`.`BX_ALL_DEATH_COUNT_7DAY_AVG` AS `all_death_count_7day_avg`
    FROM
        `covidDatabyDay`;

/*view of covidDatabyDay table with just Brooklyn data. Used to analyze Brooklyn covid case data and show trendlines for this borough*/        
CREATE VIEW `covidDatabyDayBrooklyn` AS
    SELECT 
        `covidDatabyDay`.`date_of_interest` AS `date_of_interest`,
        `covidDatabyDay`.`BK_CASE_COUNT` AS `case_count`,
        `covidDatabyDay`.`BK_PROBABLE_CASE_COUNT` AS `probable_case_count`,
        `covidDatabyDay`.`BK_HOSPITALIZED_COUNT` AS `hospitalized_count`,
        `covidDatabyDay`.`BK_DEATH_COUNT` AS `death_count`,
        `covidDatabyDay`.`BK_PROBABLE_DEATH_COUNT` AS `probable_death_count`,
        `covidDatabyDay`.`BK_CASE_COUNT_7DAY_AVG` AS `case_count_7day_avg`,-- used for trendlines
        `covidDatabyDay`.`BK_ALL_CASE_COUNT_7DAY_AVG` AS `all_case_count_7day_avg`,-- case_count + probable_case_count
        `covidDatabyDay`.`BK_HOSPITALIZED_COUNT_7DAY_AVG` AS `hospitalized_count_7day_avg`,
        `covidDatabyDay`.`BK_DEATH_COUNT_7DAY_AVG` AS `death_count_7day_avg`,
        `covidDatabyDay`.`BK_ALL_DEATH_COUNT_7DAY_AVG` AS `all_death_count_7day_avg`
    FROM
        `covidDatabyDay`;

/*view of covidDatabyDay table with just Staten Island data. Used to analyze Staten Island covid case data and show trendlines for this borough*/
CREATE VIEW `covidDatabyDayStatenIsland` AS
    SELECT 
        `covidDatabyDay`.`date_of_interest` AS `date_of_interest`,
        `covidDatabyDay`.`SI_CASE_COUNT` AS `case_count`,
        `covidDatabyDay`.`SI_PROBABLE_CASE_COUNT` AS `probable_case_count`,
        `covidDatabyDay`.`SI_HOSPITALIZED_COUNT` AS `hospitalized_count`,
        `covidDatabyDay`.`SI_DEATH_COUNT` AS `death_count`,
        `covidDatabyDay`.`SI_PROBABLE_DEATH_COUNT` AS `probable_death_count`,
        `covidDatabyDay`.`SI_CASE_COUNT_7DAY_AVG` AS `case_count_7day_avg`,-- used for trendlines
        `covidDatabyDay`.`SI_ALL_CASE_COUNT_7DAY_AVG` AS `all_case_count_7day_avg`,-- case_count + probable_case_count
        `covidDatabyDay`.`SI_HOSPITALIZED_COUNT_7DAY_AVG` AS `hospitalized_count_7day_avg`,
        `covidDatabyDay`.`SI_DEATH_COUNT_7DAY_AVG` AS `death_count_7day_avg`,
        `covidDatabyDay`.`SI_ALL_DEATH_COUNT_7DAY_AVG` AS `all_death_count_7day_avg`
    FROM
        `covidDatabyDay`;

/*STORED PROCEDURES*/
/*getUserNeighborhood takes username, returns neighborhoods from nycBoroughs that are in the user's favorite borough (userTable.favBorough)
and percent fully vaccinated is greater than or equal to the user's vaccination preference (userTable.vaccPref). Duplicates in 
nycBoroughs have the perc_fully and perc_at least 1 dose fields averaged and grouped together to eliminate duplicates*/
DELIMITER $$
CREATE PROCEDURE `getUserNeighborhoods`(IN uname varchar(45))
BEGIN
select neighborhood_name, round(avg(perc_fully), 0) as 'PERC_FULLY' , round(avg(`PERC_at least 1 dose`), 0) as 'PERC_at least 1 dose'
from -- select from a joined table
(select n.neighborhood_name, n.PERC_FULLY, n.`PERC_at least 1 dose`, n.Borough_name, userPref.vaccPref 
	from nycBoroughs n
	INNER JOIN (select favBorough, vaccPref from userTable where username = uname) as userPref -- inner join to only include joined rows that fulfill condition
	ON n.Borough_name = userPref.favBorough and n.PERC_FULLY >= userPref.vaccPref) as userNeighborhoods -- join rows where nycBorough is the user's favBorough
    -- only join rows where neighborhood percent fully vaccinated is greater or equal to user's vaccine preference
group by neighborhood_name;
END
DELIMITER ;

/*takes username parameter, returns zoneIDs from zoneData that are in user's favorite borough, userTable.favBorough */
DELIMITER $$
CREATE PROCEDURE `getUserZoneIDs`(IN uname varchar(45))
BEGIN
Select * from zoneData where zoneData.boroughName = (select favBorough from userTable where username = uname);
END$$
DELIMITER ;

/*Updates user's minSpend, maxSpend, vaccPref, minRideDistance, maxRideDistance, and/or maxRideTime. Takes username and 
6 parameters for updating the fields. Don't have to update every field, pass in NULL to keep that field unchanged. */
DELIMITER $$
CREATE PROCEDURE `planRide`(IN uname varchar(45), IN minsp int(11), IN maxsp int(11), IN vcpref int(11), IN minRdDs int(11), IN maxRdDs int(11), IN maxRdTm int(11))
begin
	update userTable
	set minSpend = 
	case 
		when minsp IS null then minSpend -- if parameter is null, do not change
		else minsp -- if not null, then update field with parameter
	end
	where username = uname;
	update userTable
	set maxSpend = 
	case 
		when maxsp IS null then maxSpend -- if parameter is null, do not change
		else maxsp -- if not null, then update field with parameter
	end
	where username = uname;
    update userTable
	set vaccPref = 
	case 
		when vcpref IS null then vaccPref -- if parameter is null, do not change
		else vcpref -- if not null, then update field with parameter
	end
	where username = uname;
    update userTable
	set minRideDistance = 
	case 
		when minRdDs IS null then minRideDistance -- if parameter is null, do not change
		else minRdDs -- if not null, then update field with parameter
	end
	where username = uname;
    update userTable
	set maxRideDistance = 
	case 
		when maxRdDs IS null then maxRideDistance -- if parameter is null, do not change
		else maxRdDs -- if not null, then update field with parameter
	end
	where username = uname;
    update userTable
	set maxRideTime = 
	case 
		when maxRdTm IS null then maxRideTime -- if parameter is null, do not change
		else maxRdTm -- if not null, then update field with parameter
	end
	where username = uname;
end$$
DELIMITER ;

/*Updates user info fields: firstName, lastName, Age, prefRide, vaccine, zoneID, zipcode, favZoneID, and/or favBorough. Takes username 
and 9 parameters for updating the fields. Don't have to update every field, pass in NULL to keep that field unchanged. */
DELIMITER $$
CREATE PROCEDURE `update_userTable`(IN uname varchar(45), IN fName varchar(45), IN lName varchar(45), IN uage int(11), IN pRide varchar(45), IN vcn varchar(45), IN zID int(11), IN zpcode int(11), IN fzID int(11), IN fboro varchar(45))
begin
	update userTable
    set firstName = 
	case 
		when fName IS null then firstName -- if parameter is null, do not change
        else fName -- if not null, then update field with parameter, same for each parameter
	end
	where username = uname;
    
    /*same format for each parameter*/
    update userTable
    set lastName = 
	case 
		when lName IS null then lastName
        else lName
	end
	where username = uname;
    
    update userTable
    set Age = 
	case 
		when uage IS null then Age
        else uage
	end
	where username = uname;
    
    update userTable
    set prefRide = 
	case 
		when pRide IS null then prefRide
        else pRide
	end
	where username = uname;
    
    update userTable
    set vaccine = 
	case 
		when vcn IS null then vaccine
        else vcn
	end
	where username = uname;
    
    update userTable
    set zoneID = 
	case 
		when zID IS null then zoneID
        else zID
	end
	where username = uname;
    
    update userTable
    set zipcode = 
	case 
		when zpcode IS null then zipcode
        else zpcode
	end
	where username = uname;
    
    update userTable
    set favZoneID = 
	case 
		when fzID IS null then favZoneID
        else fzID
	end
	where username = uname;
    
    update userTable
    set favBorough = 
	case 
		when fboro IS null then favBorough
        else fboro
	end
	where username = uname;
end$$
DELIMITER ;

/*TRIGGERS*/
/*trigger to delete record of user info from userTable if user account is deleted from auth_user table*/
DELIMITER $$
USE `nygmdb`$$
CREATE TRIGGER `nygmdb`.`auth_user_AFTER_DELETE` AFTER DELETE ON `auth_user` 
FOR EACH ROW
BEGIN
DELETE from nygmdb.userTable where nygmdb.userTable.username=old.username;
END$$
DELIMITER ;

/*trigger when a new user's account is registered and record is inserted in auth_user table, create a record in userTable with
new account's username*/
DELIMITER $$
CREATE TRIGGER newUser AFTER INSERT ON auth_user
FOR EACH ROW
INSERT INTO userTable(username) VALUES (NEW.username)
DELIMITER ;

/*FUNCTIONS*/
/*function to calculate 7-day moving average of case_count for covidDatabyDay table. 7-day moving average is used to create smooth 
trendline*/
SELECT a.date_of_interest, a.bx_case_count,    	
Round( ( SELECT SUM(b.bx_case_count) / COUNT(b.bx_case_count)             	
FROM covidDatabyDay AS b             	
WHERE DATEDIFF(a.date_of_interest, b.date_of_interest) BETWEEN 0 AND 4), 2) 
AS '7dayMovingAvg'  	
FROM covidDatabyDay AS a ORDER BY a.date_of_interest LIMIT 0, 1000