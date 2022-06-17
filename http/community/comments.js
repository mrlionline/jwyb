import http from '../http.js'
const commentsApis = {
	// 社区列表
	listPageOfCommunit(data){
		return http('/learning-interaction-api/community/selectListPageOfCommunit', 'POST', {data})
	},
	// 通过id获取动态信息
	getUsersByStarId(id) {
		return http('/learning-interaction-api/community/getCommunitData/' + id, 'GET')
	},
	//  互动社区获取动态评论列表--有分页--获取动态评论
	queryInteractionList(data){
		return http('/learning-interaction-api/communityReply/queryInteractionList', 'POST', {data})
	},
	// 删除动态  
	apiDelCommunit(id) {
		return http('/learning-interaction-api/community/delCommunit/' + id, 'GET')
	},
	// 新增评论
	apiAddCommuityReply(data){
		return http('/learning-interaction-api/communityReply/addCommuityReply', 'POST', {data})
	},
	//  获取动态评论回复
	apiReplyListByReplyId(data){
		return http('/learning-interaction-api/communityReply/queryReplyListByReplyId', 'POST', {data})
	},
}
export default commentsApis