let baseUrl = ''
if(process.env.NODE_TYPE == 'test'){
	baseUrl = 'http://39.105.146.234:30001'
}else if(process.env.NODE_TYPE == 'production'){
	baseUrl = 'https://jwr.juewei.cn'
}

export default baseUrl