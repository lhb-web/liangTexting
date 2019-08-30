var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello World');
});


app.delete('/', function() {})
// app.put('/', function() {})
// app.post('/', function(request, respon) {
// 
// });


var server = app.listen(8081, function() {
	var host = server.address().address;
	var pot = server.address().port;
	console.info(server);

	console.log("应用实例,访问地址为htpp://" + host + ":%s", port);
})
