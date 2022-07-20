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
		<image class="promote-star-fixed" v-if="showUpStar && myStarIcon" :src="myStarIcon" @click="promoteShow = true"></image>
		<u-popup
			:show="promoteShow"
			width="654rpx"
			mode="center"
			bgColor="transparent"
			@close="promoteShow = false"
		>
			<view class="promote-box">
				<image class="bg" src="/static/home/up-bg.png" mode=""></image>
				<image class="star" :src="myStarIcon"></image>
				<image class="see" src="/static/home/up-see.png" @click="goCapsule" mode=""></image>
				<image class="close" src="/static/home/close.png" @click="promoteShow = false" mode=""></image>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import HomeNav from './home-nav.vue'
	import HomeBanner from './home-banner.vue'
	import HomeCard from './home-card.vue'
	import HomeNews from './home-news.vue'
	import indexApis from '../../../http/apis-index.js'
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
				},
				showUpStar: false,
				myStarIcon: ''
			}
		},
		created() {
			// setTimeout(() =>{
			// 	this.promoteShow = true
			// }, 1000)
			// this.getConfig()
			indexApis.getMyStar(0).then(res => {
				this.myStarIcon = res.icon
			})
			const userInfo = uni.getStorageSync('userInfo');
			if(userInfo.upgradeTips && userInfo.upgradeTips === 1 && userInfo.tipsDate && new Date(userInfo.tipsDate) > new Date()){
				this.showUpStar = true
        this.promoteShow = true
			}
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
		}
	}
</script>

<style lang="scss" scoped>
	.promote-box{
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 654rpx;
		height: 920rpx;
		top: -50rpx;
		.bg{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			width: 654rpx;
			height: 920rpx;
		}
		.star{
			position: absolute;
			width: 342rpx;
			height: 240rpx;
			left: 50%;
			bottom: 338rpx;
			transform: translateX(-50%);
			z-index: 2;
		}
		.thanks{
			position: absolute;
			left: 0;
			right: 0;
			font-size: 34rpx;
			color: #FFFFFF;
			text-align: center;
			bottom: 220rpx;
			z-index: 2;
		}
		.see{
			position: absolute;
			width: 402rpx;
			height: 108rpx;
			left: 50%;
			bottom: 72rpx;
			transform: translateX(-50%);
			z-index: 2;
			opacity: 0;
		}
		.close{
			position: absolute;
			width: 72rpx;
			height: 72rpx;
			left: 50%;
			bottom: -132rpx;
			transform: translateX(-50%);
			z-index: 2;
		}
	}
	.promote-star-fixed{
		position: fixed;
		right: 40px;
		bottom: 122px;
		width: 136rpx;
		height: 96rpx;
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
