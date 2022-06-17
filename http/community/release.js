import http from '../http.js'
const releaseApis = {
	// 新增动态  
	apiAddCommunit(data){
		return http('/learning-interaction-api/community/addCommunit', 'POST', {data},180000)
	}
}
export default releaseApis