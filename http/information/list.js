import http from '../http.js'
const infoListApis = {
	// 小程序获取资讯列表
	apiAppletList(data){
		return http('/learning-interaction-api/information/appletList', 'POST', {data})
	},
	// 获取我的咨询列表 
	apiInfoTypeList(data){
		return http('/learning-interaction-api/informationType/list', 'POST', {data})
	},
	// 小程序-我的-资讯统计进入资讯列表 
	apiMyHeartList(data){
		return http('/learning-interaction-api/information/appletMyHeartList', 'POST', {data})
	},
	// 根据id获取资讯
	apiCode2Session(code) {
		return http('/learning-interaction-api/wx/getCode2Session?jsCode=' + code, 'GET')
	},
	
}
export default infoListApis