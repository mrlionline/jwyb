<template>
	<view class="sign-in">
		<page-header title="每日签到" :showBack="true" :isDefault="true"></page-header>
		<image class="bg" src="/pagesSignIn/static/bg@2x.png" mode="aspectFill"></image>
		<view class="calendar" :style="{top: navBarHeight + 'px'}"></view>
		<image class="circle" src="/pagesSignIn/static/circle.png"></image>
		<image class="btn" @click="doSignIn()" src="/pagesSignIn/static/sign-in-btn.png"></image>
		
		<u-popup :show="showPop" mode="center" bgColor="transparent">
			<view style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
				<image style="width: 542rpx; height: 542rpx;" src="/pagesSignIn/static/ten.png"></image>
				<image style="width: 388rpx; height: 124rpx;" src="/pagesSignIn/static/use.png"></image>
				<image style="width: 80rpx; height: 80rpx; margin-top: 32rpx;" @click="showPop=false" src="/pagesSignIn/static/close.png"></image>
			</view>
		</u-popup>
	</view>
</template>
<script>
	export default{
		data(){
			return {
				navBarHeight: getApp().globalData.statusBarHeight + 48,
				showPop: false
			}
		},
		methods: {
			doSignIn(){
				this.showPop = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sign-in{
		width: 100%;
		height: 100vh;
		.bg{
			width: 100%;
			height: 100%;
			display: block;
		}
		.calendar{
			position: fixed;
			left: 0;
			right: 0;
			height: 100rpx;
			background-color: yellow;
		}
		.circle{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 636rpx;
			height: 560rpx;
		}
		.btn{
			position: absolute;
			left: 50%;
			top: calc(50% + 280rpx + 140rpx);
			transform: translate(-50%, -50%);
			width: 388rpx;
			height: 120rpx;
		}
	}
</style>