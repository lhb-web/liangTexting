var express = require('express');
var app = express();
var fs = require("fs");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});

const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	port: 3306, // 如果修改了数据库的默认端口，这个属性不可忽略
	user: "root", // 数据库用户名
	password: "", // 数据库用户密码
	database: "liang" // 数据库名
});

connection.connect();

app.use('/web', express.static('web'));// 将/web文件夹下的文件当作静态资源,不需要额外的get去获取
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(multer({
	dest: '/tmp/'
}).array('image'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/web/index.html");
})

app.post('/file_upload', function(req, res) {

	console.log(req.files[0]); // 上传的文件信息
	
	
	var des_file = __dirname + "/" + req.files[0].originalname;
	fs.readFile(req.files[0].path, function(err, data) {
		fs.writeFile(des_file, data, function(err) {
			if (err) {
				console.log(err);
			} else {
				response = {
					message: 'File uploaded successfully',
					filename: req.files[0].originalname
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
})

app.get("/getUserInfo",function(req, res){
	console.info(req.query);
	connection.query('select * from Person where id="'+req.query.userId+'" limit 1',function(err,result,file){
		if(err){
			console.info(err);
			console.info("查无此人")
		}else{
			console.info(result);
			if(result.length>0){
				res.send(result[0].name);
			}else{
				res.send("查无此人");
			}
		}
	});
});

app.post("/updateUser",urlencodedParser,function(req,res){
	console.info(req.body);
	connection.query('update Person set name="' +req.body.userName + '" where id=' +req.body.userId, function(error, results,fields) {
		if (error) {
			throw error;
		}
	});
	response.writeHead(200, {
		'Content-Type': 'text/plain;charset=utf-8'
	});
	response.end('修改成功!');
});

var server = app.listen(8081, function() {

	console.log("服务器2启动成功")

})
