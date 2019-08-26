'use strict';//启用严格模式
var http = require("http");
http.createServer(function(request,response){
	//发送HTTP头部
	response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
	response.end('梁鸿标\n');
}).listen(8808);
console.log('Server running at http://127.0.0.1:8808/');