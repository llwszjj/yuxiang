/*
*
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

*/

//Create SQL query
var getAccountsTransactionsStatement = WL.Server.createSQLStatement( 
	"SELECT `userId`,`content`,`email`,DATE_FORMAT(`messageDate`,'%Y-%m-%d %H:%i:%s') as `messageDate` From messages order by messageDate desc"
);
var getActivitiesTransactionsStatement = WL.Server.createSQLStatement( 
	"SELECT * From activities order by ActivityId desc"
);
//Invoke prepared SQL query and return invocation result	
function getFeeds(){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getAccountsTransactionsStatement,
		parameters : []
		
	});
}

function getActivities(){
	return WL.Server.invokeSQLStatement({
		preparedStatement : getActivitiesTransactionsStatement,
		parameters : []
		
	});
}

var procedure1Statement = WL.Server.createSQLStatement("insert into messages( `userId`,`content`,`email`,`messageDate`) values (?,?,?,NULL)");
function InsertFeed(param1,param2,param3){
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [param1,param2,param3]
	});
}
