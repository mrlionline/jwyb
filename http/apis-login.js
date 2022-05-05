import http from './http.js'
const loginApis = {
	sendSmsCode(data){
		return http('auth/sendSmsCode', 'POST', {noToken: true, data})
	},
	loginForPhone(data){	// 手机验证码登录
		return http('auth/loginForPhone', 'POST', {noToken: true,data})
	},
	login(data){	// 账号密码登录
		return http('auth/login', 'POST', {noToken: true,data})
	},
	formula(){	// 获取图形验证码
		return http('auth/formula', 'GET', {noToken: true,})
	}
}

export default loginApis