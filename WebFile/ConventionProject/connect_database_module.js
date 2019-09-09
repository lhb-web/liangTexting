var connection = null;

function connectionData() {
	var mysql = require('mysql');
	connection = mysql.createConnection({
		host: "localhost", // 主机地址
		port: 3306, // 如果修改了数据库的默认端口，这个属性不可忽略
		user: "root", // 数据库用户名
		password: "", // 数据库用户密码
		database: "liang" // 数据库名
	});
	connection.connect();
}
exports.connectionData = connectionData;

// 查询展厅信息
function exhibition(request, response) {
	var sqlString = "select teh_area,companyName,elapsedTime,teh_price from tehInformation where teh_name= '" + request.query
		.tehName + "'";
	connection.query(sqlString, function(err, result, file) {
		// console.info(result[0].companyName);
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			response.json({
				"ok": true,
				"companyName": result[0].companyName,
				"teh_area": result[0].teh_area,
				"elapsedTime": result[0].elapsedTime,
				"teh_price": result[0].teh_price
			});
		}


	});
}
exports.exhibition = exhibition;

// 查询申请列表
function searchApplication(request, response) {
	var sqlString = "select * from subs";
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			response.json({
				"ok": true,
				"theApply": result
			});
		}
	});
}
exports.searchApplication = searchApplication;


//同意申请,发射信息到展厅信息
function InformationStorage(request, response) {
	var sqlString01 = "select * from subs where id="+request.query.applyId;
	connection.query(sqlString01, function(err, result, file) {
		console.info(result[0].companyName);
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			console.info(result[0].companyName);
			console.info(result[0].teh_name);
			var sqlString02 = "update tehInformation set companyName='" + result[0].companyName + "',elapsedTime='" + result[0]
				.elapsedTime +
				"',teh_price='" + result[0].teh_price + "' where teh_name='" + result[0].teh_name + "'"
			connection.query(sqlString02, function(err, result, file) {
				if (err) {
					response.json({
						"ok": false
					});
				} else if (result.length <= 0) {
					response.json({
						"ok": false
					});
				} else {
					response.json({
						"ok": true,
					});
				}
			});
		}
	});
}

exports.InformationStorage = InformationStorage;

// 拒绝申请
function refuseToApply(request, response) {
	var sqlString = "delete from subs where id = '" + request.query.applyId + "'";
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			response.json({
				"ok": true,
			});
		}
	});
}

exports.refuseToApply = refuseToApply;
