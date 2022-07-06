<template>
	<div class="study-video">
		<view class="active-video-box" v-if="playVideo">
			<video
				id="myVideo"
				class="active-video"
				:src="activeVideoSrc"
				:autoplay="true"
				@play="startPlayVideo()"
				@pause="pauseVideo()"
				@ended="endedVideo()"
				@loadedmetadata="getLength($event)"
				@timeupdate="timeupdate($event)"
			></video>
			<view class="mask">
				<text v-for="item in 100">李明华</text>
			</view>
		</view>
		<div class="content">
			<view class="title">{{info.name}}</view>
			<text class="learned" v-if="info.learnedPerson">{{info.learnedPerson}}</text>
			<view class="catalogue-box">
				<view class="title">
					<text style="font-weight: 600;font-size: 15px;color: #444251;">课程目录</text>
					<text style="margin-left: 8rpx;color: #959BA4;font-weight: 400;">共{{info.coursewares ? info.coursewares.length : 0}}个课件</text>
				</view>
				<scroll-view
					:scroll-y="true"
					:style="{height: playVideo ? 'calc(100vh - 688rpx)' : 'calc(100vh - 266rpx)'}"
				>
					<view class="catalogue-item" v-for="(item, index) in info.coursewares" @click="study(item, index)">
						<view class="head">
							<video
								v-if="item.type === 'video'"
								:src="item.fileUrl"
								:show-fullscreen-btn="false"
								:show-play-btn="false"
								:show-center-play-btn="false"
								:controls="false"
							></video>
							<image class="img" v-if="item.type === 'pdf'" mode="aspectFit" src="/pagesStudy/static/pdf.png"></image>
							<view class="lock" v-if="!canStudy(index)">
								<image src="/pagesStudy/static/lock.png" mode=""></image>
							</view>
						</view>
						<text class="name">{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
		</div>
		<u-toast ref="uToast"></u-toast>
	</div>
</template>

<script>
	import studyApi from "@/http/apis-study.js"
	import baseUrl from '@/config/baseUrl.js'
	export default{
		data(){
			return {
				id: '',
				playVideo: false,	// 是否播放视频
				activeVideoSrc: '',	// 当前播放的视频地址
				progress: {},
				userInfo: '',
				timer: null,
				videoContext: null,
				videoTime: 0,
				startStudyPdfTime: 0,
				videoPoint: new Set(),
				studyingItem: null,
				info: {}
			}
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id
			this.userInfo = uni.getStorageSync('userInfo');
			// this.videoContext = uni.createVideoContext('myVideo')
			this.getDetail(option.id)
			this.queryById()
			uni.$on('study-done',() =>{
				this.updatePdfProgress()
			})
		},
		onHide(){
			if(this.videoContext){
				// this.videoContext.pause()
			}
			if(this.timer){
				this.videoContext = wx.createVideoContext('myVideo')
				console.log('this.videoContext', this.videoContext)
				this.videoContext.pause()
				clearInterval(this.timer)
			}
		},
		// watch: {
		// 	playVideo: function(newVal, oldVal){
		// 		if (newVal) {	//	显示视频组件
		// 			this.videoContext = uni.createVideoContext('myVideo')
		// 		}
		// 	}
		// },
		methods: {
			startPlayVideo(){
				console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
				this.startVideoTiming()
			},
			pauseVideo(){
				clearInterval(this.timer)
			},
			endedVideo(){
				clearInterval(this.timer)
				this.timer = null
			},
			getLength(e) {
				this.videoTime = parseInt(e.detail.duration) / 60
				console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', this.videoTime)
			},
			timeupdate(e){
				this.videoPoint.add(Math.floor(e.detail.currentTime / 60))
			},
			getDetail(id){
				studyApi.getDetail(id).then(res =>{
					res.coursewares = res.coursewares.map(item =>{
						return {
							...item,
							type: item.fileName.slice(item.fileName.indexOf('.') + 1) === 'mp4' ? 'video' : 'pdf'
						}
					})
					this.playVideo = res.coursewares[0].type === 'video'
					this.info = res
				})
			},
			queryById(){
				studyApi.queryById(this.id).then(res =>{
					this.progress = {}
					if (res && res.length) {
						res.forEach(item =>{
							try{
								item.progress = JSON.parse(item.progess)
							}catch(e){
								//TODO handle the exception
								item.progress = Number(item.progess)
							}
							
							this.progress[item.coursewareId] = item
						})
					}
				})
			},
			canStudy(index) {
				const preIndex = Math.max(0, index - 1)
				const preId = this.info.coursewares[preIndex].id
				return index === 0 ? true : (this.progress[preId] && this.progress[preId].complete === 0)	// 是否可以学习当前课
			},
			async study(item, index){
				// const params = {
				// 	complete: 0,	// 0 未完成， 1 已完成
				// 	courseId: this.id,
				// 	coursewareId: item.id,
				// 	id: this.progress[item.id] ? this.progress[item.id].id : null,
				// 	progess: JSON.stringify([])
				// }
				// studyApi.updateProgress(params)
				// return 
				const canStudy = this.canStudy(index)
				if (!canStudy) {
					this.$refs.uToast.show({
						type: 'default',
						message: "请依次学习"
					})
					return
				}
				if(item.type !== 'video'){
					this.videoContext = wx.createVideoContext('myVideo')
					console.log('this.videoContext', this.videoContext)
					this.videoContext.pause()
					// return
				}
				if(!this.progress[item.id]){	// 没学习过此课程
					this.studyingItem = item
					this.addProgress(item)
					if(item.type === 'video'){
						this.startStudyVideo(item)
						// this.videoContext.play()
					}else {	// PDF
						this.startStudyPdf(item)
					}
				}else {	// 学习过
					this.studyingItem = item
					if(item.type === 'video'){
						this.startStudyVideo(item)
					}else {	// PDF
						this.startStudyPdf(item)
					}
				}
			},
			startStudyPdf(item){
				this.startStudyPdfTime = new Date().getTime()	// 开始学习pdf的时间戳，'study-done'事件中使用计算学习时长
				const query = encodeURIComponent(`${baseUrl}/jw/pdf-viewer/viewer.html?url=${item.fileUrl}&name=${encodeURIComponent(this.userInfo.name)}&phone=${this.userInfo.mobile}`)
				const url = `/pages/myWebView/my-web-view?type=study&url=${query}`
				uni.navigateTo({
					url: url
				})
			},
			startStudyVideo(item){
				debugger
				this.activeVideoSrc = item.fileUrl
				this.videoPoint = (this.progress[item.id] && this.progress[item.id].progress) ? new Set(this.progress[item.id].progress) : new Set()
				this.playVideo = true
			},
			startVideoTiming(){
				this.timer = setInterval(() => {
					this.updateVideoProgress()
				}, 30000);
			},
			addProgress(item){
				const params = {
					complete: 0,	// 0 未完成， 1 已完成
					courseId: this.id,
					coursewareId: item.id,
					progess: item.type === 'video' ? JSON.stringify([]) : 0
				}
				studyApi.addProgress(params).then(() =>{
					this.queryById()
				})
			},
			updatePdfProgress(){
				const endStudyTime = new Date().getTime()
				const studySecond = (endStudyTime - this.startStudyPdfTime) / 1000 + ((this.progress[this.studyingItem.id] && Number(this.progress[this.studyingItem.id].progress)) || 0)	// 学习时长，本次时长 + 以往时长
				const complete = studySecond >= 120 ? 1 : 0	// 超过2分钟为学习完成
				const params = {
					complete: complete,	// 0 未完成， 1 已完成
					courseId: this.id,
					coursewareId: this.studyingItem.id,
					id: this.progress[this.studyingItem.id] ? this.progress[this.studyingItem.id].id : null,
					progess: Math.round(studySecond)
				}
				studyApi.updateProgress(params).then(() =>{
					this.queryById()
				})
				// this.studyingItem = null
				this.startStudyPdfTime = 0
			},
			updateVideoProgress(){
				const complete = this.videoPoint.size / this.videoTime > 0.75 ? 1 : 0
				const params = {
					complete: complete,	// 0 未完成， 1 已完成
					courseId: this.id,
					coursewareId: this.studyingItem.id,
					id: this.progress[this.studyingItem.id] ? this.progress[this.studyingItem.id].id : null,
					progess: JSON.stringify([...this.videoPoint])
				}
				studyApi.updateProgress(params).then(() =>{
					this.queryById()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.study-video{
		width: 100%;
		height: 100vh;
		background-color: #fff;
		.active-video-box{
			position: relative;
			width: 100%;
			height: 422rpx;
			.active-video{
				width: 100%;
				height: 422rpx;
			}
			.mask{
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				pointer-events: none;
				word-wrap: break-word;
				overflow: hidden;
				text{
					display: inline-block;
					margin: 10rpx 20rpx;
					color: #fff;
					transform: rotate(-30deg);
					opacity: .3;
				}
			}
		}
		.content{
			padding: 32rpx;
			.title{
				font-weight: 600;
				font-size: 34rpx;
				line-height: 48rpx;
				color: #444251;
			}
			.learned{
				padding: 0 8rpx;
				background-color: #FBF1E8;
				height: 32rpx;
				line-height: 32rpx;
				font-weight: 400;
				font-size: 20rpx;
				color: #F2731E;
				border-radius: 4px;
			}
			.catalogue-box{
				margin-top: 64rpx;
				.title{
					line-height: 42rpx;
					margin-bottom: 32rpx;
				}
				.catalogue-item{
					display: flex;
					align-items: center;
					height: 172rpx;
					padding: 16rpx 0;
					border-bottom: 1px solid #eee;
					.head{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 248rpx;
						height: 140rpx;
						position: relative;
						.img {
							width: 76rpx;
							height: 84rpx;
						}
						video{
							width: 100%;
							height: 100%;
						}
					}
					.name{
						flex:2;
						padding: 0 32rpx;
						font-weight: 500;
						font-size: 26rpx;
						color: #444251;
					}
				}
			}
		}
	}
	.lock{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, .6);
		image{
			width: 40rpx;
			height: 40rpx;
		}
	}
</style>