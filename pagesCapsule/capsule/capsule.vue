<template>
	<view>
		<u-navbar leftIconSize="20px" title="星空胶囊" leftIconColor="#fff" :bgColor="'transparent'"
			:titleStyle="{color: '#fff'}" @leftClick="back()"></u-navbar>
		<view class="capsule-wrap">
			<view class="bg">
				<image src="/pagesCapsule/static/capsule/capsule-bg.png"></image>
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
					<view class="capsule-step step1 flex por">
						<view class="text-wrap" v-show="current === 0">
							<view class="name">
								<view style="animation-delay:1s;" class="ld ld-fall-ttb-in">王小红</view>
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
					<view class="capsule-step has-tips step2 por">
						<view class="choose-tips">请点击您的所属星系</view>
						<view class="btn-wrap" v-show="current === 1">
							<view class="btn btn1 por" @click="chooseStep2(1)" style="margin-bottom: 80rpx;">
								<view class="corner tl"></view>
								<view class="corner br"></view>
								<image style="animation-delay:1s;" class="text ld ld-rush-ltr-in" src="/pagesCapsule/static/capsule/step2-btn1-icon.png"></image>
								<view style="animation-delay:1s;" class="text ld ld-rush-rtl-in">营销星系</view>
							</view>
							<view class="btn btn2 por" @click="chooseStep2(2)">
								<view class="corner tl"></view>
								<view class="corner br"></view>
								<image style="animation-delay:1s;" class="text ld ld-rush-ltr-in" src="/pagesCapsule/static/capsule/step2-btn2-icon.png"></image>
								<view style="animation-delay:1s;" class="text ld ld-rush-rtl-in">供应链星系</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step has-tips step3 por">
						<template v-if="step2SelectedIndex === 1">
							<view class="choose-tips">请点击您的所属片区</view>
							<view class="content por">
								<view class="section xinan" :class="{'step3-active': step3Selected === 1}" @click="chooseStep3(1)">
									<image class="default" src="/pagesCapsule/static/capsule/step3-xinan.png"></image>
									<image class="active" src="/pagesCapsule/static/capsule/step3-xinan-active.png"></image>
									<image class="twinkle" src="/pagesCapsule/static/capsule/step3-xinan.png"></image>
									<view class="text">西南片区</view>
								</view>
								<view class="section huazhong" :class="{'step3-active': step3Selected === 2}" @click="chooseStep3(2)">
									<image class="default" src="/pagesCapsule/static/capsule/step3-huazhong.png"></image>
									<image class="active" src="/pagesCapsule/static/capsule/step3-huazhong-active.png"></image>
									<image class="twinkle" src="/pagesCapsule/static/capsule/step3-huazhong.png"></image>
									<view class="text">华中片区</view>
								</view>
								<view class="section huadong" :class="{'step3-active': step3Selected === 3}" @click="chooseStep3(3)">
									<image class="default" src="/pagesCapsule/static/capsule/step3-huadong.png"></image>
									<image class="active" src="/pagesCapsule/static/capsule/step3-huadong-active.png"></image>
									<image class="twinkle" src="/pagesCapsule/static/capsule/step3-huadong.png"></image>
									<view class="text">华东片区</view>
								</view>
								<view class="section beifang" :class="{'step3-active': step3Selected === 4}" @click="chooseStep3(4)">
									<image class="default" mode="widthFix" src="/pagesCapsule/static/capsule/step3-beifang.png"></image>
									<image class="active" mode="widthFix" src="/pagesCapsule/static/capsule/step3-beifang-active.png"></image>
									<image mode="widthFix" class="twinkle" src="/pagesCapsule/static/capsule/step3-beifang.png"></image>
									<view class="text">北方片区</view>
								</view>
								<view class="section huanan" :class="{'step3-active': step3Selected === 5}" @click="chooseStep3(5)">
									<image class="default" mode="widthFix" src="/pagesCapsule/static/capsule/step3-huanan.png"></image>
									<image class="active" mode="widthFix" src="/pagesCapsule/static/capsule/step3-huanan-active.png"></image>
									<image mode="widthFix" class="twinkle" src="/pagesCapsule/static/capsule/step3-huanan.png"></image>
									<view class="text">华南片区</view>
								</view>
							</view>
						</template>
						<template v-if="step2SelectedIndex === 2">
							<view class="choose-tips">请点击您的所属星球</view>
							<view class="content por">
								<!-- <view class="section section0">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/1.png"></image>
								</view> -->
								<view class="section section1" :class="{'step3-active': step3Selected === 6}" @click="chooseStep3(6)">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/1.png"></image>
									<view class="text">xx星球</view>
								</view>
								<view class="section section2" :class="{'step3-active': step3Selected === 7}" @click="chooseStep3(7)">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/2.png"></image>
									<view class="text">xx星球</view>
								</view>
								<view class="section section3" :class="{'step3-active': step3Selected === 8}" @click="chooseStep3(8)">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/3.png"></image>
									<view class="text">xx星球</view>
								</view>
								<view class="section section4" :class="{'step3-active': step3Selected === 9}" @click="chooseStep3(9)">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/4.png"></image>
									<view class="text">xx星球</view>
								</view>
								<view class="section section5" :class="{'step3-active': step3Selected === 10}" @click="chooseStep3(10)">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/5.png"></image>
									<view class="text">xx星球</view>
								</view>
								<view class="section section6" :class="{'step3-active': step3Selected === 11}" @click="chooseStep3(11)">
									<image mode="widthFix" src="/pagesCapsule/static/capsule/6.png"></image>
									<view class="text">xx星球</view>
								</view>
							</view>
						</template>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step has-tips step4">
						<view class="choose-tips">请点击您所获星级可查看同星级家人</view>
						<scroll-view :scroll-y="true" style="height: calc(100vh - 240rpx);">
							<image class="icon leader3" src="/pagesCapsule/static/capsule/step4-leader3.png"></image>
							<image class="icon leader2" src="/pagesCapsule/static/capsule/step4-leader2.png"></image>
							<image class="icon leader1" src="/pagesCapsule/static/capsule/step4-leader1.png"></image>
							<image class="icon member5" src="/pagesCapsule/static/capsule/step4-member5.png"></image>
							<image class="icon member4" src="/pagesCapsule/static/capsule/step4-member4.png"></image>
							<image class="icon member3" src="/pagesCapsule/static/capsule/step4-member3.png"></image>
							<image class="icon member2" src="/pagesCapsule/static/capsule/step4-member2.png"></image>
							<image class="icon member1" src="/pagesCapsule/static/capsule/step4-member1.png"></image>
							<view style="padding-bottom:120rpx; text-align: center;">
								<app-button text="查看我的星路历程"></app-button>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step5">
						<scroll-view :scroll-y="true" style="height: 100vh; padding-top: 220rpx; color: #fff;">
							<view style="text-align: center; font-size: 24px;">
								<view style="margin-bottom: 16rpx;">亲爱的王晓红！</view>
								<view>您已和绝味一起走过<text style="color: #FFD940">{{step5Day}}</text>天</view>
							</view>
							<view style="padding: 96rpx 48rpx 428rpx;">
								<time-line theme="dark" :list="step5TimeLineList"></time-line>
							</view>
							<view style="position: fixed; bottom: 120rpx; text-align: center; width: 100%;">
								<app-button text="星语心愿"></app-button>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step step6 por">
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
					<view class="capsule-step step7">
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
	import next from './capsuleNext.vue'
	export default {
		components: {
			next
		},
		data() {
			return {
				current: 6,
				musicOn: true,
				music: null,
				step2SelectedIndex: 0,
				step3Selected: null,
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
				setTimeout(() =>{
					this.step6SubmitFail = true
				}, 1000)
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
				this.current = e.detail.current
				if(this.current >= 2 && this.step2SelectedIndex === 0){
					setTimeout(() =>{
						this.current = 1
					},0)
				}
				if(this.current >= 3 && !this.step3Selected){
					setTimeout(() =>{
						this.current = 2
					},0)
				}
			},
			animationfinish(e){
				console.log(this.current)
				if(this.current === 4){
					this.initStep5()
				}else {
					this.step5Day = 0
				}
			},
			initStep5(){
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
			chooseStep2(index){
				this.step3Selected = null
				setTimeout(() =>{
					this.step2SelectedIndex = index
					this.current = 2
				}, 20)
			},
			chooseStep3(index){
				setTimeout(() =>{
					this.step3Selected = index
					this.current = 3
				}, 20)
			}
		},
		created() {
			this.playMusic()
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

		.capsule-step {
			min-height: 100vh;
			background-color: transparent;
			// padding-top: calc(var(--status-bar-height) + 48px);
			&.has-tips{
				padding-top: 240rpx;
			}
			.choose-tips {
				text-align: center;
				font-size: 14px;
				color: #FFFFFF;
				width: 100%;
				height: 22px;
				line-height: 22px;
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

		.step1 {
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

		.step2 {
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
		.step3{
			height: 100vh;
			.content{
				height: calc(100% - 22px);
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
				.xinan{
					left: 23%;
					width: 220rpx;
					height: 220rpx;
					image{
						width: 220rpx;
						height: 220rpx;
					}
					.twinkle{
						width: 220rpx;
						height: 220rpx;
						animation-delay: .5s;
					}
				}
				.huazhong{
					left: 66%;
					top: 10%;
					width: 178rpx;
					height: 178rpx;
					image{
						width: 178rpx;
						height: 178rpx;
					}
					.twinkle{
						width: 178rpx;
						height: 178rpx;
						animation-duration: 3s;
					}
				}
				.huadong{
					left: 50%;
					top: 40%;
					transform: translate(-50%,-50%);
					width: 482rpx;
					height: 482rpx;
					image{
						width: 482rpx;
						height: 482rpx;
					}
					.twinkle{
						width: 482rpx;
						height: 482rpx;
					}
					.text{
						top: 85%;
						color: #fff;
					}
				}
				.beifang{
					left: 13.5%;
					bottom: 20%;
					width: 190rpx;
					height: 130rpx;
					image{
						width: 190rpx;
					}
					.twinkle{
						width: 190rpx;
						animation-delay: 1s;
					}
				}
				.huanan{
					left: 65%;
					bottom: 12%;
					width: 190rpx;
					height: 130rpx;
					image{
						width: 190rpx;
					}
					.twinkle{
						width: 190rpx;
						animation-delay: .2s;
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
			.leader3{
				margin-left: 120rpx;
			}
			.leader2{
				margin-top: -42rpx;
				margin-left: 24rpx;
			}
			.leader1{
				margin-top: -210rpx;
				margin-left: 352rpx;
			}
			.member5{
				margin-top: -64rpx;
				margin-left: 54rpx;
			}
			.member4{
				margin-top: -108rpx;
				margin-left: 352rpx;
			}
			.member3{
				margin-left: 274rpx;
			}
			.member2{
				margin-top: -98rpx;
				margin-left: 54rpx;
			}
			.member1{
				margin-top: -78rpx;
				margin-left: 246rpx;
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
