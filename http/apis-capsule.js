import http from './http.js'
const capsuleApi = {
	queryList(id){
		return http('/starsCapsule-api/galaxy/queryList/' + id, 'GET')
	},
	
	getMemberById(id) {
		return http('/starsCapsule-api/starCouncil/queryStarCouncil/' + id, 'GET')
	},
	
	getGroupList(id, page) {
		return http('/starsCapsule-api/starCouncil/querySubGroupList', 'POST', { data: { starCouncilId: id, ...page }, fullRes: true })
	},
	
	getUserInfoById(id) {
		return http('/jurisdiction-api/user/queryUserAndDeptById', 'GET', { data: { userId: id }})
		
	}
	
}

export default capsuleApi