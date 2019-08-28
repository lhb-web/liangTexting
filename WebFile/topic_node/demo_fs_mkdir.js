'use strict';

var fs = require('fs');

// 创建目录 /liang -- 这里直接写'/liang'表示在磁盘根目录创建  --./liang表示当前目录 -- ../liang当前目录的上层目录
// recursive:true 以递归的方式创建目录
fs.mkdir('./liang/hong',{ recursive:true},function(err){
	if(err){
		console.info(err);
	}else{
		console.info("创建成功");
	}
});