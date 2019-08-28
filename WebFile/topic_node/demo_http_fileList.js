'use strict';

var http = require('http'),
	fs = require('fs'),
	path = require('path');

var root = path.resolve('.');
var fileName = "";
console.log("当前路径---" + root);
var filePath = path.join(root, '/web')
fs.readdir(filePath, function(err, files) {
	if (err) {
		return console.error(err);
	}
	//遍历数组
	files.forEach(function(file) {
		// console.info(file);
		fileName += file + '\n';
		console.info(fileName);
	});
});
var server = http.createServer(function(request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/plain;charset=utf-8'
	});
	response.end(fileName);
}).listen(8808);
