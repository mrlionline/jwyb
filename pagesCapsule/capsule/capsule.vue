<template>
	<view>
		<u-navbar leftIconSize="20px" title="星空胶囊" leftIconColor="#fff" :bgColor="'transparent'"
			:titleStyle="{color: '#fff'}" @leftClick="back()"></u-navbar>
		<view class="capsule-wrap">
			<view class="bg">
				<!-- <image :src="baseUrl + 'capsule-bg1.png'"></image> -->
				<image src="/pagesCapsule/static/capsule/bg.gif"></image>
			</view>
			<view class="gif-wrap" :class="{'hide': !showStep1Gif}">
				<image class="up-down index1" mode="widthFix" src="/pagesCapsule/static/capsule/index1.png"></image>
				<image class="up-down index2" mode="widthFix" src="/pagesCapsule/static/capsule/index2.png"></image>
				<image class="down-up index3" mode="widthFix" src="/pagesCapsule/static/capsule/index3.png"></image>
				<image class="down-up index4" mode="widthFix" src="/pagesCapsule/static/capsule/index4.png"></image>
			</view>
			<swiper
				style="height: 100%;"
				:indicator-dots="false"
				:autoplay="false"
				:vertical="true"
				:current="current"
				@animationfinish="animationfinish($event)"
				@change="currentChange($event)">
				<swiper-item>
					<view class="capsule-step step0 flex por" v-if="current === 0 || current === 1">
						<!-- <view class="bg1">
							<image mode="aspectFill" src="/pagesCapsule/static/capsule/bg.gif"></image>
						</view> -->
						<view class="text-wrap" v-show="current === 0">
							<view style="text-align: center;">
								<view class="name">
									<view>{{userInfo.name}}</view>
								</view>
							</view>
							<view class="welcome">
								<image style="width: 700rpx; height: 229rpx;"
									src="/pagesCapsule/static/capsule/welcome1.gif"></image>
							</view>
							<view class="letsgo">请随我一起回顾您的星路之旅吧</view>
						</view>
						<next class="next"></next>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step1 por" v-if="current === 0 || current === 1 || current === 2">
						<view class="choose-tips" :style="{'padding-top': navBarHeight}">请点击您的所属星系</view>
						<view class="btn-wrap" v-show="current === 1">
							<view class="btn por"
								v-for="(galaxy, i) of galaxyInfo.list" @click="chooseGalaxy(galaxy.id)">
								<image style="animation-delay:1s;" class="text ld ld-rush-ltr-in"
									:src="'/pagesCapsule/static/capsule/'+galaxy.imgIndex+'.png'"></image>
								<view class="galaxy-name">
									<view style="animation-delay:1s;" class="text ld ld-rush-rtl-in">{{galaxy.name}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step2 por" v-if="current === 1 || current === 2 || current === 3">
						<scroll-view :scroll-y="true" style="height: 100vh;">
							<view class="choose-tips" :style="{'padding-top': navBarHeight}">请点击您的所属片区</view>
							<view class="content">
								<view
									v-for="(nebula, index) of nebulaInfo.list"
									class="section"
									:class="['nebula' + (index+1)]"
									@click="chooseNebula(nebula.id)">
									<image mode="widthFix" class="default"
										:src="'/pagesCapsule/static/capsule/nebula'+nebula.imgIndex+'.png'"></image>
									<image mode="widthFix" class="twinkle"
										:src="'/pagesCapsule/static/capsule/nebula'+nebula.imgIndex+'.png'"></image>
									<view class="text linear-text">
										<text v-for="(text, index) of nebula.name" :class="{'colorful': nebula.id === myGalxy.l2Id}"
											:style="'--i:' + index">{{text}}</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step3 por" v-if="current === 2 || current === 3 || current === 4">
						<scroll-view :scroll-y="true" style="height: 100vh;">
							<view class="choose-tips" :style="{'padding-top': navBarHeight}">请点击您的所属星球</view>
							<view class="content por" :style="{'min-height': `calc(100vh - 22px - ${navBarHeightNum}px)`}">
								<!-- <view class="section section0">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/1.png"></image>
								</view> -->
								<view
									v-for="(star,index) of starInfo.list"
									class="section"
									:class="['section' + (index + 1), 'start-move'+star.moveClassIndex]"
									@click="chooseStar(star.id)">
									<image mode="widthFix"
										:src="'/pagesCapsule/static/capsule/' + star.imgIndex + '.png'"></image>
									<view class="text linear-text">
										<text v-for="(text, index) of star.name" :class="{colorful: star.id === myGalxy.l3Id}"
											:style="'--i:' + index">{{text}}</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step4" v-if="current === 3 || current === 4 || current === 5">
							<view class="content por">
								<image style="width: 100%; height: 100vh;" mode="aspectFill" :src="'/pagesCapsule/static/capsule/starbg.png'"></image>
								<scroll-view :scroll-y="true"  class="img-box" style="height: 100vh;">
									<view style="padding-bottom: 28rpx;">
										<view class="choose-tips" :style="{'padding-top': navBarHeight}">请点击您所获星级可查看同星级家人</view>
										<view
											class="icon por"
											v-for="(level, index) of starLevelInfo.list"
											:style="{'margin-left': level.positionLeft + 'rpx'}"
											:class="['start-move'+level.moveClassIndex,{'star-twinkle': selfStarId == level.id}]"
											@click="chooseStarLevel(level.id)"
										>
											<image class="bg"  :src="level.grade > 5 ? '/pagesCapsule/static/capsule/star-level-leader.png' : '/pagesCapsule/static/capsule/star-level-member.png'"></image>
											<image class="head" :src="level.icon"></image>
											
											<view style="text-align: center;">
						
											<text v-for="(text, index) of level.name" :class="{colorful: level.id === selfStarId}"
												:style="'--i:' + index">{{text}}</text>
											</view>
										</view>
									</view>
								</scroll-view>
							</view>
						
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step7" v-if="current === 4 || current === 5 || current === 6">
						<scroll-view :scroll-y="true" style="height: 100%;" @scrolltolower="getSameLevelFamily()">
							<view style="padding-bottom: 228rpx;">
								<view class="level">
									<image class="level-icon" :src="activeStarLevel.icon"></image>
									<text>{{activeStarLevel.name}}</text>
								</view>
								<view class="same-level-box">
									<view class="same-level-item por" v-for="(item,index) in sameLevelFamilyList">
										<text>{{item.userName}}</text>
										<text>{{item.deptName}}</text>
									</view>
								</view>
							</view>
							<u-loadmore :line="true" :status="sameLevelFamilyStatus" />
						</scroll-view>
						<view class="btn-box">
							<app-button text="查看我的星路历程" @click="current++"></app-button>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step5" v-if="current === 5 || current === 6 || current === 7">
						<scroll-view :scroll-y="true" style="height: 100vh; padding-top: 220rpx; color: #fff;">
							<view style="text-align: center; font-size: 24px;">
								<view style="margin-bottom: 16rpx;">亲爱的{{userInfo.name}}！</view>
								<view>您已和绝味一起走过<text style="color: #FFD940">{{step5Day}}</text>天</view>
							</view>
							<view style="padding: 96rpx 48rpx 428rpx;" class="time-line" :class="{'time-line-show': current === 6}">
								<time-line theme="dark" :list="step5TimeLineList"></time-line>
							</view>
							<view style="position: fixed; bottom: 120rpx; text-align: center; width: 100%;">
								<app-button text="星语心愿" @click="current++"></app-button>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step6 por" v-if="current === 6 || current === 7">
						<view class="textarea-wrap" :class="{'hide': step6SubmitWish}">
							<view class="title">星语心愿</view>
							<view class="textarea-bg">
								<textarea v-model="step6Text" maxlength="200"
									placeholder-style="font-size:15px;line-height: 180rpx;"
									placeholder="快与大家分享自己的星语心愿吧,字数200以内" />
							</view>
						</view>
						<view class="aircraft" :class="{'fly': step6SubmitWish}">
							<image src="/pagesCapsule/static/capsule/submit-success.png"></image>
							<!-- <view class="text">您的星语心愿发布成功</view> -->
						</view>
						<view class="aircraft-success" v-if="step6SubmitSuccess">
							<view class="aircraft-icon">
								<image mode="widthFix" :src="'/pagesCapsule/static/capsule/submit-success.gif?t='+Math.random()"></image>
							</view>
							<view class="text">您的星语心愿发布成功</view>
						</view>
						<view class="aircraft-success" v-if="step6SubmitFail">
							<image src="/pagesCapsule/static/capsule/submit-fail.png"></image>
							<view class="text">您的星语心愿发布失败</view>
						</view>
						<view class="btn-wrap">
							<template v-if="!step6SubmitWish">
								<app-button width="304rpx" text="取消" type="default" @click="clear()"></app-button>
								<app-button width="304rpx" text="发布" @click="submitWish()"></app-button>
							</template>
							<template v-if="step6SubmitWish">
								<app-button width="304rpx" text="重新许愿" type="default" @click="resetWish"></app-button>
								<app-button width="304rpx" text="再次回顾" @click="reShow()"></app-button>
							</template>
						</view>
					</view>
				</swiper-item>
				
			</swiper>
			<view class="music" :class="{'music-on': musicOn}" @click="musicClick()">
				<image src="/pagesCapsule/static/capsule/music.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import capsuleApi from '../../http/apis-capsule.js'
	import next from './capsuleNext.vue'
	import baseUrl from '../../config/baseUrl.js'
	import IndexApi from '../../http/apis-index.js'
	const nebulaImgList = [

	]
	export default {
		components: {
			next
		},
		data() {
			return {
				navBarHeight: `calc(${getApp().globalData.statusBarHeight}px + 48px)`,
				navBarHeightNum: getApp().globalData.statusBarHeight + 48,
				current: 0,
				musicOn: true,
				music: null,
				userInfo: null,
				selfStarId: '',
				baseUrl: baseUrl + '/jw/assets/images/',
				galaxyInfo: {
					list: [],
					selectedId: 0
				},
				nebulaInfo: {
					list: [],
					selectedId: null
				},
				starInfo: {
					list: [],
					selectedId: null
				},
				starLevelInfo: {
					list: [],
					selectedId: null
				},
				myGalxy: {},
				step5Day: 0,
				step5Timer: '',
				step5TimeLineList: [],
				step6Text: '',
				step6SubmitWish: false,
				step6SubmitSuccess: false,
				step6SubmitFail: false,
				sameLevelFamilyList: [],
				sameLevelFamilyPageNum: 0,
				sameLevelFamilyStatus: 'loading'
			}
		},
		methods: {
			reShow(){
				this.galaxyInfo.selectedId = 0
				this.nebulaInfo = {
					list: [],
					selectedId: null
				}
				this.starInfo = {
					list: [],
					selectedId: null
				}
				this.starLevelInfo = {
					list: [],
					selectedId: null
				}
				this.current = 0
			},
			resetWish(){
				this.step6SubmitWish = false
				this.step6SubmitSuccess = false
				this.step6SubmitFail = false
				this.step6Text = ''
			},
			clear() {
				this.step6Text = ''
			},
			submitWish(){
				if(this.step6Text.trim() === ''){
					uni.showToast({
						title:'请填写分享内容',
						icon:'none'
					})
					return
				}
				this.step6SubmitWish = true
				const params = {
					context: this.step6Text
				}
				capsuleApi.add(params).then(res =>{
					setTimeout(() =>{
						this.step6SubmitSuccess = true
					}, 1000)
				}).catch(() =>{
					setTimeout(() =>{
						this.step6SubmitFail = false
					}, 1000)
				})
			},
			musicClick() {
				if (this.musicOn) {
					this.musicOn = false
					this.music.pause()
				} else {
					this.musicOn = true
					this.music.play()
				}
			},
			playMusic() {
				this.music = uni.createInnerAudioContext();
				this.music.autoplay = true;
				this.music.src =
					'https://jwr.juewei.cn/jw/assets/music/64381227793220144.mp3';
				this.music.onPlay(() => {
					console.log('开始播放');
				});
			},
			back() {
				uni.navigateBack()
			},
			currentChange(e) {

			},
			animationfinish(e) {
				this.current = e.detail.current
				if (this.current >= 2 && this.galaxyInfo.selectedId === 0) {
					setTimeout(() => {
						this.current = 1
					}, 0)
				}
				if (this.current >= 3 && !this.nebulaInfo.selectedId) {
					setTimeout(() => {
						this.current = 2
					}, 0)
				}
				// if (this.current >= 4 && !this.starLevelInfo.selectedId) {
				// 	setTimeout(() => {
				// 		this.current = 3
				// 	}, 0)
				// }

				if (this.current === 6) {
					this.initStep5()
				} else {
					this.step5Day = 0
					clearInterval(this.step5Timer)
				}
			},
			initStep5() {
				capsuleApi.queryUserInfo(-1).then(res => {
					// res = {
					// 	starUserHis: [{
					// 		"activityName": "123",
					// 		"ctime": "2022-05-08T14:41:00.035Z",
					// 		"latestLogo": 0,
					// 		"starName": "456"
					// 	}],
					// 	baseInfo: {
					// 		hiredDate: '2022-04-08T14:41:00.035Z',
					// 		workCardTime: '2022-04-09T14:41:00.035Z',
					// 		tttTime: '2022-05-09T14:41:00.035Z',
					// 	}
					// }
					
					let hiredDate = new Date()
					const { baseInfo, starUserHis} = res
					let timeList = []
					if (baseInfo.hiredDate) {
						let hDate = baseInfo.hiredDate
						if (typeof hDate === 'string') {
							hDate = hDate.replace(/\-/g, '/')
						}
						hiredDate = new Date(hDate)
						const date = hiredDate
						timeList.push({
							time: date.getTime(),
							date: `${date.getMonth()+1}/${date.getDate()}`,
							year: date.getFullYear(),
							title: '入职绝味',
							desc: '加入绝味大家庭',
						})
					}
					if (baseInfo.workCardTime) {
						const date = new Date(baseInfo.workCardTime)
						timeList.push({
							time: date.getTime(),
							date: `${date.getMonth()+1}/${date.getDate()}`,
							year: date.getFullYear(),
							title: '获得上岗证',
							desc: '获得上岗证',
						})
					}
					if (baseInfo.tttTime) {
						const date = new Date(baseInfo.tttTime)
						timeList.push({
							time: date.getTime(),
							date: `${date.getMonth()+1}/${date.getDate()}`,
							year: date.getFullYear(),
							title: '获得内训师证',
							desc: '获得内训师证',
						})
					}
					timeList = timeList.concat(starUserHis.map(item => {
						let cTime = item.ctime
						if (typeof cTime === 'string') {
							cTime = cTime.replace(/\-/g, '/')
						}
						const date = new Date(cTime)
						const scoreInfo = [];
						if (typeof item.guixin === 'string') {
							scoreInfo.push({
								name: '归心', value: item.guixin
							})
						}
						if (typeof item.funeng === 'string') {
							scoreInfo.push({
								name: '赋能', value: item.funeng
							})
						}
						if (typeof item.tisu === 'string') {
							scoreInfo.push({
								name: '提速', value: item.tisu
							})
						}
						if (typeof item.pingjia === 'string') {
							scoreInfo.push({
								name: '绩效评价', value: item.pingjia
							})
						}
						return {
							time: date.getTime(),
							date: `${date.getMonth()+1}/${date.getDate()}`,
							year: date.getFullYear(),
							title: item.activityName,
							desc: '升级成' + item.starName,
							image: item.starIcon,
							scoreInfo
						}
					}))
					this.step5TimeLineList = timeList.sort((a, b) => a.time - b.time )
					const day = baseInfo.hiredDateCount
					const time = 1000
					const delay = Math.max(time / day, 1) 
					if (this.step5Day >= day) return
					this.step5Timer = setInterval(() => {
						this.step5Day += Math.ceil(day / 1000)
						this.step5Day = Math.min(day, this.step5Day)
						if (this.step5Day === day) {
							clearInterval(this.step5Timer)
						}
					}, delay)
				})
			
			},
			chooseGalaxy(id) {
				this.nebulaInfo = {
					list: [],
					selectedId: null
				}
				this.starInfo = {
					list: [],
					selectedId: null
				}
				this.starLevelInfo = {
					list: [],
					selectedId: null
				}
				this.getNebulaList(id)
				this.queryStarListByGalaxyId(id)
				// this.galaxyInfo.selectedId = id
				setTimeout(() => {
					this.galaxyInfo.selectedId = id
					this.current++
				}, 20)
			},
			chooseNebula(id) {
				this.starInfo = {
					list: [],
					selectedId: null
				}
				this.getStarList(id)
				setTimeout(() => {
					this.nebulaInfo.selectedId = id
					this.current++
				}, 20)
			},
			chooseStar(id) {
				setTimeout(() => {
					this.starInfo.selectedId = id
					this.current++
				}, 20)
			},
			chooseStarLevel(id) {
				this.starLevelInfo.selectedId = id
				this.getSameLevelFamily(true)
				setTimeout(() => {
					this.current++
				}, 20)
			},
			getSameLevelFamily(reset = false){
				if (reset) {
					this.sameLevelFamilyStatus = 'loading'
					this.sameLevelFamilyList = []
				}
				if(this.sameLevelFamilyStatus === 'nomore'){
					return
				}
				const params = {
					galaxyId: this.starInfo.selectedId,
					starId: this.starLevelInfo.selectedId
				}
				this.sameLevelFamilyPageNum++
				capsuleApi.getUserListByStartIdAndGalaxyId(params).then(res =>{
					this.sameLevelFamilyList = this.sameLevelFamilyList.concat(res || [])
				
				}).finally(() => {
					this.sameLevelFamilyStatus = 'nomore'
				})
			},
			getUserInfo() {
				this.userInfo = uni.getStorageSync('userInfo');
			},
			queryStarListByGalaxyId(id) {
				function random(min, max) {
				  return Math.floor(Math.random() * (max - min)) + min;
				}
				capsuleApi.queryStarListByGalaxyId(id).then(res => {
					// const imgNum = 10
					// res = [
					// 	{ name: '五星店长', grade: 10 , icon: '/pagesCapsule/static/capsule/ab.png' },
					// 	{ name: '四星店长', grade: 9 , icon: '/pagesCapsule/static/capsule/ab.png' },
					// 	{ name: '三星店长', grade: 8 , icon: '/pagesCapsule/static/capsule/ab.png' },
					// 	{ name: '二星店长', grade: 7 , icon: '/pagesCapsule/static/capsule/ab.png' },
					// 	{ name: '一星店长', grade: 6 , icon: '/pagesCapsule/static/capsule/ab.png' },
					// 	{ name: '五星店员', grade: 5 , icon: '/pagesCapsule/static/capsule/aa.png' },
					// 	{ name: '四星店员', grade: 4 , icon: '/pagesCapsule/static/capsule/aa.png' },
					// 	{ name: '三星店员', grade: 3 , icon: '/pagesCapsule/static/capsule/aa.png' },
					// 	{ name: '二星店员', grade: 2 , icon: '/pagesCapsule/static/capsule/aa.png' },
					// 	{ name: '一星店员', grade: 1 , icon: '/pagesCapsule/static/capsule/aa.png' }
					// ]
					this.starLevelInfo.list = res.map((item, index) => {
						return {
							...item,
							moveClassIndex: index % 3 + 1,
							positionLeft:  random(0, 402)
						}
					}).sort((a, b) => b.grade - a.grade)
				})
			},
			getStarList(id) {
				capsuleApi.queryList(id).then(res => {
					const imgNum = 8
					this.starInfo.list = res.map((item, index) => {
						return {
							...item,
							moveClassIndex: index % 3 + 1,
							// name: item.name.substr(0, 8),
							imgIndex: index % imgNum + 1
						}
					})
				})
			},
			getNebulaList(id) {
				capsuleApi.queryList(id).then(res => {
					const imgNum = 4
					this.nebulaInfo.list = res.map((item, index) => {
						return {
							...item,
							// name: item.name.substr(0, 8),
							imgIndex: index % imgNum + 1
						}
					})
				})
			},
			getGalaxyList() {
				capsuleApi.queryList(0).then(res => {
					const imgNum = 8
					this.galaxyInfo.list = res.map((item, index) => {
						return {
							...item,
							// name: item.name.substr(0, 6),
							imgIndex: index % imgNum + 1
						}
					})
					// this.galaxyInfo.selectedId = this.galaxyInfo.list[0].id
					// this.chooseGalaxy(this.galaxyInfo.list[0].id)
				})
			}
		},
		computed: {
			activeStarLevel: function(){
				return this.starLevelInfo.list.find(item => item.id === this.starLevelInfo.selectedId) || {
					name: '',
					icon: ''
				}
			},
			showStep1Gif: function() {
				return this.current === 0
			}
		},
		created() {
			this.playMusic()
			this.getUserInfo()
			this.getGalaxyList()
			IndexApi.getMyStar(0).then(res => {
				this.selfStarId = res? res.id : ''
			})
			IndexApi.getGalxyByUserId().then(res => {
				this.myGalxy = res || {}
			})
		},
		beforeDestroy() {
			this.music.stop()
		}
	}
</script>

<style>
	@import url('@/pagesCapsule/static/transition.min.css');
</style>
<style lang="scss" scoped>
	.capsule-wrap {
		position: relative;
		height: 100vh;

		.bg {
			position: absolute;
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.bg1 {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.capsule-step {
			min-height: 100vh;
			background-color: transparent;

			// padding-top: calc(var(--status-bar-height) + 48px);
			.choose-tips {
				position: relative;
				text-align: center;
				font-size: 14px;
				color: #FFFFFF;
				width: 100%;
				line-height: 22px;
				z-index: 1;
			}
		}

		.flex {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.por {
			position: relative;
		}

		@keyframes music {
			0% {
				transform: rotate(0deg);
			}

			100% {
				transform: rotate(360deg);
			}
		}

		.music {
			position: fixed;
			top: calc(var(--status-bar-height) + 88rpx + 58rpx);
			right: 48rpx;
			width: 64rpx;
			height: 64rpx;
			padding: 16rpx;
			background-color: #000;
			border-radius: 100%;

			&.music-on {
				animation: music 3s linear infinite;
			}

			image {
				width: 100%;
				height: 100%;
			}
		}

		.next {
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
		}

		@keyframes colorful {
			0% {
				color: #fff;
				filter: blur(0.3px) hue-rotate(0deg);
				text-shadow: 0 0 5px #00b3ff,
					0 0 10px #00b3ff,
					0 0 15px #00b3ff,
					0 0 20px #00b3ff,
					0 0 30px #00b3ff,
					0 0 50px #00b3ff;
			}

			30%,
			70% {
				color: #fff;
				filter: blur(0.3px) hue-rotate(360deg);
				text-shadow: 0 0 5px #00b3ff,
					0 0 10px #00b3ff,
					0 0 15px #00b3ff,
					0 0 20px #00b3ff;
			}

			100% {
				color: transparent;
				box-shadow: none;
				filter: blur(0.3px) hue-rotate(0deg);
			}
		}
		@keyframes twinkle {
			0% {
					opacity: 0;
				}

				50% {
					opacity: 1;
				}

				100% {
					opacity: 0;
				}
		}
		@keyframes twinkle2 {
			0% {
					opacity: 0.4;
				}
		
				50% {
					opacity: 1;
				}
		
				100% {
					opacity: 0.4;
				}
		}
		.star-twinkle {
			animation: twinkle2 2s linear infinite;
		}
		.colorful {
			font-size: 14px;
			animation: colorful 3s linear infinite;
			animation-delay: calc(0.1s * var(--i));
		}
		.gif-wrap{
			position: fixed;
			bottom: 587rpx;
			left: 0;
			right: 0;
			transition: .3s;
			&.hide{
				opacity: 0;
			}
			@keyframes upDown {
				0%{
					transform: translateY(0);
				}
				25%{
					transform: translateY(-10rpx);
				}
				50%{
					transform: translateY(0);
				}
				75%{
					transform: translateY(10rpx);
				}

				100%{
					transform: translateY(0);
				}
			}
			@keyframes downUp {
				0%{
					transform: translateY(0);
				}
				25%{
					transform: translateY(10rpx);
				}
				50%{
					transform: translateY(0);
				}
				75%{
					transform: translateY(-10rpx);
				}
				100%{
					transform: translateY(0);
				}
			}
			.up-down{
				animation: upDown 5.1s  linear infinite;
			}
			.down-up{
				animation: downUp 5.1s  linear infinite;
			}
			.index1{
				position: absolute;
				bottom: 150rpx;
				left: -200rpx;
				width: 1030rpx;
			}
			.index2{
				position: absolute;
				right: -300rpx;
				bottom: 80rpx;
				width: 600rpx;
			}
			.index3{
				position: absolute;
				bottom: 0;
				left: -100rpx;
				width: 300rpx;
			}
			.index4{
				position: absolute;
				bottom: 340rpx;
				right: 0;
				width: 150rpx;
			}
		}
		.step0 {
			height: 100vh;

			.text-wrap {
				position: absolute;
				bottom: 240rpx;
				width: 100%;

				@keyframes opacityShow {
					0%{
						opacity: 0;
					}
					100%{
						opacity: 1;
					}
				}
				.name {
					position: relative;
					display: inline-block;
					line-height: 72rpx;
					text-align: center;
					background: linear-gradient(to right, transparent, #8E8CDF, transparent);
					margin: 0 auto;
					padding: 0 100rpx;
					font-size: 48rpx;
					color: #FFFFFF;
					opacity: 0;
					animation: opacityShow .6s .3s linear forwards;
					&::before {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						height: 2px;
						background-image: linear-gradient(90deg, rgba(0, 1, 16, 0.00) 1%, #8E8CDF 56%, rgba(0, 1, 27, 0.00) 100%);
					}

					&::after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						height: 2px;
						background-image: linear-gradient(90deg, rgba(0, 1, 16, 0.00) 1%, #8E8CDF 56%, rgba(0, 1, 27, 0.00) 100%);
					}

				}

				.welcome {
					text-align: center;
					font-size: 0;
					text-align: center;
					margin: 0 0 35rpx;
				}

				.letsgo {
					width: 460rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					background-color: rgba(132, 163, 255, 0.2);
					border-radius: 14px;
					margin: 0 auto;
					font-size: 30rpx;
					color: #88A5FF;
					opacity: 0;
					animation: opacityShow .3s 2.3s linear forwards;
				}
			}
		}

		.step1 {
			.btn-wrap {
				position: absolute;
				bottom: 232rpx;
				left: 50%;
				transform: translateX(-50%);

				.btn {
					width: 622rpx;
					height: 200rpx;
					padding-left: 200rpx;
					transition: .1s;

					&:last-child {
						margin-bottom: 0;
					}

					image {
						position: absolute;
						left: 0;
						top: 0;
						width: 200rpx;
						height: 200rpx;
					}

					.galaxy-name {
						width: 100%;
						transform: matrix(1, 0, -0.5, 1, 0, 0);

						.text {
							color: #fff;
							font-size: 24px;
							font-weight: bold;
							line-height: 200rpx;
							// filter: blur(0.7px);
							text-shadow: 0 0 25px #eff500;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							&:active{
								text-shadow: 0 0 35px #eff500;
							}
						}
					}
				}
			}
		}

		.step2 {
			height: 100vh;

			.content {
				display: flex;
				flex-direction: column;
				padding-bottom: 100rpx;

				

				.twinkle {
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
					animation: twinkle 2s linear infinite;
				}

				.section {
					position: relative;
					font-size: 0;

					.text {
						font-size: 14px;
						color: #ffffff;
						text-align: center;
					}

					.active {
						display: none;
					}

					&.step3-active {
						.default {
							display: none;
						}

						.active {
							display: block;
						}
					}
				}

				.nebula1 {
					left: 23%;
					width: 220rpx;

					image {
						width: 220rpx;
					}

					.twinkle {
						width: 220rpx;
						animation-delay: .5s;
					}
				}

				.nebula2 {
					margin-top: -146rpx;
					left: 66%;
					width: 178rpx;

					image {
						width: 178rpx;
					}

					.twinkle {
						width: 178rpx;
						animation-duration: 3s;
					}
				}

				.nebula3 {
					left: 50%;
					transform: translateX(-50%);
					width: 518rpx;

					image {
						width: 518rpx;
					}

					.twinkle {
						width: 518rpx;
					}

					.text {
						color: #fff;
					}
				}

				.nebula4 {
					left: 13.5%;
					width: 190rpx;

					image {
						width: 190rpx;
					}

					.twinkle {
						width: 190rpx;
						animation-delay: 1s;
					}
				}

				.nebula5 {
					margin-top: -70rpx;
					left: 65%;
					width: 174rpx;

					image {
						width: 174rpx;
					}

					.twinkle {
						width: 174rpx;
						animation-delay: .2s;
					}
				}

				.nebula6 {
					margin-top: -80rpx;
					left: 15%;
					width: 210rpx;

					image {
						width: 210rpx;
					}

					.twinkle {
						width: 210rpx;
						animation-delay: 1s;
					}
				}

				.nebula7 {
					left: 50%;
					transform: translateX(-50%);
					width: 450rpx;

					image {
						width: 450rpx;
					}

					.twinkle {
						width: 450rpx;
					}

					.text {
						color: #fff;
					}
				}

				.nebula8 {
					left: 15%;
					width: 200rpx;

					image {
						width: 200rpx;
					}

					.twinkle {
						width: 200rpx;
						animation-delay: 1s;
					}
				}

				.nebula9 {
					margin-top: -90rpx;
					left: 65%;
					width: 190rpx;

					image {
						width: 190rpx;
					}

					.twinkle {
						width: 190rpx;
						animation-delay: .2s;
					}
				}

				.nebula10 {
					margin-top: -100rpx;
					left: 18%;
					width: 220rpx;

					image {
						width: 220rpx;
					}

					.twinkle {
						width: 220rpx;
						animation-delay: 1s;
					}
				}
			}
		}

		.step3 {
			height: 100vh;

			.content {
				.section {
					position: absolute;
					font-size: 0;

					.text {
						font-size: 14px;
						color: #57A1FF;
						text-align: center;
					}
				}

				.section1 {
					top: 6.8%;
					left: 26%;

					image {
						width: 160rpx;
						height: 160rpx;
					}
				}

				.section2 {
					top: 10%;
					left: 58%;

					image {
						width: 280rpx;
						height: 280rpx;
					}

					.text {
						top: 70%;
					}
				}

				.section3 {
					top: 21.9%;
					left: 7.2%;

					image {
						width: 160rpx;
						height: 160rpx;
					}
				}

				.section4 {
					top: 25%;
					left: 34.9%;

					image {
						width: 120rpx;
						height: 120rpx;
					}
				}

				.section5 {
					top: 33.2%;
					left: 57.3%;

					image {
						width: 120rpx;
						height: 120rpx;
					}
				}

				.section6 {
					top: 46%;
					left: 50%;
					transform: translateX(-50%);

					image {
						width: 350rpx;
						height: 350rpx;
					}

					.text {
						font-size: 20px;
						color: #fff;
					}
				}
				
				.section7 {
					top: 60%;
					left: 0;

					image {
						width: 200rpx;
					}
					.text {
						font-size: 20px;
						color: #fff;
					}
				}
				.section8 {
					top: 55%;
					right: 0;
				
					image {
						width: 200rpx;
					}
					.text {
						font-size: 20px;
						color: #fff;
					}
				}
				.section9 {
					top: 77%;
					left: 23%;
				
					image {
						width: 200rpx;
					}
					.text {
						font-size: 20px;
						color: #fff;
					}
				}
				.section10 {
					top: 77%;
					left: 53%;
				
					image {
						width: 200rpx;
					}
					.text {
						font-size: 20px;
						color: #fff;
					}
				}
			}
			
			
		}
		
		@keyframes start-move1 {
			0%{
				transform: translateX(0);
			}
			50%{
				transform: translateX(15px);
			}
			100%{
				transform: translateX(0);
			}
		}
		@keyframes start-move2 {
			0%{
				transform: translateY(0);
			}
			50%{
				transform: translateY(15px);
			}
			100%{
				transform: translateY(0);
			}
		}
		@keyframes start-move3 {
			0%{
				transform: translateX(0);
			}
			50%{
				transform: translateX(8px);
			}
			100%{
				transform: translateX(0);
			}
		}
		.start-move1{
			animation: start-move1 6s linear infinite;
		}
		.start-move2{
			animation: start-move2 5s linear infinite;
		}
		.start-move3{
			animation: start-move3 4s linear infinite;
		}
		
		.step4 {
			.icon {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 348rpx;
				height: 348rpx;
				margin-top: -50rpx;
				.bg{
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
				}
				.head{
					width: 120rpx;
					height: 120rpx;
					margin-top: -130rpx;
				}
				view{
					font-size: 12px;
					color: #FFFFFF;
				}
			}
			

			.content {
				height: 100vh;
				font-size: 0;
			}

			.img-box {
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
			}


			// .icon1 {
			// 	margin-left: 120rpx;
			// 	margin-top: 154rpx;
			// }

			// .icon2 {
			// 	margin-top: -42rpx;
			// 	margin-left: 24rpx;
			// }

			// .icon3 {
			// 	margin-top: -210rpx;
			// 	margin-left: 352rpx;
			// }

			// .icon4 {
			// 	margin-top: -64rpx;
			// 	margin-left: 54rpx;
			// }

			// .icon5 {
			// 	margin-top: -108rpx;
			// 	margin-left: 352rpx;
			// }

			// .icon6 {
			// 	margin-left: 274rpx;
			// }

			// .icon7 {
			// 	margin-top: -98rpx;
			// 	margin-left: 54rpx;
			// }

			// .icon8 {
			// 	margin-top: -78rpx;
			// 	margin-left: 246rpx;
			// }

			// .icon10 {
			// 	margin-left: 300rpx;
			// 	margin-top: -150rpx;
			// }
		}

		.step5{
			.time-line{
				transform: translateY(1000px);
				transition: 1s;
			}
			.time-line-show{
				transform: translateY(0);
			}
		}
		.step6 {
			height: 100vh;
			padding: 256rpx 48rpx 280rpx;

			@keyframes wishHide {
				0% {
					transform: none;
					opacity: 1;
				}

				60% {
					opacity: 1;
				}

				100% {
					opacity: 0;
					transform: scale(0.2, 0.2) matrix(0.866, 0.5, 0, 0.866, 0, 0);
				}

			}

			.textarea-wrap {
				width: 100%;
				height: 100%;
				background: rgba(117, 151, 255, 0.40);
				border: 1px solid #567DF4;
				box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05), inset 0 1px 3px 0 rgba(0, 0, 0, 0.50);
				border-radius: 8px;
				padding: 0 48rpx;

				&.hide {
					animation: wishHide .5s ease-in forwards;
				}

				.title {
					line-height: 33px;
					font-size: 24px;
					color: #FFFFFF;
					margin-top: 48rpx;
					margin-bottom: 80rpx;
					text-align: center;
				}

				.textarea-bg {
					height: calc(100% - 128rpx - 33px);

					// background: url("/pagesCapsule/static/capsule/line-bg.png");
					// background-size: 100% 44px;
					// background-repeat: repeat-y;
					textarea {
						color: #fff;
						font-size: 15px;
						// line-height: 80rpx;
						width: 100%;
						height: 100%;
						word-break: break-all;
					}
				}
			}

			.aircraft {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				text-align: center;
				width: 100%;
				opacity: 0;

				// transition: .5s;
				image {
					width: 320rpx;
					height: 320rpx;
				}

				@keyframes fly {
					0% {
						transform: translateY(-50%);
					}

					100% {
						transform: translate(-50%, -200%) scale(0, 0);
					}
				}

				&.fly {
					opacity: 1;
					animation: fly .5s .5s forwards;
				}
			}

			.aircraft-success {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				text-align: center;
				width: 100%;

				image {
					width: 320rpx;
					// height: 320rpx;
				}

				.text {
					color: #fff;
					text-align: center;
					font-size: 18px;
					margin-top: 40rpx;
				}
			}
			.aircraft-icon{
				width: 320rpx;
				height: 320rpx;
				margin: 0 auto;
			}

			.btn-wrap {
				display: flex;
				justify-content: space-between;
				position: absolute;
				left: 0;
				bottom: 0;
				height: 280rpx;
				width: 100%;
				padding: 64rpx 48rpx 0;
			}
		}

		.step7 {
			padding: 0 48rpx;
			padding-top: 220rpx;
			height: 100vh;

			.level {
				position: relative;
				width: 100%;
				height: 96rpx;
				padding-left: 112rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.level-icon {
					position: absolute;
					left: 0;
					top: 0;
					width: 96rpx;
					height: 96rpx;
				}

				text {
					font-size: 14px;
					color: #FFFFFF;
				}

				.star-box {
					height: 16rpx;
					font-size: 0;
					margin-top: 16rpx;

					image {
						width: 16rpx;
						height: 16rpx;
						margin-right: 2rpx;
					}
				}
			}

			.same-level-box {
				padding: 26rpx 0;

				.same-level-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 144rpx;
					background: rgba(117, 151, 255, 0.40);
					border: 1px solid #567DF4;
					box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
					border-radius: 8px;
					margin-bottom: 16rpx;
					overflow: hidden;
					color: #fff;

					&::before {
						content: "";
						position: absolute;
						left: 0;
						top: 0;
						width: 28rpx;
						height: 100%;
						background: #567DF4;
					}
				}
			}
			.btn-box {
				position: fixed;
				left: 0;
				bottom: 120rpx;
				width: 100%;
				text-align: center;
			}
		}
	}
	.linear-text {
		background-image: linear-gradient(#FFD83B, #BEDCAD);
		background-clip: text;
		color: transparent !important;
		font-weight: bold;
	}
</style>
