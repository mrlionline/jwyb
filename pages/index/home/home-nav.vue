<template>
	<view class="home-nav">
		<home-nav-item v-for="item in config" :item="item" @webView="showWeb($event)"></home-nav-item>
		<web-view v-if="showWebView" :src="link" @message="webViewMessage($event)"></web-view>
	</view>
</template>

<script>
	import HomeNavItem from './home-nav-item.vue'
	export default{
		components: {
			HomeNavItem
		},
		props: [
			'config'
		],
		data(){
			return {
				showWebView: false,
				link: ''
			}
		},
		methods: {
			showWeb(e){
				this.link = e
				this.showWebView = true
			},
			webViewMessage(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-nav{
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 32rpx 0;
		background-color: #ffffff;
	}
</style>