import http from './http.js'
const apis = {
	getNews(data){
		return http('api/news', 'GET', {data})
	},
}

export default apis