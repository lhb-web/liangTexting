var url = require('url');
var express = require('express');
var app = express();
const WebSocket = require('ws');
const allData = [];
app.use('/web', express.static('web'));
var mysql = require('mysql');
const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	port: 3306, // 如果修改了数据库的默认端口，这个属性不可忽略
	user: "root", // 数据库用户名
	password: "", // 数据库用户密码
	database: "liang" // 数据库名
});
var server = app.listen(8081, function() {

	console.log("服务器启动成功")

})
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/web/index.html");
})
const wss = new WebSocket.Server({
	port: 3000,
	verifyClient: function(info) {
		// 取得的http请求的信息,进行校验
		let urlxxx = info.req.url;
		var queryObj = url.parse(urlxxx, true).query;
		// console.info(queryObj);
		// 写死,可以修改
		if (queryObj.passCode && queryObj.passCode == '3344' && queryObj.name) {
			return true;
		} else {
			return false;
		}
	}
}, function() {
	console.info("socket服务开始监听3000端口");
});

var allClient = [];

wss.on('connection', function(ws, request) {
	console.info('当前连接数 = ' + wss.clients.size); //所有的客户端,存在一个set结构中

	let urlxxx = request.url;
	var queryObj = url.parse(urlxxx, true).query;
	console.info(queryObj);

	ws.queryObj = queryObj;
	allClient.push(ws);
	// console.info(allClient);

	ws.on('message', function(message) {
		console.info('收到客户端的信息 %s', message);
		allData.push(message);
		//var text4return = refreshData(message);
		// 单发
		//ws.send(text4return);

		// 群发/广播
		// wss.clients.forEach(function each(client) {
		// 	console.info(wss.clients.queryObj);
		// 	if (client.readyState === WebSocket.OPEN) {
		// 		client.send(message + "\n");
		// 	}
		// })

		// 私聊
		for (var j = 0; j < allClient.length; j++) {
			//测试
			// if( allClient[j].queryObj.name == '梁鸿标'){
			// console.info(allClient[]);
			allClient[j].send(queryObj.name + ':' + message + '\n');
			// }
		}
		splStrig = "insert into chatMessages(user_name ,user_chat) values('" + queryObj.name + "','" + message + "')";
		connection.query(splStrig, function(error, result, fields) {
			if (error) {
				console.info('插入失败')
			} else if (result.length <= 0) {
				console.info('插入失败')
			} else {
				console.info('插入成功')
			}
		});


	});
	ws.send('服务器连接成功,可以开始匿名聊天' + '\n');
});

// 接收到用户的信息,存起来,一起返回到客户端

function refreshData(mess) {
	allData.push(mess);
	var text4return = '';
	for (var i = 0; i < allData.length; i++) {
		text4return += allData[i] + "\n";
	}
	return text4return;
}


// 作业1:聊天信息存在数据库里边
// 作业2:要区分聊天人的信息
// 作业3:不要每次都返回所有的聊天信息,而是返回最后发表的信息

// -- 1.数据库 2.消息群发 3.只返回最新消息 refreshData()需要修改! ******4.识别用户-私聊  5.用web服务器来做页面,实现局域网聊天
