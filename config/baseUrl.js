let baseUrl = ''
if(process.env.NODE_TYPE == 'test'){
	baseUrl = 'http://172.21.20.208:30001'
}else if(process.env.NODE_TYPE == 'production'){
	baseUrl = 'https://jwr.juewei.cn'
}

export default baseUrl