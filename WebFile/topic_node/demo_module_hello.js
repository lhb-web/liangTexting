exports.world = function() {
	console.log('Hello World');
}
//exports属性,不限制个数;
exports.liang = function() {
	console.log('liang-----------');
}



// 内部的变量不会暴露
var foo = 'xxxxxxxxxx';

function showParameters() {
	var bar = foo + "yyyyyyyyy";
	console.info(bar);
}
exports.showParameters = showParameters;

// 参数的使用

function usingParameter(url) {

	console.info(url.pathname);
}
exports.usingParameter = usingParameter;
