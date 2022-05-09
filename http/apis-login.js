import http from './http.js'
const loginApis = {
	sendSmsCode(data){
		return http('/jurisdiction-api/auth/sendSmsCode', 'POST', {noToken: true, data})
	},
	loginForPhone(data){	// 手机验证码登录
		return http('/jurisdiction-api/auth/loginForPhone', 'POST', {noToken: true,data})
	},
	login(data){	// 账号密码登录
		return http('/jurisdiction-api/auth/login', 'POST', {noToken: true,data})
	},
	formula(){	// 获取图形验证码
		return http('/jurisdiction-api/auth/formula?d=' + Math.random(), 'GET', {noToken: true})
	},
	resetPwd(data) {
		return http('/jurisdiction-api/auth/changePwd', 'POST', {data})
	}
}

export default loginApis