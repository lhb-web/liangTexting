'use strict';

var fs = require('fs');

// 当前目录 ---磁盘根目录是'/' ---上层目录是'../'
var pathName = "./";
fs.readdir(pathName,function(err,files){
	if(err){
		return console.error(err);
	}
	//遍历数组
	files.forEach(function(file){
		console.log(file);
	});
});
// fs.rmdir()删除目录