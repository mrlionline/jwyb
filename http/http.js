import baseUrl from '../config/baseUrl.js'

// 放抖动
let flag = true
function debounce (msg, dalay, callback) {
  if (flag) {
	flag = false
	// message.error(msg)
	if (callback) {
		callback()
	}
	setTimeout(() => {
	  flag = true
	}, dalay)
  }
}
function errorHandle (status, noToast) {
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      if (noToast) {
        logout()
      } else {
        debounce('登录失效', 1000, logout)
      }
      break
    case 500:
      // message.error('服务器错误')
      if (!noToast) {
        debounce('服务器错误', 1000)
      }
      break
  }
}
function logout(){
	uni.clearStorageSync();
	uni.reLaunch({
		url:'/pages/login/login'
	})
}

const http = (url, method, {data, noToken, noToast, fullRes} = {}, timeout) =>{
	if(method.toLowerCase() === 'get'){
		if(data instanceof Object){
			data._time = Math.random()
		}else {
			data = {_time: Math.random()}
		}
	}
	return new Promise((resolve, reject) =>{
		const header = noToken ? null : {
			"Authorization" : uni.getStorageSync('token')
		}
		uni.request({
		    url: baseUrl + url,
			method,
		    data,
		    header,
			timeout: timeout || 60000,
		    success: (res) => {
				console.log('res', res)
		        if(res.statusCode === 200){	// http状态200
						// resolve(res.data)	// 此行待删除
					if(res.data.resultCode === "Success"){	// 接口resultCode为'Success'为成功
						resolve(fullRes ? res.data : res.data.dataSet)
					}else if(!noToast){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						reject(res.data)
					}else {
						reject(res.data)
					}
				}else {
					reject(res)
					errorHandle(res.statusCode, noToast)
				}
		    },
			fail: (err) =>{
				console.log('err', err)
			}
		});
	})
}

export default http
