import http from './http.js'
const indexApis = {
	logout(){
		return http('/jurisdiction-api/auth/logout', 'POST')
	}
}

export default indexApis