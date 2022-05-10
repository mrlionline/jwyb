<template>
	<view>
		<u-navbar leftIconSize="20px" title="星空胶囊" leftIconColor="#fff" :bgColor="'transparent'"
			:titleStyle="{color: '#fff'}" @leftClick="back()"></u-navbar>
		<view class="capsule-wrap">
			<view class="bg">
				<image :src="baseUrl + 'capsule-bg1.png'"></image>
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
						<view class="bg1">
							<image mode="aspectFill" :src="baseUrl + 'capsule-bg2.png'"></image>
						</view>
						<view class="text-wrap" v-show="current === 0">
							<view class="name">
								<view style="animation-delay:1s;" class="ld ld-fall-ttb-in">{{userInfo.name}}</view>
							</view>
							<view style="animation-delay:1.5s;" class="welcome ld ld-bounce-in">
								<view>欢迎来到</view>
								<view>绝味星际空间</view>
							</view>
							<view class="letsgo">请随我一起回顾您的星路之旅吧</view>
						</view>
						<next class="next"></next>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step1 por" v-if="current === 0 || current === 1 || current === 2">
						<view class="bg1">
							<image mode="aspectFill" :src="baseUrl + 'capsule-bg2.png'"></image>
						</view>
						<view class="choose-tips" :style="{'padding-top': navBarHeight}">请点击您的所属星系</view>
						<view class="btn-wrap" v-show="current === 1">
							<view
								class="btn por"
								:class="i%2 === 0 ? 'btn1' : 'btn2'"
								v-for="(galaxy, i) of galaxyInfo.list"
								@click="chooseGalaxy(galaxy.id)"
							>
								<view class="corner tl"></view>
								<view class="corner br"></view>
								<image style="animation-delay:1s;" class="text ld ld-rush-ltr-in" :src="i%2 === 0 ? '/pagesCapsule/static/capsule/step2-btn1-icon.png' : '/pagesCapsule/static/capsule/step2-btn2-icon.png'"></image>
								<view style="animation-delay:1s;" class="text ld ld-rush-rtl-in">{{galaxy.name}}</view>
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
									:class="['nebula' + (index+1), {'step3-active': nebulaInfo.selectedId === nebula.id}]"
									@click="chooseNebula(nebula.id)"
								>
									<image mode="widthFix" class="default" :src="'/pagesCapsule/static/capsule/nebula'+nebula.imgIndex+'.png'"></image>
									<image mode="widthFix" class="active" :src="'/pagesCapsule/static/capsule/nebula'+nebula.imgIndex+'-active.png'"></image>
									<image mode="widthFix" class="twinkle" :src="'/pagesCapsule/static/capsule/nebula'+nebula.imgIndex+'.png'"></image>
									<view class="text">{{nebula.name}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step3 por" v-if="current === 2 || current === 3 || current === 4">
						<scroll-view :scroll-y="true" style="height: 100vh;">
							<view class="choose-tips" :style="{'padding-top': navBarHeight}">请点击您的所属星球</view>
							<view class="content por">
								<!-- <view class="section section0">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/1.png"></image>
								</view> -->
								<view
									v-for="(star,index) of starInfo.list"
									class="section"
									:class="['section' + (index + 1), {'step3-active': star.id === starInfo.selectedId}]"
									@click="chooseStar(star.id)"
								>
									<image mode="widthFix" :src="'/pagesCapsule/static/capsule/' + star.imgIndex + '.png'"></image>
									<view class="text">{{star.name}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step4" v-if="current === 3 || current === 4 || current === 5">
						<view class="content por">
							<image style="width: 750rpx; height: 100vh;" mode="aspectFill" :src="baseUrl + 'capsule-bg3.png'"></image>
							<view class="img-box">
								<view class="choose-tips" :style="{'padding-top': navBarHeight}">请点击您所获星级可查看同星级家人</view>
								<image
									class="icon"
									:class="'icon' + (index+1)"
									v-for="(level, index) of starLevelInfo.list"
									:src="level.img"
									@click="chooseStarLevel(level.id)"
								></image>
							</view>
							<view class="btn-box">
								<app-button text="查看我的星路历程"></app-button>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step5" v-if="current === 4 || current === 5 || current === 6">
						<scroll-view :scroll-y="true" style="height: 100vh; padding-top: 220rpx; color: #fff;">
							<view style="text-align: center; font-size: 24px;">
								<view style="margin-bottom: 16rpx;">亲爱的{{userInfo.name}}！</view>
								<view>您已和绝味一起走过<text style="color: #FFD940">{{step5Day}}</text>天</view>
							</view>
							<view style="padding: 96rpx 48rpx 428rpx;">
								<time-line theme="dark" :list="step5TimeLineList"></time-line>
							</view>
							<view style="position: fixed; bottom: 120rpx; text-align: center; width: 100%;">
								<app-button text="星语心愿" @click="current++"></app-button>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step6 por" v-if="current === 5 || current === 6 || current === 7">
						<view class="textarea-wrap" :class="{'hide': step6SubmitWish}">
							<view class="title">星语心愿</view>
							<view class="textarea-bg">
								<textarea v-model="step6Text" maxlength="-1" placeholder-style="font-size:15px;line-height: 180rpx;" placeholder="快与大家分享自己的星语心愿吧"/>
							</view>
						</view>
						<view class="aircraft" :class="{'fly': step6SubmitWish}">
							<image src="/pagesCapsule/static/capsule/submit-success.png"></image>
							<!-- <view class="text">您的星语心愿发布成功</view> -->
						</view>
						<view class="aircraft-success" v-if="step6SubmitSuccess">
							<image src="/pagesCapsule/static/capsule/submit-success.png"></image>
							<view class="text">您的星语心愿发布成功</view>
						</view>
						<view class="aircraft-success" v-if="step6SubmitFail">
							<image src="/pagesCapsule/static/capsule/submit-fail.png"></image>
							<view class="text">您的星语心愿发布失败</view>
						</view>
						<view class="btn-wrap">
							<template v-if="!step6SubmitWish">
								<app-button width="304rpx" text="取消" type="default"></app-button>
								<app-button width="304rpx" text="发布" @click="submitWish()"></app-button>
							</template>
							<template v-if="step6SubmitWish">
								<app-button width="304rpx" text="重新许愿" type="default" @click="resetWish"></app-button>
								<app-button width="304rpx" text="再次回顾"></app-button>
							</template>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step7" v-if="current === 6 || current === 7">
						<scroll-view :scroll-y="true" style="height: 100%;">
							<view class="level">
								<image class="level-icon" src="/static/home/level-1-personnel.png"></image>
								<text>三星店员</text>
								<view class="star-box">
									<image v-for="star in 3" src="/static/start3.png"></image>
								</view>
							</view>
							<view class="same-level-box">
								<view class="same-level-item por" v-for="(item,index) in step7List">
									<text>{{item.name}}</text>
									<text>{{item.shop}}</text>
								</view>
							</view>
						</scroll-view>
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
	const nebulaImgList = [

	]
	export default {
		components: {
			next
		},
		data() {
			return {
				navBarHeight: `calc(${getApp().globalData.statusBarHeight}px + 48px)`,
				current: 0,
				musicOn: true,
				music: null,
				userInfo: null,
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
				step5Day: 0,
				step5Timer: '',
				step5TimeLineList: [
					{
						date: '2/25',
						year: '2021',
						title: '入职绝味',
						desc: '加入绝味大家庭'
					},
					{
						date: '2/25',
						year: '2021',
						title: '三星店员',
						desc: '您参加了星空训练营第三期活动，并获得升星勋章',
						image: '/static/home/level-1-personnel.png'
					},
					{
						date: '2/25',
						year: '2021',
						title: '四星店员',
						desc: '您参加了星空训练营第三期活动，并获得升星勋章',
						image: '/static/home/level-2-leader.png'
					}
				],
				step6Text: '',
				step6SubmitWish: false,
				step6SubmitSuccess: false,
				step6SubmitFail: false,
				step7List: [
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					},
					{
						name: '王子红',
						shop: '长沙市一店'
					}
				]
			}
		},
		methods: {
			resetWish(){
				this.step6SubmitWish = false
				this.step6SubmitSuccess = false
				this.step6SubmitFail = false
			},
			submitWish(){
				this.step6SubmitWish = true
				const params = {
					context: this.step6Text
				}
				capsuleApi.add().then(res =>{
					this.step6SubmitFail = true
				}).catch(() =>{
					this.step6SubmitFail = false
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
					'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
				this.music.onPlay(() => {
					console.log('开始播放');
				});
			},
			back() {
				uni.navigateBack()
			},
			currentChange(e) {

			},
			animationfinish(e){
				console.log(this.current)
				this.current = e.detail.current
				if(this.current >= 2 && this.galaxyInfo.selectedId === 0){
					setTimeout(() =>{
						this.current = 1
					},0)
				}
				if(this.current >= 3 && !this.nebulaInfo.selectedId){
					setTimeout(() =>{
						this.current = 2
					},0)
				}
				if(this.current >= 4 && !this.starInfo.selectedId){
					setTimeout(() =>{
						this.current = 3
					},0)
				}

				if(this.current === 5){
					this.initStep5()
				}else {
					this.step5Day = 0
					clearInterval(this.step5Timer)
				}
			},
			initStep5(){
				capsuleApi.queryUserInfo(-1).then(res =>{
					res ={
						starUserHis: [
							{
								"activityName": "123",
								"ctime": "2022-05-08T14:41:00.035Z",
								"latestLogo": 0,
								"starName": "456"
							}
						]
					}
					this.step5TimeLineList = res.starUserHis.map(item =>{
						const date = new Date(item.ctime)
						return {
							date: `${date.getMonth()+1}/${date.getDate()+1}`,
							year: date.getFullYear(),
							title: item.starName,
							desc: item.activityName,
							image: '/static/home/level-1-personnel.png'
						}
					})
				})
				const day = 500
				const time = 1000
				const delay = time / day
				if(this.step5Day >= day) return
				this.step5Timer = setInterval(() =>{
					this.step5Day++
					if(this.step5Day === day){
						clearInterval(this.step5Timer)
					}
				},delay)

			},
			chooseGalaxy(id){
				this.nebulaInfo = {list: [], selectedId: null}
				this.starInfo = {list: [], selectedId: null}
				this.starLevelInfo = {list: [], selectedId: null}
				this.getNebulaList(id)
				this.queryStarListByGalaxyId(id)
				setTimeout(() =>{
					this.galaxyInfo.selectedId = id
					this.current++
				}, 20)
			},
			chooseNebula(id){
				this.starInfo = {list: [], selectedId: null}
				this.getStarList(id)
				setTimeout(() =>{
					this.nebulaInfo.selectedId = id
					this.current++
				}, 20)
			},
			chooseStar(id){
				setTimeout(() =>{
					this.starInfo.selectedId = id
					this.current++
				}, 20)
			},
			chooseStarLevel(id){
				setTimeout(() =>{
					this.starLevelInfo.selectedId = id
					this.current++
				}, 20)
			},
			getUserInfo(){
				this.userInfo = uni.getStorageSync('userInfo');
				console.log('!!!!!!!!!!!!!!!!', this.userInfo)
			},
			queryStarListByGalaxyId(id){
				capsuleApi.queryStarListByGalaxyId(id).then(res =>{
					const imgNum = 10
					res = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10}]
					this.starLevelInfo.list = res.map((item,index) =>{
						return {
							...item,
							img: '/pagesCapsule/static/capsule/step4-member'+(index+1)+'.png'
						}
					})
				})
			},
			getStarList(id){
				capsuleApi.queryList(id).then(res =>{
					const imgNum = 6
					this.starInfo.list = res.map((item,index) =>{
						return {
							...item,
							imgIndex: index%imgNum + 1
						}
					})
					console.log('this.starInfo.list', this.starInfo.list)
				})
			},
			getNebulaList(id){
				capsuleApi.queryList(id).then(res =>{
					const imgNum = 4
					this.nebulaInfo.list = res.map((item,index) =>{
						return {
							...item,
							imgIndex: index%imgNum + 1
						}
					})
					console.log('this.nebulaInfo.list', this.nebulaInfo.list)
				})
			},
			getGalaxyList(){
				capsuleApi.queryList(0).then(res =>{
					this.galaxyInfo.list = res
				})
			}
		},
		created() {
			this.playMusic()
			this.getUserInfo()
			this.getGalaxyList()
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
		.bg1{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			image{
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

		.step0 {
			height: 100vh;
			.text-wrap {
				position: absolute;
				bottom: 240rpx;
				width: 100%;

				.name {
					position: relative;
					width: 408rpx;
					height: 72rpx;
					line-height: 72rpx;
					text-align: center;
					background: linear-gradient(to right, #000110, #8E8CDF, #00011B);
					margin: 0 auto 30rpx;
					font-size: 48rpx;
					color: #FFFFFF;

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
					font-size: 80rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 88rpx;
				}

				.letsgo {
					width: 460rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					background-color: rgba(132, 163, 255, 0.2);
					border-radius: 14px;
					margin: 50rpx auto 0;
					font-size: 30rpx;
					color: #88A5FF;
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
					height: 240rpx;
					border-style: solid;
					border-width: 1px;
					border-radius: 0 20px 0 20px;
					padding-left: 260rpx;
					transition: .1s;
					margin-bottom: 80rpx;
					&:last-child{
						margin-bottom: 0;
					}
					.corner {
						position: absolute;

						&::before {
							content: '';
							position: absolute;
							left: 0;
							top: 0;
							width: 44rpx;
							height: 10rpx;
							border-radius: 0 0 10rpx 0;
						}

						&::after {
							content: '';
							position: absolute;
							left: 0;
							top: 0;
							width: 10rpx;
							height: 44rpx;
							border-radius: 0 0 10rpx 0;
						}

						&.tl {
							left: 0;
							top: 0;
						}

						&.br {
							right: 0;
							bottom: 0;
							transform: rotate(180deg);
						}
					}
					image{
						position: absolute;
						left: 20rpx;
						top: 0;
						width: 240rpx;
						height: 240rpx;
					}
					.text{
						font-size: 24px;
						line-height: 240rpx;
					}
				}

				.btn1 {
					border-color: #FADDAF;
					background: rgba(228, 175, 92, 0.08);

					.corner::before,
					.corner::after {
						background-color: #FADDAF;
					}
					.text{
						color: #FDCB42;
					}
					&:active{
						box-shadow: 0 0 8px 2px #FADDAF;
					}
				}

				.btn2 {
					border-color: #567DF4;
					background: rgba(86, 125, 244, 0.08);

					.corner::before,
					.corner::after {
						background-color: #567DF4;
					}
					.text{
						color: #FFFFFF;
					}
					&:active{
						box-shadow: 0 0 8px 2px #567DF4;
					}
				}
			}
		}
		.step2{
			height: 100vh;
			.content{
				display: flex;
				flex-direction: column;
				padding-bottom: 100rpx;
				@keyframes twinkle {
					0%{
						opacity: 0;
					}
					50%{
						opacity: 1;
					}
					100%{
						opacity: 0;
					}
				}
				.twinkle{
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
					animation: twinkle 2s linear infinite;
				}
				.section{
					position: relative;
					font-size: 0;
					.text{
						font-size: 14px;
						color: #57A1FF;
						text-align: center;
					}
					.active{
						display: none;
					}
					&.step3-active{
						.default{
							display: none;
						}
						.active{
							display: block;
						}
					}
				}
				.nebula1{
					left: 23%;
					width: 220rpx;
					image{
						width: 220rpx;
					}
					.twinkle{
						width: 220rpx;
						animation-delay: .5s;
					}
				}
				.nebula2{
					margin-top: -146rpx;
					left: 66%;
					width: 178rpx;
					image{
						width: 178rpx;
					}
					.twinkle{
						width: 178rpx;
						animation-duration: 3s;
					}
				}
				.nebula3{
					left: 50%;
					transform: translateX(-50%);
					width: 518rpx;
					image{
						width: 518rpx;
					}
					.twinkle{
						width: 518rpx;
					}
					.text{
						color: #fff;
					}
				}
				.nebula4{
					left: 13.5%;
					width: 190rpx;
					image{
						width: 190rpx;
					}
					.twinkle{
						width: 190rpx;
						animation-delay: 1s;
					}
				}
				.nebula5{
					margin-top: -70rpx;
					left: 65%;
					width: 174rpx;
					image{
						width: 174rpx;
					}
					.twinkle{
						width: 174rpx;
						animation-delay: .2s;
					}
				}
				.nebula6{
					margin-top: -80rpx;
					left: 15%;
					width: 210rpx;
					image{
						width: 210rpx;
					}
					.twinkle{
						width: 210rpx;
						animation-delay: 1s;
					}
				}
				.nebula7{
					left: 50%;
					transform: translateX(-50%);
					width: 450rpx;
					image{
						width: 450rpx;
					}
					.twinkle{
						width: 450rpx;
					}
					.text{
						color: #fff;
					}
				}
				.nebula8{
					left: 15%;
					width: 200rpx;
					image{
						width: 200rpx;
					}
					.twinkle{
						width: 200rpx;
						animation-delay: 1s;
					}
				}
				.nebula9{
					margin-top: -90rpx;
					left: 65%;
					width: 190rpx;
					image{
						width: 190rpx;
					}
					.twinkle{
						width: 190rpx;
						animation-delay: .2s;
					}
				}
				.nebula10{
					margin-top: -100rpx;
					left: 18%;
					width: 220rpx;
					image{
						width: 220rpx;
					}
					.twinkle{
						width: 220rpx;
						animation-delay: 1s;
					}
				}
			}
		}
		.step3{
			height: 100vh;
			.content{
				.section{
					position: absolute;
					font-size: 0;
					.text{
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						font-size: 14px;
						color: #57A1FF;
						text-align: center;
					}
					.active{
						display: none;
					}
					&.step3-active{
						.default{
							display: none;
						}
						.active{
							display: block;
						}
					}
				}
				.section1{
					top: 6.8%;
					left: 26%;
					image{
						width: 160rpx;
						height: 160rpx;
					}
				}
				.section2{
					top: 10%;
					left: 58%;
					image{
						width: 280rpx;
						height: 280rpx;
					}
					.text{
						top:70%;
					}
				}
				.section3{
					top: 21.9%;
					left: 7.2%;
					image{
						width: 160rpx;
						height: 160rpx;
					}
				}
				.section4{
					top: 25%;
					left: 34.9%;
					image{
						width: 120rpx;
						height: 120rpx;
					}
				}
				.section5{
					top: 31.2%;
					left: 57.3%;
					image{
						width: 120rpx;
						height: 120rpx;
					}
				}
				.section6{
					top: 36.8%;
					left: 50%;
					transform: translateX(-50%);
					image{
						width: 400rpx;
						height: 400rpx;
					}
					.text{
						font-size: 20px;
						color: #fff;
					}
				}
			}
		}
		.step4{
			.icon{
				display: block;
				width: 348rpx;
				height: 348rpx;
			}
			.content{
				height: 100vh;
				font-size: 0;
			}
			.img-box{
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				overflow-y: scroll;
				padding-bottom: 228rpx;
			}
			.btn-box{
				position: fixed;
				bottom: 120rpx;
				width: 100%;
				text-align: center;
			}
			.icon1{
				margin-left: 120rpx;
				margin-top: 154rpx;
			}
			.icon2{
				margin-top: -42rpx;
				margin-left: 24rpx;
			}
			.icon3{
				margin-top: -210rpx;
				margin-left: 352rpx;
			}
			.icon4{
				margin-top: -64rpx;
				margin-left: 54rpx;
			}
			.icon5{
				margin-top: -108rpx;
				margin-left: 352rpx;
			}
			.icon6{
				margin-left: 274rpx;
			}
			.icon7{
				margin-top: -98rpx;
				margin-left: 54rpx;
			}
			.icon8{
				margin-top: -78rpx;
				margin-left: 246rpx;
			}
			.icon10{
				margin-left: 300rpx;
				margin-top: -150rpx;
			}
		}
		.step6{
			height: 100vh;
			padding: 256rpx 48rpx 280rpx;
			@keyframes wishHide {
				0%{
					transform: none;
					opacity: 1;
				}
				60%{
					opacity: 1;
				}
				100%{
					opacity: 0;
					transform: scale(0.2, 0.2) matrix(0.866, 0.5, 0, 0.866, 0, 0);
				}

			}
			.textarea-wrap{
				width: 100%;
				height: 100%;
				background: rgba(117,151,255,0.40);
				border: 1px solid #567DF4;
				box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05), inset 0 1px 3px 0 rgba(0,0,0,0.50);
				border-radius: 8px;
				padding: 0 48rpx;
				&.hide{
					animation: wishHide .5s ease-in forwards;
				}
				.title{
					line-height: 33px;
					font-size: 24px;
					color: #FFFFFF;
					margin-top: 48rpx;
					margin-bottom: 80rpx;
					text-align: center;
				}
				.textarea-bg{
					height: calc(100% - 128rpx - 33px);
					// background: url("/pagesCapsule/static/capsule/line-bg.png");
					// background-size: 100% 44px;
					// background-repeat: repeat-y;
					textarea{
						color: #fff;
						font-size: 15px;
						// line-height: 80rpx;
						width: 100%;
						height: 100%;
						word-break: break-all;
					}
				}
			}
			.aircraft{
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				text-align: center;
				width: 100%;
				opacity: 0;
				// transition: .5s;
				image{
					width: 320rpx;
					height: 320rpx;
				}
				@keyframes fly {
					0%{
						transform: translateY(-50%);
					}
					100%{
						transform: translate(-50%, -200%) scale(0, 0);
					}
				}
				&.fly{
					opacity: 1;
					animation: fly .5s .5s forwards;
				}
			}
			.aircraft-success{
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				text-align: center;
				width: 100%;
				image{
					width: 320rpx;
					height: 320rpx;
				}
				.text{
					color: #fff;
					text-align: center;
					font-size: 18px;
					margin-top: 40rpx;
				}
			}
			.btn-wrap{
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
		.step7{
			padding: 0 48rpx;
			padding-top: 220rpx;
			height: 100vh;
			.level{
				position: relative;
				width: 100%;
				height: 96rpx;
				padding-left: 112rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.level-icon{
					position: absolute;
					left: 0;
					top: 0;
					width: 96rpx;
					height: 96rpx;
				}
				text{
					font-size: 14px;
					color: #FFFFFF;
				}
				.star-box{
					height: 16rpx;
					font-size: 0;
					margin-top: 16rpx;
					image{
						width: 16rpx;
						height: 16rpx;
						margin-right: 2rpx;
					}
				}
			}
			.same-level-box{
				padding: 26rpx 0;
				.same-level-item{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 144rpx;
					background: rgba(117,151,255,0.40);
					border: 1px solid #567DF4;
					box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
					border-radius: 8px;
					margin-bottom: 16rpx;
					overflow: hidden;
					color: #fff;
					&::before{
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
		}
	}
</style>
