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
	},
	
	getGalxyByUserId(id = 0) {
		return http('/starsCapsule-api/galaxy/getGalxyByUserId/' + id)
	},
	queryUsedLayout() {
		return http('/jurisdiction-api/layoutManagement/queryUsedLayout', 'GET', { data: {} })
	},
	find(data){
		return http('/learning-interaction-api/information/find', 'GET', {data})
	}
	
}
export default indexApis