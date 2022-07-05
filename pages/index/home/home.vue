<template>
	<view class="content">
		<page-header
			title="绝味人在一起"
			:showBack="false"
			:isDefault="true"
			bgColor="#fff"
			titleColor="#000"
			:showWidthScroll="true"
		></page-header>
		<view v-for="item in configList" :class="[item.name, {'radius-content': item.name !== 'banner'}]">
			<home-banner v-if="item.name === 'banner'" :config="item.config"></home-banner>
			<home-nav v-if="item.name === 'navigation'" :config="item.config.navs"></home-nav>
			<home-card v-if="item.name === 'card'" :config="item.config"></home-card>
			<home-news v-if="item.name === 'news'" :config="item.config"></home-news>
		</view>
		<!-- <image class="promote-star-fixed" :src="upModalImg" @click="goCapsule"></image> -->
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
	import HomeNav from './home-nav.vue'
	import HomeBanner from './home-banner.vue'
	import HomeCard from './home-card.vue'
	import HomeNews from './home-news.vue'
	export default {
		props: [
			'configList'
		],
		components: {
			HomeNav,
			HomeBanner,
			HomeCard,
			HomeNews
		},
		data() {
			return {
				promoteShow: false,
				upInfo: {
					level: 3,
					identity: 'leader'
				}
			}
		},
		created() {
			// setTimeout(() =>{
			// 	this.promoteShow = true
			// }, 1000)
			// this.getConfig()
		},
		methods: {
			goto(url){
				uni.navigateTo({
					url: url
				});
			},
			goCapsule(){
				this.promoteShow = false
				this.goto('/pagesCapsule/capsule/capsule')
			}
		},
		computed: {
			upModalImg: function(){
				return `/static/home/level-${this.upInfo.level}-${this.upInfo.identity}.png`
			}
		},
	}
</script>

<style lang="scss" scoped>
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
	.banner + view{
		position: relative;
		margin-top: -32rpx;
		z-index: 1;
	}
	.radius-content{
		margin: 0 32rpx 24rpx;
		border-radius: 8px;
		overflow: hidden;
	}
</style>
