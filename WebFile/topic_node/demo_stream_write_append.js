var fs = require('fs');
var newLine = "\n哈哈哈哈哈哈";
// fs.writeFile('output.txt',newLine,function(err){
// 	if(err){
// 		throw err;
// 	}else{
// 		console.log('ok');
// 	}
// });
fs.appendFile('output.txt',newLine,function(err){
	if(err){
		throw err;
	}
	console.log('ok');
});