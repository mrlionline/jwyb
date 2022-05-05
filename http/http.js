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
		url:'/pages/login'
	})
}

const http = (url, methods, {data, noToken, noToast} = {}) =>{
	return new Promise((resolve, reject) =>{
		const header = noToken ? null : {
			"Authorization" : uni.getStorageSync('token')
		}
		
		uni.request({
		    url: baseUrl + url,
			methods,
		    data,
		    header,
		    success: (res) => {
				console.log('res', res)
		        if(res.statusCode === 200){	// http状态200
						// resolve(res.data)	// 此行待删除
					if(res.data.resultCode === "Success"){	// 接口resultCode为'Success'为成功
						resolve(res.data.dataSet)
					}else if(!noToast){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}else {
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