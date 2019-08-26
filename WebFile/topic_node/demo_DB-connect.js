const mysql = require("mysql");

const connection = mysql.createConnection({
	host:"localhost",// 主机地址
	user:"root",// 数据库用户名
	password:"",// 数据库用户密码
	database:"liang" // 数据库名
});

connection.connect();

connection.query('select * from Person',function(error,results,fields){
	if(error){
		throw error;
	}else{
		console.info(results);
	}
});