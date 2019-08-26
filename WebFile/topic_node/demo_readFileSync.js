var fs = require("fs");

var data = fs.readFileSync('tempfile.txt')// 加上Sync 意思是强制同步

console.log(data.toString());
console.log("程序结束！")