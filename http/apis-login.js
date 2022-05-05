import http from './http.js'
const loginApis = {
	sendSmsCode(data){
		return http('auth/sendSmsCode', 'POST', {data})
	},
	loginForPhone(data){	// 手机验证码登录
		return http('auth/loginForPhone', 'POST', {data})
	},
	login(data){	// 账号密码登录
		return http('auth/login', 'POST', {data})
	}
}

export default loginApis