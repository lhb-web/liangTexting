'use strict';
var fs = require('fs');

var writeStream1 = fs.createWriteStream('temp1.txt','utf-8');
writeStream1.write("hahah\n");
writeStream1.write("hehehe\n");
// 不写end（） 流就不会结束 有消耗
writeStream1.end();

// 作业3: 把tempfile.txt的内容,复制到temp1.txt中