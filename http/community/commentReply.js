import http from '../http.js'
const commentsApis = {
	listPageOfCommunit(data){	// 社区列表
		return http('/learning-interaction-api/community/selectListPageOfCommunit', 'POST', {data})
	},
	// 通过id获取动态信息
	getUsersByStarId(id) {
		return http('/learning-interaction-api/community/getCommunitData/' + id, 'GET')
	},
	//  互动社区获取动态评论列表--有分页--获取动态评论
	queryInteractionList(data){	// 社区列表
		return http('/learning-interaction-api/communityReply/queryInteractionList', 'POST', {data})
	},
	// 删除动态  
	apiDelCommunit(id) {
		return http('/learning-interaction-api/community/delCommunit/' + id, 'GET')
	},
	
}
export default commentsApis