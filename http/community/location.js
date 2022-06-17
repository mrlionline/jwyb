import http from '../http.js'
const locationApis = {
	listPageOfCommunit(data){	// 社区列表
		return http('/learning-interaction-api/community/selectListPageOfCommunit', 'POST', {data})
	},
	getUserStore() {
		return http('/jurisdiction-api/department/getUserStore/-1', 'get')
	},
	
}
export default locationApis