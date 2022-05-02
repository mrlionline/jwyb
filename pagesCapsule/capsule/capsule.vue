<template>
	<view>
		<u-navbar leftIconSize="20px" :title="'星空胶囊' + current" leftIconColor="#fff" :bgColor="'transparent'"
			:titleStyle="{color: '#fff'}" @leftClick="back()"></u-navbar>
		<view class="capsule-wrap">
			<view class="bg">
				<image src="/pagesCapsule/static/capsule/capsule-bg.png"></image>
			</view>
			<swiper style="height: 100%;" :indicator-dots="false" :autoplay="false" :vertical="true" :current="current"
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
					<view class="capsule-step step2 por">
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
					<view class="capsule-step step3 por">
						<view class="choose-tips">请点击您的所属片区</view>
						<view class="content por">
							<view class="por section xinan">
								<image src="/pagesCapsule/static/capsule/step3-xinan.png"></image>
								<image class="twinkle" src="/pagesCapsule/static/capsule/step3-xinan.png"></image>
								<view class="text">西南片区</view>
							</view>
							<view class="por section huazhong">
								<image src="/pagesCapsule/static/capsule/step3-huazhong.png"></image>
								<image class="twinkle" src="/pagesCapsule/static/capsule/step3-huazhong.png"></image>
								<view class="text">华中片区</view>
							</view>
							<view class="por section huadong">
								<image src="/pagesCapsule/static/capsule/step3-huadong.png"></image>
								<image class="twinkle" src="/pagesCapsule/static/capsule/step3-huadong.png"></image>
								<view class="text">华东片区</view>
							</view>
							<view class="por section beifang">
								<image mode="widthFix" src="/pagesCapsule/static/capsule/step3-beifang.png"></image>
								<image mode="widthFix" class="twinkle" src="/pagesCapsule/static/capsule/step3-beifang.png"></image>
								<view class="text">北方片区</view>
							</view>
							<view class="por section huanan">
								<image mode="widthFix" src="/pagesCapsule/static/capsule/step3-huanan.png"></image>
								<image mode="widthFix" class="twinkle" src="/pagesCapsule/static/capsule/step3-huanan.png"></image>
								<view class="text">华南片区</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="capsule-step">
						<scroll-view :scroll-y="true" style="height: 100vh;">
							<view style="height: 50vh; background-color: yellow;">A</view>
							<view style="height: 50vh; background-color: blue;">B</view>
							<view style="height: 50vh; background-color: greenyellow;">C</view>
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
				current: 0,
				musicOn: true,
				music: null
			}
		},
		methods: {
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
			},
			chooseStep2(index){
				
			}
		},
		created() {
			this.playMusic()
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
			padding-top: calc(var(--status-bar-height) + 48px);
			.choose-tips {
				text-align: center;
				font-size: 16px;
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
			}
		}
	}
</style>
