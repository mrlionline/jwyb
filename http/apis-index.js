import http from './http.js'
const indexApis = {
	logout(){
		return http('auth/logout', 'POST')
	}
}

export default indexApis