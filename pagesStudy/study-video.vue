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
				@fullscreenchange="fullChange($event)"
			>
				<view :class="{'mask': true, 'full-mask': isFull}">
					<text v-for="item in 100">{{userInfo.name}}({{userInfo.mobile}})</text>
				</view>
			</video>
<!-- 			<view class="mask">
				<text v-for="item in 100">{{userInfo.name}}({{userInfo.mobile}})</text>
			</view> -->
		</view>
		<div class="content">
			<view class="title">{{info.name}}</view>
			<text class="learned" v-if="info.hits">{{info.hits}}人学过</text>
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
								@loadedmetadata="getItemLength($event, item)"
							></video>
							<image class="img" v-if="item.type === 'pdf'" mode="aspectFit" src="/pagesStudy/static/pdf.png"></image>
							<view class="lock" v-if="!canStudy(index)">
								<image src="/pagesStudy/static/lock.png" mode=""></image>
							</view>
						</view>
						<view class="name">
							<view class="n">{{item.name}}</view>
							<view class="t" v-if="item.timeLength">学习时长：{{item.timeLength}}{{item.type === 'pdf' ? '分钟' : ''}}</view>
						</view>
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
				info: {},
				isFull: false
			}
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id
			this.userInfo = uni.getStorageSync('userInfo');
			// this.videoContext = uni.createVideoContext('myVideo')
			this.addHits(option.id)
			Promise.all([
				this.queryById(),
				this.getDetail(option.id)
			]).then(response =>{
				const res = response[1]
				res.coursewares = res.coursewares.map(item =>{
					return {
						...item,
						timeLength: item.duration,
						type: item.fileName.slice(item.fileName.indexOf('.') + 1) === 'mp4' ? 'video' : 'pdf'
					}
				})
				this.playVideo = res.coursewares[0].type === 'video'
				this.info = res
			})
			uni.$on('study-done',pdfProgress =>{
				console.log('pdf done', pdfProgress)
				if(pdfProgress){
					this.updatePdfProgress(pdfProgress)
				}
			})
		},
		onUnload(){
			uni.$off('study-done')
			this.videoContext = wx.createVideoContext('myVideo')
			this.videoContext.pause()
			clearInterval(this.timer)
		},
		onHide(){
			if(this.videoContext){
				// this.videoContext.pause()
			}
			if(this.timer){
				this.updateVideoProgress()
				this.videoContext = wx.createVideoContext('myVideo')
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
			addHits(id){
				studyApi.addHits(id)
			},
			startPlayVideo(){
				this.startVideoTiming()
			},
			pauseVideo(){
				this.updateVideoProgress()
				clearInterval(this.timer)
			},
			endedVideo(){
				this.updateVideoProgress()
				clearInterval(this.timer)
				this.timer = null
			},
			getLength(e) {
				this.videoTime = e.detail.duration
			},
			getItemLength(e, item){
				item.timeLength = this.getTimeLength(Math.floor(e.detail.duration))
			},
			getTimeLength(second){
				if(second < 60){
					return second + '秒'
				}else if(second >= 60 && second < 3600){
					let min = Math.floor(second/60)
					let s = second - min * 60
					return `${min}分${s === 0 ? '' : s + '秒'}`
				}else if(second >= 3600){
					let hour = Math.floor(second/(60*60))
					let afterHour = second - hour*60*60;
					let min = Math.floor(afterHour/60)
					let s = second - hour * 60 * 60 - min * 60
					return `${hour}小时${(min === 0 && s === 0) ? '' : min + '分'}${s === 0 ? '' : s + '秒'}`
				}
			},
			timeupdate(e){
				if(this.videoTime < 100){
					this.videoPoint.add(Math.floor(e.detail.currentTime))
				}else {
					this.videoPoint.add(Math.floor(e.detail.currentTime / this.videoTime * 100))
				}
			},
			fullChange(e) {
				this.isFull = e.detail.fullScreen
			},
			getDetail(id){
				return studyApi.getDetail(id)
			},
			queryById(){
				return studyApi.queryById(this.id).then(res =>{
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
				// 	complete: 1,	// 1 未完成， 0 已完成
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
				// this.startStudyPdfTime = new Date().getTime()	// 开始学习pdf的时间戳，'study-done'事件中使用计算学习时长
				const pdfProgress = this.progress[this.studyingItem.id] ? Number(this.progress[this.studyingItem.id].progress) : 0
				const query = encodeURIComponent(`${baseUrl}/jw/pdf-viewer/viewer.html?url=${item.fileUrl}&name=${encodeURIComponent(this.userInfo.name)}&phone=${this.userInfo.mobile}&duration=${item.timeLength}&progress=${pdfProgress}`)
				console.log('query', query)
				const url = `/pages/myWebView/my-web-view?type=study&url=${query}`
				uni.navigateTo({
					url: url
				})
			},
			startStudyVideo(item){
				this.activeVideoSrc = item.fileUrl
				this.videoPoint = (this.progress[item.id] && this.progress[item.id].progress) ? new Set(this.progress[item.id].progress) : new Set()
				this.playVideo = true
			},
			startVideoTiming(){
				this.timer = setInterval(() => {
					this.updateVideoProgress()
				}, 5 * 1000);
			},
			addProgress(item){
				const params = {
					complete: 1,	// 1 未完成， 0 已完成
					courseId: this.id,
					coursewareId: item.id,
					progess: item.type === 'video' ? JSON.stringify([]) : 0
				}
				studyApi.addProgress(params).then(() =>{
					this.queryById()
				})
			},
			updatePdfProgress(pdfProgress){
				// const endStudyTime = new Date().getTime()
				// const studySecond = (endStudyTime - this.startStudyPdfTime) / 1000 + ((this.progress[this.studyingItem.id] && Number(this.progress[this.studyingItem.id].progress)) || 0)	// 学习时长，本次时长 + 以往时长
				const complete = pdfProgress >= Number(this.studyingItem.timeLength) * 60 ? 0 : 1
				const params = {
					complete: complete,	// 1 未完成， 0 已完成
					courseId: this.id,
					coursewareId: this.studyingItem.id,
					id: this.progress[this.studyingItem.id] ? this.progress[this.studyingItem.id].id : null,
					progess: pdfProgress
				}
				studyApi.updateProgress(params).then(() =>{
					this.queryById()
				})
				// this.studyingItem = null
				this.startStudyPdfTime = 0
			},
			updateVideoProgress(){
				let complete = null
				if(this.videoTime < 100){
					complete = this.videoPoint.size >= this.videoTime * 0.75 ? 0 : 1
				}else {
					complete = this.videoPoint.size >= 75  ? 0 : 1
				}
				const params = {
					complete: complete,	// 1 未完成， 0 已完成
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
				position: relative;
			}
			.mask{
				position: absolute;
				left: -20rpx;
				top: -100rpx;
				right: -100rpx;
				bottom: 85rpx;
				pointer-events: none;
				word-wrap: break-word;
				overflow: hidden;
				font-size: 0;
				text{
					display: inline-block;
					margin: 20rpx 20rpx;
					color: #fff;
					transform: rotate(-30deg);
					opacity: .3;
					font-size: 24rpx;
				}
			}
			.full-mask {
				top: 100rpx;
				bottom: 95rpx;
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
				display: inline-block;
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
						.n{
							color: #000;
							font-weight: bold;
						}
						.t{
							color: #a5a4b0;
						}
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