var fs = require("fs");

var readerStream = fs.createReadStream('001.jpg');
var writerStream = fs.createWriteStream('002.jpg');

readerStream.pipe(writerStream);
console.log("程序编写完成！")