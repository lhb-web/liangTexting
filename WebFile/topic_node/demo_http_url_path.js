// var url = require('url');
// var path = require('path');
// var http = require("http");
// console.log(url.parse('http://user:passs@host.com:8080/path/to/file?query=string#hash'));
// 
// // 解析当前目录
// var workDir = path.resolve('.'); //  '/Users/michael'
// // 组合完整的文件路径：当前目录+'pub'+'index.html':
// var filePath = path.join(workDir, 'pub', 'index.html');
// // '/Users/michael/pub/index.html'
// console.info("输出目录——" + filePath);
// 
// http.createServer(function(request, response) {
// 	console.log('请求方法--'+request.method + '--请求地址 ' + request.url);
// 	response.writeHead(200, {
// 		'Content-Type': 'text/plain;charset=utf-8'
// 	});
// 	response.end('梁鸿标\n');
// }).listen(8808);
// console.log('Server running at http://127.0.0.1:8808/');




var url = require('url');
var fs = require('fs');
var path = require('path');
var http = require("http");

// 请求当前目录
var workDir = path.resolve('.');

var server = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	console.info("请求的地址" + pathname)
	if(pathname == '/'){
		var filePath = path.join(workDir, pathname,'web/index.html');
	}else{
		var filePath = path.join(workDir, pathname);
	}
	
	console.info("输出目录——" + filePath);
	fs.stat(filePath, function(err, stats) {
		if (!err && stats.isFile()) {
			console.log('200' + request.url);
			response.writeHead(200);
			fs.createReadStream(filePath).pipe(response);
		} else {
			console.log('404' + request.url)
			response.writeHead(404);
			response.end('404 Not Found');
		}
	});
}).listen(8808);
