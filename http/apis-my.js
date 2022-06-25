import http from './http.js'
const myApi = {
	// 签到
	loginIn(){
		return http('/learning-interaction-api/integralRecord/loginIn', 'GET')
	},
	// 签到记录
	loginRecord(){
		return http('/learning-interaction-api/integralRecord/loginRecord', 'POST', {data: {}})
	},
	// 我的积分和排名
	myIntegralTop(){
		return http('/learning-interaction-api/integralRecord/myIntegralTop', 'GET')
	},
	// 积分排行榜
	integralTop(data){
		return http('/learning-interaction-api/integralRecord/integralTop', 'POST', {fullRes: true, data})
	},
	// 积分明细
	queryList(data){
		return http('/learning-interaction-api/integralRecord/queryList', 'POST', {data: data})
	},
	// 我的-积分明细-分类
	getIntegralType(){
		return http('/learning-interaction-api/integralRecord/getIntegralType', 'GET')
	},
	// 我的-积分明细-时间
	getIntegralTimeType(){
		return http('/learning-interaction-api/integralRecord/getIntegralTimeType', 'GET')
	},
	// 我的-资讯数
	statisticsMyInformationCount(data){
		return http('/learning-interaction-api/information/statisticsMyInformationCount', 'GET')
	}
}

export default myApi