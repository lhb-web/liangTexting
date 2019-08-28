var fs = require("fs");

var readerStream = fs.createReadStream('tempfile.txt');
var writerStream = fs.createWriteStream('output.txt');

readerStream.pipe(writerStream);
console.log("程序编写完成！")