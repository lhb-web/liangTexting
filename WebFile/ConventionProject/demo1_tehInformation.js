var express = require('express');
// var mysql = require('mysql');
var convention = require("./connect_database_module");
// var multer = require('multer');
var app = express();
app.use('/web', express.static('web'));

convention.connectionData();

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/web/index.html");
})

app.get("/information", function(request, response) {
	convention.exhibition(request,response);

});
app.get("/apply", function(request, response) {
	convention.searchApplication(request,response);
})


//同意申请,发射信息到展厅信息
app.get("/queryApply",function(request,response){
	convention.InformationStorage(request,response);
});

//拒绝申请
app.get("/refuseApply",function(request,response){
	
});

var server = app.listen(8081, function() {
	console.log("服务器启动成功")
})


