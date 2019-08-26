// 作业1 - 编写一段插入一条记录的代码
const mysql = require("mysql");

const connection = mysql.createConnection({
	host:"localhost",// 主机地址
	port: 3306, // 如果修改了数据库的默认端口，这个属性不可忽略
	user:"root",// 数据库用户名
	password:"",// 数据库用户密码
	database:"liang" // 数据库名
});

connection.connect();
connection.query('insert into Person(name) value("lhb")',function(error,results,fields){
	if(error){
		throw error;
	}else{
		console.info(results);
	}
});


// 作业二
'use strict'
const events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('TheDateOf', function() {
	console.info(new Date().toLocaleString());
});
eventEmitter.on('millisecond', function() {
	console.info(new Date().getTime());
});
var counter01 = 0;
var timer = setInterval(function() {
	counter01 ++;
	if( counter01 <= 5){
		eventEmitter.emit('TheDateOf');
	}else if( counter01 >5 && counter01<=10){
		eventEmitter.emit('millisecond');
	}else if(counter01 > 10 && counter01<=15){
		eventEmitter.emit('TheDateOf');
	}else if( counter01 >15){
		console.info("停止输出");
		clearInterval(timer);
	}
	
}, 2000);


// 作业三
var fs = require("fs");
fs.readFile('tempfile.txt', function(err, data) {
	if (err) {
		return console.error(err);
	} else {
		console.log(data.toString());
		var writeStream1 = fs.createWriteStream('temp1.txt','utf-8');
		writeStream1.write(data.toString());
		writeStream1.end();
	}
});