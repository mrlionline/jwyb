import http from '../http.js'
const informationApis = {
	// 社区动态的列表
	listPageOfCommunit(data){
		return http('/learning-interaction-api/community/selectListPageOfCommunit', 'POST', {data})
	},
	// 获取我的动态---有分页  
	apiCommunitByUserId(data){
		return http('/learning-interaction-api/community/queryCommunitByUserId', 'POST', {data})
	},
	// 添加心动(点赞、收藏、阅读)
	apiAddCommunitHB(data){
		return http('/learning-interaction-api/communityHeartBeat/addCommunitHB', 'POST', {data})
	},
	//  取消心动(点赞、收藏、阅读)
	apiDelCommunitHB(data){
		return http('/learning-interaction-api/communityHeartBeat/delCommunitHB', 'POST', {data})
	}


}
export default informationApis