<template>
	<view class="home-banner">
		<u-swiper
			:list="list"
			keyName="url"
			@change="e => currentNum = e.current"
			circular
			indicator
			height="480rpx"
			radius="0"
			indicatorStyle="bottom: 48rpx"
			@click="click($event)"
		>
			<!-- <view
				slot="indicator"
				class="indicator-num"
			>
				<text class="indicator-num__text">{{ currentNum + 1 }}/{{ list.length }}</text>
			</view> -->
		</u-swiper>
		<view class="weather" v-if="config && config.showWeather"></view>
	</view>
</template>

<script>
	export default{
		props: [
			'config'
		],
		data() {
			return {
				currentNum: 0
			}
		},
		methods: {
			click(index){
				const item = this.list[index]
				if(!item.link.startsWith('http')){
					uni.navigateTo({
						url: item.link
					})
				}else {
					uni.navigateTo({
						url: `/pages/myWebView/my-web-view?url=${item.link}`
					})
				}
			}
		},
		computed: {
			list: function(){
				if(this.config){
					return this.config.imgs
				}else {
					return undefined
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-banner{
		position: relative;
		.weather{
			position: absolute;
			right: 0;
			top: 0;
		}
		.indicator-num{
			background-color: rgba(0, 0, 0, .5);
			padding: 0 5px;
			border-radius: 15px;
			color: #fff;
			font-size: 12px;
		}
	}
</style>