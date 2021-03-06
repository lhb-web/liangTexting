var express = require('express');
var app = express();
var fs = require("fs");
var mysql = require('mysql');
var multer = require('multer');
var url = require('url');
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

app.use('/web', express.static('web'));
app.use(multer({
	dest: '/tmp/'
}).any());

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/web/梁鸿标-9-18-作业.html");
})

app.post('/file_upload', function(req, respon) {
	if( req.files && req.files.length > 0 ){
		var des_file = __dirname + "/web/temp/" + req.files[0].originalname;
		fs.readFile(req.files[0].path, function(err, data) {
			fs.writeFile(des_file, data, function(err) {
				if (err) {
					console.log(err);
				} else {
					res = {
						message: 'File uploaded successfully',
						filename: req.files[0].originalname
					};
				}
				respon.end(JSON.stringify(res));
			});
		});
	}
	console.info(req.body);
	connection.query(" select * from users where name='"+req.body.user_name+"'",function(error, results, fields){
		if (error) {
			throw error;
		} else {
			if(results.length>0){
				respon.json({
					"load": false
				})
				return;
			}else{
				connection.query("insert into users(name , age, phone, address,specialty,userdesc, note, fileAdd ) values('"+ req.body
					.user_name +"', '"+ req.body.user_age +"' , '"+ req.body.user_phone +"', '"+req.body.user_address +"','" +
					req.body.technology +"','"+ req.body.desc +"','"+ req.body.note +"','"+ req.body.file01 +"')",
					function(error, results, fields) {
						if (error) {
							throw error;
						} else {
							respon.json({
								"load": true
							})
						}
					});
			}
		}
	})
	

});
app.post('/atUser', function(req, respon) {
	if( req.files && req.files.length > 0 ){
		var des_file = __dirname + "/web/temp/" + req.files[0].originalname;
		fs.readFile(req.files[0].path, function(err, data) {
			fs.writeFile(des_file, data, function(err) {
				if (err) {
					console.log(err);
				} else {
					res = {
						message: 'File uploaded successfully',
						filename: req.files[0].originalname
					};
				}
				respon.end(JSON.stringify(res));
			});
		});
	}
	
	connection.query(" select * from users where name='"+req.body.user_name+"'",function(error, results, fields){
		if (error) {
			throw error;
		} else {
			if(results.length<=0){
				respon.json({
					"load": false
				});
			}else{
				connection.query("update users set age='"+ req.body.user_age+"',phone='"+req.body.user_phone+"',address='"+req.body.user_address+"',specialty='"+req.body.technology+"',userdesc='"+req.body.desc+"',note='"+req.body.note+"',fileAdd='"+req.body.file01+"',faceImage=NULL where name='"+req.body.user_name+"';",function(error, results, fields) {
						if (error) {
							throw error;
						} else {
							respon.json({
								"load": true
							})
						}
					});
			}
		}
	})
	

});

app.get('/file_query',function(req,res){
	connection.query(" select * from users where name='"+req.query.checkName+"'",function(error, results, fields){
		if (error) {
			throw error;
		} else {
			if(results.length<=0){
				res.json({
					"qeyresults":false
				})
			}else{
				res.json({
					"qeyresults":results
				})
			}
		}
	})
});

app.get('/select_name',function(req,res){
	var queryObj = url.parse(req.url, true).query;
	if( !queryObj  || !queryObj.serchName){
		
		res.json({
			status: "no",
			data: {
				info: "无输入"
			}
		});
	}
	connection.query(" select name from users where name like '%"+ queryObj.serchName  +"%'", function( error, results,fields) {
		if(error){
			throw error;
		}else{
			res.json({
				status: "ok",
				data: {
					likePersons: results
				}
			});
		}
	
	});
});

app.get('/accUser',function(req,res){
	connection.query("select * from users",function( error, results,fields){
		if(error){
			throw error;
		}else{
			// console.info(results);
			res.json({
				"results":results
			});
		}
	})
});


var server = app.listen(8081, function() {

	console.log("服务器启动成功")

})
