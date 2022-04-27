<template>
	<view class="content">
		<view class="home-title">绝味人 在一起</view>
		<view class="home-container">
			<home-item v-for="item in list" :item="item"></home-item>
		</view>
		<image class="promote-star-fixed" :src="upModalImg" @click="goCapsule"></image>
		<u-modal 
			:show="promoteShow"
			width="654rpx"
			:showConfirmButton="false"
			:showCancelButton="false"
			:closeOnClickOverlay="true"
			@close="promoteShow = false"
		>
			<view class="promote-box">
				<image :src="upModalImg"></image>
				<view class="congratulations">恭喜您获得升星勋章</view>
				<view class="thanks">感谢您对公司的努力付出</view>
				<button class="see" @click="goCapsule">查看我的星路历程</button>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				promoteShow: false,
				upInfo: {
					level: 3,
					identity: 'leader'
				},
				list: [
					{
						name: '星空胶囊',
						url: '/pages/capsule/capsule',
						imgSrc: '/static/home/home-capsule.png'
					},
					{
						name: '星委会',
						url: '/pages/committee/committee-list',
						imgSrc: '/static/home/home-committee.png'
					}
				]
			}
		},
		created() {
			setTimeout(() =>{
				this.promoteShow = true
			}, 1000)
		},
		methods: {
			goto(url){
				uni.navigateTo({
					url: url
				});
			},
			goCapsule(){
				this.promoteShow = false
				this.goto('/pages/capsule/capsule')
			}
		},
		computed: {
			upModalImg: function(){
				return `/static/home/level-${this.upInfo.level}-${this.upInfo.identity}.png`
			}
		}
	}
</script>

<style lang="scss">
	.home-title{
		position: fixed;
		left: 48rpx;
		bottom: calc(79% + 48rpx);
		font-size: 20px;
		line-height: 20px;
		color: #FFFFFF;
	}
	.home-container{
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 34px 24px;
		width: 100%;
		height: 79%;
		background: #FFFFFF;
		z-index: 1;
		overflow-y: auto;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}
	.promote-box{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image{
			width: 292rpx;
			height: 292rpx;
		}
		.congratulations{
			font-size: 18px;
			color: #444251;
			text-align: center;
			margin: 84rpx 0 16rpx;
		}
		.thanks{
			font-size: 15px;
			color: #444251;
			text-align: center;
			margin-bottom: 96rpx;
		}
		.see{
			width: 558rpx;
			height: 108rpx;
			line-height: 108rpx;
			background-color: #567DF4;
			color: #FFFFFF;
			border-radius: 29px;
			text-align: center;
			font-size: 18px;
		}
	}
	.promote-star-fixed{
		position: fixed;
		right: 40px;
		bottom: 122px;
		width: 116rpx;
		height: 116rpx;
		z-index: 1;
	}
</style>
