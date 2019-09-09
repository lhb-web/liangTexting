const WebSocket = require('ws');
const allData = [];
const wss = new WebSocket.Server({
	port: 3000
});

wss.on('connection', function(ws) {
	console.info('有新的连接');
	console.info('当前连接数 = ' + wss.clients.size); //所有的客户端,存在一个set结构中
	ws.on('message', function(message) {
		console.info('收到客户端的信息 %s', message);
		allData.push(message);
		//var text4return = refreshData(message);
		// 单发
		//ws.send(text4return);

		// 群发/广播
		wss.clients.forEach(function each(client) {
			if ( client.readyState === WebSocket.OPEN) {
				client.send(message + "\n");
			}
		})

	});
	ws.send('服务器连接成功,可以开始匿名聊天'+ '\n');
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
