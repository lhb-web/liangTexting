const mysql = require("mysql");

const connection = mysql.createConnection({
	host:"localhost",// 主机地址
	port: 3306, // 如果修改了数据库的默认端口，这个属性不可忽略
	user:"root",// 数据库用户名
	password:"",// 数据库用户密码
	database:"liang" // 数据库名
});

connection.connect();

// 作业1 - 编写一段插入一条记录的代码

connection.query('select * from Person',function(error,results,fields){
	if(error){
		throw error;
	}else{
		console.info(results);
		for( var x in results){
			console.info(results[x].id);
		}
	}
});