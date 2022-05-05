let baseUrl = ''
if(process.env.NODE_TYPE == 'test'){
	baseUrl = 'http://172.21.20.208:30004'
}else if(process.env.NODE_TYPE == 'production'){
	baseUrl = 'production/'
}

export default baseUrl