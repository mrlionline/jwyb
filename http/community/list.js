import http from '../http.js'
const informationApis = {
	listPageOfCommunit(data){	// 社区列表
		return http('/learning-interaction-api/community/selectListPageOfCommunit', 'POST', {data})
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