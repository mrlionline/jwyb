import http from '../http.js'
const releaseApis = {
	// 新增动态  
	apiAddCommunit(data){
		return http('/learning-interaction-api/community/addCommunit', 'POST', {data, fullRes: true, timeout: 180000})
	}
}
export default releaseApis