<template>
	<view class="home-news">
		<home-section-header :config="headerConfig"></home-section-header>
		<view class="hn-item" v-for="news in config.contents">
			<view class="item-info" :style="{'width': news.img ? 'calc(100% - 136rpx)' : '100%'}">
				<view class="title">{{news.title}}</view>
				<view class="desc">
					<text>{{news.createTime}}</text>
					<text>{{news.group}}</text>
					<text>{{news.author}}</text>
				</view>
			</view>
			<image class="item-head" :src="news.img" v-if="news.img">
				
			</image>
		</view>
	</view>
</template>

<script>
	export default{
		props: [
			"config"
		],
		data(){
			return {
				headerConfig: {
					icon: '../../static/home/news-head.png',
					title: this.config.title,
					src: ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-news{
		background-color: #ffffff;
		.hn-item{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 32rpx;
			.title{
				line-height: 48rpx;
				font-weight: 600;
				font-size: 17px;
				color: #444251;
				margin-bottom: 16rpx;
			}
			.desc{
				line-height: 34rpx;
				text{
					font-weight: 400;
					font-size: 12px;
					color: #959BA4;
					margin-right: 20rpx;
				}
			}
			.item-head{
				width: 136rpx;
				height: 112rpx;
			}
		}
	}
</style>