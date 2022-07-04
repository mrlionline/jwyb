<template>
	<div class="study-video">
		<view class="active-video-box" v-if="playVideo">
			<video id="myVideo" class="active-video" :src="activeVideoSrc" @play="startPlayVideo()" bindloadedmetadata="getLength"></video>
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
					<text style="margin-left: 8rpx;color: #959BA4;font-weight: 400;">共{{info.coursewares.length}}个课件</text>
				</view>
				<scroll-view
					:scroll-y="true"
					:style="{height: playVideo ? 'calc(100vh - 688rpx)' : 'calc(100vh - 266rpx)'}"
				>
					<view class="catalogue-item" v-for="(item, index) in info.coursewares" @click="study(item, index)">
						<image v-if="item.type === 'video'"  mode="aspectFit" src="/static/bg.png"></image>
						<image v-if="item.type === 'pdf'" mode="aspectFit" src="/pagesStudy/static/pdf.png"></image>
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
				startStudyVideoTime: 0,
				studyingItem: null,
				info: {}
			}
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id
			this.userInfo = uni.getStorageSync('userInfo');
			this.getDetail(option.id)
			this.queryById()
			uni.$on('study-done',() =>{
				this.updatePdfProgress()
			})
		},
		onHide(){
			if(this.videoContext){
				this.videoContext.pause()
			}
			if(this.timer){
				clearInterval(this.timer)
			}
		},
		startPlayVideo(){
			this.startVideoTiming()
		},
		watch: {
			playVideo: function(newVal, oldVal){
				if (newVal) {	//	显示视频组件
					this.videoContext = uni.createVideoContext('myVideo')
				}
			}
		},
		methods: {
			getLength(e) {
				this.videoTime = parseInt(e.detail.duration)
				
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
							this.progress[item.id] = item
						})
					}
				})
			},
			async study(item, index){
				if(!this.progress[item.id]){	// 没学习过此课程
					const preId = index !== 0 && this.info.coursewares[index - 1].id	// 上一节课id
					let canStudy = index === 0 ? true : (this.progress[preId] && this.progress[preId].complete === 0)	// 是否可以学习当前课
					if (canStudy) {
						this.studyingItem = item
						this.addProgress(item.id)
						if(item.type === 'video'){
							this.playVideo = true
							this.videoContext.play()
							this.activeVideoSrc = item.fileUrl
						}else {	// PDF
							this.startStudyPdfTime = new Date().getTime()	// 开始学习pdf的时间戳，'study-done'事件中使用计算学习时长
							const url = `/pages/myWebView/my-web-view?type=study&url=${baseUrl}/jw/pdf-viewer/viewer.html?url=${item.fileUrl}&name=${this.userInfo.name}&phone=${this.userInfo.mobile}`
							uni.navigateTo({
								url: url
							})
						}
					}else {
						this.$refs.uToast.show({
							type: 'default',
							message: "请依次学习"
						})
					}
				}
			},
			startVideoTiming(){
				this.timer = setInterval(() => {
					this.startStudyVideoTime += 10
					this.updateVideoProgress()
				}, 10000);
			},
			addProgress(id){
				const params = {
					complete: 1,	// 0 未完成， 1 已完成
					courseId: this.id,
					coursewareId: id,
					progess: 0
				}
				studyApi.addProgress(params)
			},
			updatePdfProgress(){
				const endStudyTime = new Date().getTime()
				const studySecond = (endStudyTime - this.startStudyPdfTime) / 1000 + (this.progress[this.studyingItem.id].progess || 0)	// 学习时长，本次时长 + 以往时长
				const complete = studySecond >= 120 ? 1 : 0	// 超过2分钟为学习完成
				const params = {
					complete: complete,	// 0 未完成， 1 已完成
					courseId: this.id,
					coursewareId: this.studyingItem.id,
					progess: studySecond
				}
				studyApi.updateProgress(params).then(() =>{

				})
				this.studyingItem = null
				this.startStudyPdfTime = 0
				this.queryById()
			},
			updateVideoProgress(){
				
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
					image{
						width: 248rpx;
						height: 140rpx;
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
</style>