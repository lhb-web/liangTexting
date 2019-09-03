var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mysql = require('mysql');
var checkLogin = require('./demo_session_checke_login');
var app = express();
app.use(cookieParser());
const hour = 1000 * 60 * 60;
app.use('/web', express.static('web'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}));
const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	port: 3306, // 如果修改了数据库的默认端口，这个属性不可忽略
	user: "root", // 数据库用户名
	password: "", // 数据库用户密码
	database: "liang" // 数据库名
});

connection.connect();
var sessionOpts = {
	secret: 'a cool secret',
	resave: true,
	saveUninitialized: true,
	key: 'myapp_sid',
	cookie: {
		maxAge: hour * 2,
		secure: false
	}
}
app.use(session(sessionOpts));


//前端校验... //监听一个请求,将校验结果反馈给前端
app.get('/checkeLogin',function(req,res){
	if(checkLogin.checkLogin(req)){
		res.json({"login":true});
	}else{
		res.json({"login":false});
	}
})

// 修改成权限页面
app.get('/', function(req, res) {
	// console.info("我没有被过滤器拦截");
	// res.sendFile(__dirname + "/web/index.html");

	// 验证登录状态
	var sess = req.session;
	// if (!sess.userName) {
	// 	res.sendFile(__dirname + "/web/login.html");
	// } else {
	// 	res.setHeader('Content-Type', 'text/html;charset=utf-8');
	// 	res.write('<p> 欢迎你:' + sess.userName + '</p>'+'<form action="/logout" method="get"><input type="submit" value="注销" /></form>');
	// 	res.end();
	// }
	if (!checkLogin.checkLogin(req)) {
		res.sendFile(__dirname + "/web/login.html");
	} else {
		res.setHeader('Content-Type', 'text/html;charset=utf-8');
		res.write('<p> 欢迎你:' + sess.userName + '</p>');
		res.end();
	}

});

app.post('/logout', function(request, response) {
	var sess = request.session;
	delete sess.userName;
	console.info("注销")
	console.info(sess.userName);
	response.json({
		"logout":true
	})
	// response.sendFile(__dirname + "/web/login.html");
});

// 处理登录
app.post("/login", function(request, response) {
	// console.info(request.body);
	// 查询数据库,看看用户名和密码是否匹配
	var sqlString = " select * from user where user_name = '" + request.body.userName + "' and user_password = '" +
		request.body.userPassword + "' limit 1";
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			// 登录成功,要改session
			var sess = request.session;
			sess.userName = request.body.userName;
			response.json({
				"ok": true
			});
		}
	});

});



// 过滤器
app.use(function(req, res, next) {
	if (req.url === '/favicon.ico') {
		return
	}
	// console.info("我是filter");
	var sess = req.session;
	// console.info(sess);
	if (sess.views) {
		sess.views++;
	} else {
		sess.views = 1;
	}

	// 用户姓名
	if (!sess.userName) {
		sess.userName = "lianghongbiao";
	}


	res.setHeader('Content-Type', 'text/html');
	res.write('<p>views:' + sess.views + '<br>' + sess.userName + '</p>');
	res.end();
});

var server = app.listen(7533, function() {

	console.log("服务器启动成功");

})


