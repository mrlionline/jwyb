import http from '../http.js'
const infoListApis = {
	// 小程序获取资讯列表
	apiAppletList(data){
		return http('/learning-interaction-api/information/appletList', 'POST', {data})
	},
	// 获取我的咨询列表 
	apiInfoTypeList(data){
		return http('/learning-interaction-api/informationType/myList', 'POST', {data})
	},
	
}
export default infoListApis