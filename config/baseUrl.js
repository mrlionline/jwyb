let baseUrl = ''

if(process.env.NODE_TYPE == 'test'){
	baseUrl = 'https://unidemo.dcloud.net.cn/'
}else if(process.env.NODE_TYPE == 'production'){
	baseUrl = 'production/'
}

export default baseUrl