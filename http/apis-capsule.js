import http from './http.js'
const capsuleApi = {
	queryList(id){
		return http('/starsCapsule-api/galaxy/queryList/' + id, 'GET')
	},
	queryStarListByGalaxyId(id){
		return http('/starsCapsule-api/star/queryStarListByGalaxyId/' + id, 'GET')
	},
	queryUserInfo(userId){
		return http('/starsCapsule-api/starCouncil/queryUserInfo/' + userId, 'GET')
	},
	add(data){
		return http('/starsCapsule-api/bulletChat/add', 'POST', {data})
	},
	queryUserListByDeptIdAndStarLevel(data){
		return http('/jurisdiction-api/user/queryUserListByDeptIdAndStarLevel', 'POST', {data})
	},
	getUserListByStartIdAndGalaxyId(data) {
		return http('/starsCapsule-api/star/getUserListByStartIdAndGalaxyId', 'GET', {data})
	}
}

export default capsuleApi