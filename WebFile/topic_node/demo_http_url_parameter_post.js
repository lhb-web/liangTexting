/*
 启动服务器
 筛选url中的信息,如果是get -->就让他指向/web/test_post.html
 如果是post,并且请求地址为"",则返回其请求的参数
 */

var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	querystring = require('querystring'),
	util = require('util');
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	port: 3306, // 如果修改了数据库的默认端口，这个属性不可忽略
	user: "root", // 数据库用户名
	password: "", // 数据库用户密码
	database: "liang" // 数据库名
});

connection.connect();

var root = path.resolve(process.argv[2] || '.')

http.createServer(function(request, response) {
	// 筛选url,区分get和post
	var mthodRES = request.method;
	var urlRES = request.url;
	// console.info(mthodRES + urlRES)
	if (mthodRES == 'GET' || mthodRES == 'get') {
		if (urlRES == '/') {
			gotoPage("/web/test_post.html", request, response);
		} else {
			gotoPage(urlRES, request, response);
		}
	}
	if (mthodRES == 'POST' || mthodRES == 'post') {
		// 收集post过来的参数列表
		var postDate = '';
		request.on('data', function(chunk) {
			postDate += chunk;
		});
		// 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。

		request.on('end', function() {
			// 当流收集完整参数后,变成一个对象
			postDate = querystring.parse(postDate);

			// 处理收到的post参数
			handlePost(urlRES, postDate, response);

		});

	}

}).listen(7533);

console.info("服务器已经启动,监听7533");

// 返回指定页面GET 作业四!!!!!!!!!!!!!!!!!!!!!!!!!!
function gotoPage(pagePath, request, response) {
	var pathName = url.parse(request.url, true).pathname;
	var urlQuery = url.parse(request.url, true).query;
	var filePath = path.join(root, pagePath);
	var studentName = "";
	//获取文件状态
	fs.stat(filePath, function(err, stats) {
		if (!err && stats.isFile()) {
			response.writeHead(200);
			fs.createReadStream(filePath).pipe(response);
		} else if (pathName == '/getUserInfo') {
			// 通过ID查询数据库 返回名字 !
			// 查询数据库
			urlQuery.Id = parseInt(urlQuery.Id);
			connection.query('select * from Person where id=' + urlQuery.Id, function(error, results, fields) {
				if (error) {
					throw error;
				} else {
					console.info(results);
					if( results == ""){
						studentName = "未找到";
					}else{
						studentName = results[0].name;
					}
					
					response.writeHead(200, {
						'Content-Type': 'text/plain;charset=utf-8',
					});
					response.end(studentName);
				}
			});
		} else {
			console.log('404' + request.url)
			response.writeHead(404);
			response.end('404 Not Found');
		}
	});
}

// post   作业五!!!!!!!!!!!!!!
function handlePost(urlRES, postDate, response) {
	if (urlRES == '/testPost') {
		connection.query('update Person set name="' + postDate.name + '" where id=' + postDate.ID, function(error, results,fields) {
			if (error) {
				throw error;
			}
		});
		response.writeHead(200, {
			'Content-Type': 'text/plain;charset=utf-8'
		});
		response.end('修改成功!');
		
	}
}
