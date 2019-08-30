var express = require('express');
var fs = require('fs');
var app = express();

var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});

app.get('/', function(req, res) {
	console.info(req.path); // 获得请求的路径
	console.info(req.query); // 请求参数
	console.info(req.originalUrl); // 原始路径
	console.info(req.hostname); // 主机信息(域名)


	// 返回特定页面
	// fs.createReadStream('./web/index.html').pipe(res);
	// console.info(__dirname); 这就是root根目录(它已经被存到全局变量里边了)
	res.sendFile(__dirname + "/web/index.html"); // 返回静态资源(文件)
	// res.sendFile("./web/index.html") // 这样不可以, sendFile不接受相对路径
});


app.delete('/', function() {})
// app.put('/', function() {})
app.post('/', urlencodedParser, function(req, res) {
	console.info(req.path); // 获得请求的路径
	console.info(req.query); // 请求参数
	console.info(req.originalUrl); // 原始路径
	console.info(req.body); // 请求主体


	res.end("aslkjdalkdklas");
});


// 静态文件
app.use('/web',express.static('web'));









var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	// console.info(server);

	console.log("应用实例,访问地址为htpp://" + host + ":%s", port);
})
