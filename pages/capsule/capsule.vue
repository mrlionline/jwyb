<template>
	<view>
		<u-navbar
			leftIconSize="20px"
			title="星空胶囊"
			leftIconColor="#fff"
			:bgColor="'transparent'"
			:titleStyle="{color: '#fff'}"
			@leftClick="back()"
		></u-navbar>
		<view class="capsule-wrap">
			<view class="bg">
				<image src="/static/capsule/capsule-bg.jpeg"></image>
			</view>
			<swiper
				style="height: 100%;"
				:indicator-dots="false"
				:autoplay="false"
				:vertical="true"
				:current="current"
			>
				<swiper-item>
					<view class="capsule-step step1 flex pre">
						<image class="capsule-icon" src="/static/apply.png"></image>
						<view style="font-size: 24px; color: #ffffff;">王小红</view>
						<view style="font-size: 24px; color: #ffffff; margin: 36rpx 0 74rpx;">欢迎来到绝味星际空间</view>
						<view style="font-size: 15px; color: #ffffff;">请随我一起回顾您的星路之旅吧</view>
						<view class="next">
							<image class="icon" src="/static/capsule/next-icon.png"></image>
							<image class="down-arrow down-arrow1" src="/static/capsule/down-arrow.png"></image>
							<image class="down-arrow down-arrow2" src="/static/capsule/down-arrow.png"></image>
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
				<image src="/static/capsule/music.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				musicOn: true,
				music: null,
				pageList: [
					{
						name:'a',
						background: 'red'
					},
					{
						name: 'b',
						background: 'yellow'
					},{
						name: 'c',
						background: 'blue'
					}
				]
			}
		},
		methods: {
			musicClick(){
				if(this.musicOn){
					this.musicOn = false
					this.music.pause()
				}else {
					this.musicOn = true
					this.music.play()
				}
			},
			playMusic(){
				this.music = uni.createInnerAudioContext();
				this.music.autoplay = true;
				this.music.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
				this.music.onPlay(() => {
				  console.log('开始播放');
				});
			},
			back(){
				uni.navigateBack()
			}
		},
		created() {
			this.playMusic()
		}
	}
</script>

<style lang="scss">
	@keyframes oneArrow
    {
		0%{
			opacity: 0;
			top: -19rpx;
		}
		50%{
			opacity: 1;
			top: 0;
		}
		100%{
			opacity: 0;
			top: 19rpx;
		}
	}
	.capsule-wrap{
		position: relative;
		height: 100vh;
		.bg{
			position: absolute;
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.capsule-step{
			min-height: 100vh;
			background-color: transparent;
		}
		.flex{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.pre{
			position: relative;
		}
		.next{
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.icon{
				width: 72rpx;
				height: 72rpx;
			}
			.down-arrow{
				position: relative;
				top: -19rpx;
				width: 35rpx;
				height: 19rpx;
				opacity: 0;
			}
			.down-arrow1{
				animation: oneArrow 2s linear infinite;
			}
			.down-arrow2{
				margin-top: -19rpx;
				animation: oneArrow 2s 1s linear infinite;
			}
		}
		.step1 .capsule-icon{
			width: 450rpx;
			height: 350rpx;
			margin-bottom: 200rpx;
		}
		@keyframes music {
			0%{
				transform: rotate(0deg);
			}
			100%{
				transform: rotate(360deg);
			}
		}
		.music{
			position: fixed;
			top: calc(var(--status-bar-height) + 88rpx + 58rpx);
			right: 48rpx;
			width: 64rpx;
			height: 64rpx;
			padding: 16rpx;
			background-color: #000;
			border-radius: 100%;
			&.music-on{
				animation: music 3s linear infinite;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
