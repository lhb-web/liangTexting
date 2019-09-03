// 校验登录状态的模块
function checkLogin(req) {
	var sess = req.session;
	if (!sess.userName) {
		return false;
	} else {
		return true;
	}
}

exports.checkLogin = checkLogin;