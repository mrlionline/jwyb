<template>
	<view class="label-container">
		<PageNavbar title="发动态"></PageNavbar>
		<view class="community-main" :style="{'margin-top': navBarHeight + 'px'}">
			<view class="release-main">
				<u-textarea class="textarea-style" v-model="formData.content" :disabled="releaseStatus" placeholder="记录此刻的想法…" border="none" @blur="commentPostBlur" :maxlength="200" cursorSpacing="30" autoHeight></u-textarea>
			</view>
			<view class="picture-list" v-if="!isVideo">
				<u-upload
					ref="mediaUpload"
					:fileList="fileListImg"
					@afterRead="afterRead"
					@delete="deletePic"
					name="Img"
					multiple
					:maxCount="9"
					width="110"
					height="110"
					accept="media"
					:disabled="releaseStatus"
				>
				<view class="add-picture" v-if="!isVideo && fileListImg.length < 9 && fileListImg.length > 0">
					<u-icon name="plus" size="40" color="#333333"></u-icon>
				</view>
				</u-upload>
			</view>
			<view class="picture-list picture-list-video" v-else>
				<video :src="fileListVideo[0]"></video>
				<view class="del-video">
					<u-button type="primary" @click="delVideoHandle">删除视频</u-button>
				</view>
				
			</view>
			<!-- <view class="del-upload">
				<u-button type="primary" color="#3c9cff" icon="trash-fill" text="删除正在上传的文件" @click="deleteUploadPic"></u-button>
			</view> -->
			<view class="location-address" v-if="formData.locationName || formData.storeName">
				<view class="location-address-label">
					<image class="address-img" src="/pagesCommunity/static/community/location-address-img.png" mode="aspectFit"></image>
					<view class="address-text">{{ formData.locationName || formData.storeName }}</view>
				</view>
			</view>
			<view class="operate-label">
				<u-upload
					@afterRead="afterRead"
					@delete="deletePic"
					name="Img"
					multiple
					:maxCount="maxUploadCount"
					accept="media"
					v-if="!isVideo && fileListImg.length < 9"
					:disabled="releaseStatus"
				>
				<view class="add-picture">
					<image :showLoading="true" class="operate-img" src="/pagesCommunity/static/community/community-picture.png" mode="aspectFit"></image>
				</view>
				</u-upload>
				<view class="operate-location-label">
					<image :showLoading="true" class="operate-img operate-location" src="/pagesCommunity/static/community/community-location.png" @click="locationClick"></image>
				</view>
				<u-button class="operate-button" type="primary" @click="getPublished()" :disabled="releaseStatus">发表</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import PageNavbar from '../components/pageNavbar.vue'
	import baseUrl from '@/config/baseUrl.js'
	import releaseApis from '@/http/community/release.js'
	import utils from '@/asset/js/utils.js'
	export default {
		components: {
			PageNavbar
		},
		data() {
			return {
				formData: {
					content: "", // 动态内容
					fileList: [], //图片视频
					locationLgt: null, //经度
					locationLat: null, //纬度
					locationName: null, //位置名称
					locationStatus: 1, //是否显示位置 0 显示 1 不显示
					status: 1, //动态状态 0:未提交（草稿状态） 1:提交
					storeId: null, //门店id
					storeName: null, //门店名称
					storeStatus: 1 //是否关联门店 0 关联 1 不关联
				},
				fileListImg: [],
				fileListVideo: [],
				isVideo: false,
				actionUpload: baseUrl+'/starsCapsule-api/file/segmentUpload', // 上传文件地址
				uploadFileApiArr: [],
				background: {
					backgroundColor: '#001f3f',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				maxUploadCount: 9,
				locationType: false,
				//发表状态
				releaseStatus: false,
				/* 导航栏高度设置 */
				navBarHeight: getApp().globalData.statusBarHeight + 44
			}
		},
		onLoad(option) {
			//  type&store&longitude&latitude&address
			/*
			locationLat //纬度
			locationLgt //经度
			locationName //位置名称
			locationStatus //是否显示位置 0 显示 1 不显示
			status //动态状态 0:未提交（草稿状态） 1:提交
			storeId //门店id
			storeName //门店名称
			storeStatus //是否关联门店 0 关联 1 不关联
			*/
		   const thisObj = this
			if (option.type === "0") {
				thisObj.locationType = true
				//不显示
				thisObj.formData.locationStatus = 1
				thisObj.formData.storeStatus = 1
				thisObj.formData.locationLgt = null
				thisObj.formData.locationLat = null
				thisObj.formData.locationName = null
				thisObj.formData.storeName = null
			} else if(option.type === "1") {
				thisObj.locationType = true
				console.info("option-->",option)
				//实时位置
				thisObj.formData.locationStatus = 0
				thisObj.formData.storeStatus = 1
				thisObj.formData.locationLgt = option.longitude
				thisObj.formData.locationLat = option.latitude
				thisObj.formData.locationName = option.address
				thisObj.formData.storeName = null
			} else if(option.type === "2"){
				thisObj.locationType = true
				//关联门店
				thisObj.formData.locationStatus = 1
				thisObj.formData.storeStatus = 0
				thisObj.formData.storeName = option.store
				thisObj.formData.locationLgt = null
				thisObj.formData.locationLat = null
				thisObj.formData.locationName = null
			}
		},
		onShow() {
			const thisObj = this
			// 获取缓存数据
			const rFormData = uni.getStorageSync('Release_formData') || null
			if (rFormData && Object.keys(rFormData).length > 0) {
				let {
					content = '',
					fileList = []
				} = rFormData
				if(thisObj.locationType){
					thisObj.formData.content = content
					thisObj.formData.fileList = fileList
				} else {
					rFormData.fileList = fileList
					thisObj.formData = rFormData
				}
				console.log(rFormData)
				
			}
			const rFileListImg = uni.getStorageSync('Release_fileListImg') || null
			if (rFileListImg && rFileListImg.length>0) {
				console.log(rFileListImg)
				let thisImgLen = 0
				rFileListImg.forEach(function(ele,index){
					if(ele.status === 'uploading'){
						ele.status = 'load'
						ele.message = ''
					}
					if(ele.status === 'success'){
						thisImgLen++
					}
				})
				let fileListData = thisObj.formData.fileList
				if(fileListData.length > thisImgLen){
					fileListData = fileListData.slice(0,thisImgLen)
				}
				thisObj.fileListImg = rFileListImg
				thisObj.maxUploadCount = 9 - (rFileListImg.length)
			}
			const rFileListVideo = uni.getStorageSync('Release_fileListVideo') || null
			if (rFileListVideo && rFileListVideo.length>0) {
				console.log(rFileListVideo)
				thisObj.fileListVideo = rFileListVideo
			}
			const rIsVideo = uni.getStorageSync('Release_isVideo') || null
			if (rIsVideo) {
				console.log(rIsVideo)
				thisObj.isVideo = rIsVideo
			}
		},
		// 只有onReady生命周期才能调用refs操作组件
		onReady() {
		},
		onHide(){
			uni.setStorageSync("Release_formData",this.formData)
			let fileListImg = this.fileListImg || []
			let fileListVideo = this.fileListVideo
			let isVideo = this.isVideo
			//缓存
			console.info("隐藏页面-->",fileListImg)
			uni.setStorageSync("Release_fileListImg",fileListImg)
			uni.setStorageSync("Release_fileListVideo",fileListVideo)
			uni.setStorageSync("Release_isVideo",isVideo)
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.maxUploadCount++
				let thisList = this.formData.fileList
				if(thisList.length > event.index){
					this.formData.fileList.splice(event.index, 1)
				}
				
				this.setStorageData()
			},
			// 新增图片
			afterRead(event) {
				let thisObj = this
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				console.info("event-->",event)
				let lists = [].concat(event.file)
				lists.map((item) => {
					if(item.type === 'image'){
						this.fileListImg.push({
							...item,
							status: 'load',
							message: ''
						})
					} else if(item.type === 'video'){
						thisObj.isVideo = true
						let thisVideo = []
						thisVideo.push({
							...item,
							status: 'load',
							message: ''
						})
						this.fileListImg = thisVideo
						console.info("视频--0-->",thisVideo)
						this.maxUploadCount = 0
					}
				})
				let fileListLen = this.fileListImg.length
				let thisCount = 9 - fileListLen
				if(thisCount > -1){
					this.maxUploadCount = thisCount
					console.info("thisCount-->",thisCount)
				} else {
					this.maxUploadCount = 0
				}
				
				if(fileListLen > 9){
					uni.showToast({
						title: "最多上传9张图片！",
						icon: 'none'
					})
					this.fileListImg = this.fileListImg.slice(0,9)
				}
				thisObj.setStorageData()
				//
				
			},
			//上传图片
			async uploadImages(){
				let thisObj = this
				let lists = (thisObj.fileListImg)
				console.info("list--up0-->",lists)
				let fileListLen = lists.length
				// lists.map((item) => {
				// 	thisObj[`fileList${event.name}`].push({
				// 		...item,
				// 		status: 'uploading',
				// 		message: '上传中'
				// 	})
				// })
				for (let i = 0; i < fileListLen; i++) {
					if(lists[i] && Object.keys(lists[i]).length > 0){
						if(lists[i].status === "load"){
							lists[i].status = 'uploading'
							lists[i].message = '上传中'
							console.info("视频--1-->",lists[i])
							const result = await thisObj.uploadFilePromise(lists[i].url)
							// let lists[i] = thisObj.fileListImg[i]
							lists.splice(i, 1, Object.assign(lists[i], {
								status: 'success',
								message: '',
								url: result
							}))
						}
					} else {
						return
					}
				}
				thisObj.setStorageData()
				
			},
			uploadFilePromise(url) {
				const thisObj = this
				return new Promise((resolve, reject) => {
					const thisToken = uni.getStorageSync('token') || ""
					let header = null
					if(thisToken){
						header = {
							"Authorization" : thisToken
						}
					}
					let uploadFileApi = uni.uploadFile({
						url: thisObj.actionUpload,
						filePath: url,
						header,
						name: 'file',
						formData: {
							"Authorization": thisToken
						},
						success: (res) => {
							setTimeout(() => {
								console.info("res-->",res)
								if(res.statusCode === 200){
									let {code,dataSet} = JSON.parse(res.data || '')
									if(code === 100200){
										if(dataSet.fileType === 'jpg' || dataSet.fileType === 'png' || dataSet.fileType === 'jpeg' || dataSet.fileType === 'bmp' ){
											// thisObj.formData.fileList.push(dataSet.fileUrl)
											let thisFileList = thisObj.formData.fileList || []
											thisFileList.push(dataSet.id)
											resolve(dataSet.fileUrl)
										} else if(dataSet.fileType === 'mp4' || dataSet.fileType === 'avi' || dataSet.fileType === 'mkv'){
											let thisList = []
											thisList.push(dataSet.id)
											thisObj.fileListVideo.push(dataSet.fileUrl)
											thisObj.formData.fileList = thisList
											console.info("视频--2-->",dataSet)
											thisObj.fileListImg = []
											thisObj.setStorageData()
											thisObj.queryAddCommunit(thisObj.formData)
											// resolve(dataSet.fileUrl)
											// 非图片，返回终止
											reject()
										}
										
									} else {
										thisObj.fileListImg.splice(thisObj.fileListImg.length-1, 1)
										uni.showToast({
											title: "上传失败！",
											icon: 'none'
										})
										thisObj.setStorageData()
										reject()
									}
								} else {
									thisObj.fileListImg.splice(thisObj.fileListImg.length-1, 1)
									uni.showToast({
										title: "上传失败！",
										icon: 'none'
									})
									thisObj.setStorageData()
									reject()
								}
									
								
							}, 1000)
						},
						fail: (res) => {
							thisObj.fileListImg.splice(thisObj.fileListImg.length-1, 1)
							uni.showToast({
								title: "上传失败！",
								icon: 'none'
							})
							thisObj.setStorageData()
							reject()
						}
					});
					// thisObj.uploadFileApiArr.push(uploadFileApi)
				})
			},
			//定位置的图标按钮
			locationClick(){
				if(!this.releaseStatus){
					this.goLocationPage()
				}
				
			},
			// 发表动态按钮
			async getPublished(){
				const thisObj = this
				let formData = thisObj.formData
				if(formData.content){
					if(thisObj.isVideo){
						if(formData.fileList.length > 1){
							uni.showToast({
								title: "只能上传一个视频！",
								icon: 'none'
							})
						} else {
							thisObj.releaseStatus = true
							await thisObj.uploadImages()
							thisObj.queryAddCommunit(thisObj.formData)
						}
					} else {
						if(formData.fileList.length > 9){
							uni.showToast({
								title: "最多上传九张图片！",
								icon: 'none'
							})
						} else {
							thisObj.releaseStatus = true
							await thisObj.uploadImages()
							thisObj.queryAddCommunit(thisObj.formData)
						}
					}
					
				} else {
					uni.showToast({
						title: "请输入动态！",
						icon: 'none'
					})
				}
				
				console.info("formData-->",formData)
			},
			/* 请求新建动态的接口 */
			queryAddCommunit(data){
				const thisObj = this
				let thisData = uni.$u.deepClone(data || thisObj.formData)
				thisData.content = utils.utf16toEntities(thisData.content)
				uni.showLoading({
					title: '加载中',
					mask: true,
				})
				releaseApis.apiAddCommunit(thisData).then(res => {
					console.info("请求新建动态的接口-->",res)
					let {code, dataSet, msg} = res
					if(code == "100200"){
						uni.showToast({
							title: "发布动态成功！",
							icon: 'none'
						})
						/* 清除缓存 */
						thisObj.formData = {}
						thisObj.fileListImg = []
						thisObj.fileListVideo = []
						thisObj.isVideo = false
						thisObj.setStorageData()
						uni.hideLoading()
						thisObj.releaseStatus = false
						// 跳转
						thisObj.goCommunityList()
						// uni.clearStorageSync('Release_formData')
						// uni.clearStorageSync('Release_fileListImg')
						// uni.clearStorageSync('Release_fileListVideo')
					} else {
						uni.hideLoading()
						thisObj.releaseStatus = false
						uni.showToast({
							title: msg || "发布动态失败！",
							icon: 'none'
						})
					}
					
				})
				.catch(function(res){
					let { msg} = res
					uni.hideLoading()
					thisObj.releaseStatus = false
					uni.showToast({
						title: msg || "发布动态失败！",
						icon: 'none'
					})
				})
			},
			/* 选择位置 */
			goLocationPage(){
				uni.redirectTo({
					url: "/pagesCommunity/community/location/location"
				})
			},
			// 跳转动态列表页面
			goCommunityList(){
				uni.redirectTo({
					url: `/pagesCommunity/community/list/list`
				})
			},
			//删除视频
			delVideoHandle(){
				const thisObj = this
				if(thisObj.releaseStatus){
					return
				}
				uni.showModal({
					title: '确认删除',
					content: '确认删除该视频？',
					success: (res) => {
						if (res.confirm) {
							//用户点击确定
							thisObj.fileListVideo = []
							thisObj.formData.fileList = []
							thisObj.fileListImg = []
							thisObj.isVideo = false
							thisObj.setStorageData()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
						
					},
					fail: () => {
						console.info("弹窗报错了")
					}
				})
			},
			// 删除上传中的图片
			deleteUploadPic(index) {
				this[`fileListImg`].splice(index, 1)
				// this.formData.fileList.splice(index, 1)
				this.uploadFileApiArr && this.uploadFileApiArr.forEach(function(ele,idx){
					if(idx === index){
						ele.abort()
					}
				})
				
				this.setStorageData()
			},
			setStorageData(){
				//缓存
				console.info("缓存事件-->",this.formData)
				uni.setStorageSync("Release_formData",this.formData)
				uni.setStorageSync("Release_fileListImg",this.fileListImg)
				uni.setStorageSync("Release_fileListVideo",this.fileListVideo)
				uni.setStorageSync("Release_isVideo",this.isVideo)
			},
			commentPostBlur(event){
				const thisObj = this
				let {value, cursor} = event.detail
				console.info("event.detail-->",event.detail)
				let fixComments = thisObj.formData
				if(value){
					fixComments.content = value
				}
				uni.setStorageSync("Release_formData",thisObj.formData)
			},
			//emoji表情
		},
		computed: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100vh;
	}
	.label-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);
		.community-main {
			width: 100%;
			height: auto;
			margin: 128rpx 0 0 0;
			padding:0;
			// background-color: #F5F6F7;
		}
		.release-main,
		.picture-list {
			width: 686rpx;
			height: auto;
			overflow: hidden;
			margin: 0 auto 16rpx auto;
			padding: 0;
			.add-picture {
				width: 110px;
				height: 110px;
				background: #F5F6F7;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.del-upload-text {
				color: #3c9cff;
			}
		}
		.picture-list-video {
			// width: 100%;
			video {
				width: 100%;
				border-radius: 8rpx;
			}
		}
		.del-upload {
			width: 686rpx;
			height: auto;
			overflow: hidden;
			marign: 0 auto;
			
		}
		.release-main {
			min-height: 310rpx;
		}
		.location-address {
			width: 686rpx;
			height: auto;
			overflow: hidden;
			margin: 0 auto;
			padding: 0;
			.location-address-label {
				width: fit-content;
				height: 56rpx;
				margin: 0;
				padding: 0;
				background: #FFFFFF;
				border: 2rpx solid #EEEEEE;
				border-radius: 26rpx;
				display: flex;
				align-items: center;
				.address-img {
					width: 36rpx;
					height: 36rpx;
					margin: 0 0 0 8rpx;
					// border-radius: 50%;
					// background-color: #567DF4;
				}
				.address-text {
					width: auto;
					height: 36rpx;
					padding: 0 16rpx;
					font-weight: 400;
					font-size: 26rpx;
					line-height: 36rpx;
					color: #959BA4;
					
				}
			}
		}
	}
	.del-upload /deep/ .u-button {
		width: 350rpx;
	}
	.picture-list /deep/ .uicon-plus {
		color: #B2B6BB!important;
	}
	.textarea-style {
		font-weight: 400;
		font-size: 30rpx;
		color: #222222;
	}
	/* /deep/  ::v-deep    */
	::v-deep .u-upload__deletable {
		background-color: rgba(0, 0, 0, 0.4) !important;
		height: 48rpx !important;
		width: 48rpx !important;
		border-bottom-left-radius: 0 !important;
	}
	/deep/ .u-upload__deletable__icon {
		position: relative !important;
		
		
	}
	/deep/ .u-upload__deletable__icon .u-icon .u-icon__icon {
		font-size: 24rpx !important;
		line-height: 24rpx !important;
	}
	
	.operate-label {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin: 0;
		padding: 24rpx 32rpx 0 32rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: rgba(255, 255, 255, 100);
		display: flex;
		// justify-content: center;
		align-items: center;
		border-top: 2rpx solid #F5F6F7;;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);
		.operate-img {
			width: 48rpx;
			height: 48rpx;
		}
		.add-picture {
			width: 48rpx;
			height: 48rpx;
		}
		.operate-location-label {
			width: 48rpx;
			height: 48rpx;
			margin: 0 0 0 48rpx;
		}
		.operate-location {
			width: 48rpx;
			height: 48rpx;
		}
	}
	.release-main /deep/ .u-textarea {
		padding: 18rpx 0!important;
	}
	.release-main /deep/ .u-textarea__field {
		min-height: 280rpx!important;
		color: #444251!important;
		line-height: 42rpx;
	}
	.operate-label /deep/ .u-button {
		width: 140rpx;
		height: 64rpx;
		margin: 0 0 24rpx 400rpx;
		background-color: #3c9cff;
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		line-height: 64rpx;
		text-align: center;
		align-self: center;
	}
	.del-video {
		width: 200rpx;
		height: auto;
		overflow: hidden;
	}
</style>
