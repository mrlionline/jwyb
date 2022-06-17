import http from '../http.js'
const infoDetailApis = {
	formula(){	// 获取图形验证码
		return http('/jurisdiction-api/auth/formula?d=' + Math.random(), 'GET', {noToken: true})
	},
	// 根据id获取资讯  
	apiInfoFindId(id) {
		return http('/learning-interaction-api/information/find?id=' + id, 'GET')
	},
	// 根据id获取资讯  
	apiAddInfoReply(data) {
		return http('/learning-interaction-api/informationReply/save', 'POST', {data})
	},
	// 取消点赞、取消收藏 
	apiInfoHeartBeatDel(data) {
		return http('/learning-interaction-api/informationHeartBeat/delete', 'GET', {data})
	},
	//  新增资讯心动(阅读、点赞、收藏)数据
	apiInfoHeartBeatSave(data) {
		return http('/learning-interaction-api/informationHeartBeat/save', 'POST', {data})
	},

	
}
export default infoDetailApis