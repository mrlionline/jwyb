<template>
	<view class="home-nav-item" @click="goto()">
		<image :src="item.icon"></image>
		<text>{{item.label}}</text>
	</view>
</template>

<script>
	export default {
		name:"home-item",
		props:[ 'item' ],
		data() {
			return {
				showWebView: false,
				link: ''
			};
		},
		methods: {
			goto(){
				if(!this.item.link.startsWith('http')){
					uni.navigateTo({
						url: this.item.link
					})
				}else {
					this.$emit('webView', this.item.link)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-nav-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 172rpx;
		padding-bottom: 16rpx;
		image{
			width: 96rpx;
			height: 96rpx;
		}
		text{
			font-weight: 400;
			font-size: 26rpx;
			color: #444251;
			letter-spacing: 0.16px;
			text-align: center;
			line-height: 36rpx;
		}
	}
</style>
