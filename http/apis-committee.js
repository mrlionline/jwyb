import http from './http.js'
const committeeApi = {
	getCommittee(data){
		return http('/starsCapsule-api/starCouncil/queryStarCouncilList', 'GET')
	},
	
	getMemberById(id) {
		return http('/starsCapsule-api/starCouncil/queryStarCouncil/' + id, 'GET')
	},
	
	getGroupList(id, page) {
		return http('/starsCapsule-api/starCouncil/querySubGroupList', 'POST', { data: { starCouncilId: id, ...page }, fullRes: true })
	},
	
	getUserInfoById(id) {
		return http('/jurisdiction-api/user/queryUserAndDeptById', 'GET', { data: { userId: id }})
	},
	
	getUsersByStarId(id) {
		return http('/starsCapsule-api/star/getUserListByStartId/' + id, 'GET')
	},
	

}

export default committeeApi