<template>
	<view class="section-header">
		<image :src="config.icon"></image>
		<text class="title">{{config.title}}</text>
		<image class="see-all" src="../../static/home/see-all.png"></image>
	</view>
</template>

<script>
	export default {
		name:"home-section-header",
		props: ['config'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.section-header{
		position: relative;
		display: flex;
		height: 104rpx;
		align-items: center;
		padding-left: 32rpx;
		border-bottom: 1px solid #F1F1F1;
		image{
			width: 48rpx;
			height: 48rpx;
			margin-right: 16rpx;
		}
		.title{
			font-weight: 600;
			font-size: 15px;
			color: #444251;
			letter-spacing: 0.19px;
		}
		.see-all{
			position: absolute;
			top: 50%;
			right: 24rpx;
			transform: translateY(-50%);
			width: 168rpx;
			height: 56rpx;
		}
	}
</style>