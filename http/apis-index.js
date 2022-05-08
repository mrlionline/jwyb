import http from './http.js'
const indexApis = {
	logout(){
		return http('/jurisdiction-api/auth/userLogout', 'get')
	},
	getUserInfoById(id) {
		return http('/starsCapsule-api/starCouncil/queryUserInfo/' + id, 'get')
	}
}
export default indexApis