import http from './http.js'
const myApi = {
	// 签到
	loginIn(){
		return http('/learning-interaction-api/integralRecord/loginIn', 'GET')
	},
	// 签到记录
	loginRecord(){
		return http('/learning-interaction-api/integralRecord/loginRecord', 'POST')
	},
	// 积分列表
	queryList(){
		return http('/learning-interaction-api/integralRecord/queryList', 'POST')
	},
	// 我的-资讯数
	statisticsMyInformationCount(data){
		return http('/learning-interaction-api/information/statisticsMyInformationCount', 'GET')
	}
}

export default myApi