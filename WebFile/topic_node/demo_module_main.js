var url = require('url');

var hello = require('./demo_module_hello');
hello.world();

hello.liang();

hello.showParameters();

// var res = "我是res";
// var rep = "我是rep";
// hello.usingParameter(res,rep);


//写死,但是实际上,urlString应该来自request.url
var urlString = "http://www.lianghongbiao.com/web/index.html?liang=jiechuqingnian";

var urlObj = url.parse(urlString);

hello.usingParameter(urlObj);