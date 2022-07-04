import http from './http.js'
const studyApi = {
	// 课程列表
	queryList(data){
		return http('/learning-interaction-api/course/queryList', 'POST', {data, fullRes: true})
	},
	groupList(){
		return http('/learning-interaction-api/knowledge/queryList', 'GET')
	},
	getDetail(id){
		return http('/learning-interaction-api/course/queryById/' + id, 'GET')
	},
	queryById(id){
		const data = {
			"courseId": id,
			"pageNum": 1,
			"pageSize": 99,
		}
		return http('/learning-interaction-api/courseProgress/queryMyList', 'POST', {data})
	},
	addProgress(data){
		return http('/learning-interaction-api/courseProgress/add', 'POST', {data})
	},
	updateProgress(data){
		return http('/learning-interaction-api/courseProgress/edit', 'POST', {data})
	}
}

export default studyApi