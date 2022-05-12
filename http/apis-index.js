import http from './http.js'
const indexApis = {
	logout(){
		return http('/jurisdiction-api/auth/userLogout', 'get')
	},
	getUserInfoById(id) {
		return http('/starsCapsule-api/starCouncil/queryUserInfo/' + id, 'get')
	},
	getMyStar(id) {
		return http('/starsCapsule-api/star/getUserStarByUserId', 'GET', { data: { userId: id }})
	}
	
}
export default indexApis