// 课堂练习 - 请将一个get请求的参数列表转换成对象

'use strict';

var url = require('url');
var http = require('http');
var path = require('path');
var querystring = require('querystring');
var util = require('util');

// 第二个参数是布尔值,如果是true,那么query值会被设置成对象
//方法1
// var urlString = 'http://127.0.0.1:8808/web/002.jpg?name=liang&age=18&title=杰出青年';
// var urlParse = url.parse(urlString,true);
// console.log(urlParse);
// var urlQuery = urlParse.query;
// console.log(urlQuery);
//方法3
// console.info(querystring.parse('name=liang&age=18&title=杰出青年'));
// 方法2
// var parObj = {};
// var pars = [];
// pars = ulrQuery.split("&");
// for (var i = 0; i < pars.length; i++) {
// 	var temp = pars[i].split("=");
// 	parObj[temp[0]] = temp[1];
// }
// console.info(parObj);

// 课堂练习 

http.createServer(function(request, response) {
	var urlParse = url.parse(request.url,true).query;
	// 方法1
	// var objString = "";
	// for(var x in urlParse){
	// 	objString += x+"--------"+urlParse[x]+"--------"+"\n";
	// }
	
	//方法2 
	var objString = util.inspect(urlParse);
	response.writeHead(200, {
		'Content-Type': 'text/plain;charset=utf-8'
	});
	response.end(objString);
}).listen(8808);
