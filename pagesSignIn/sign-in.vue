<template>
	<view class="sign-in">
		<page-header title="每日签到" :showBack="true" :isDefault="true"></page-header>
		<image class="bg" src="/pagesSignIn/static/bg@2x.png" mode="aspectFill"></image>
		<view class="calendar" :style="{top: navBarHeight + 'px'}">
			<view class="item" v-for="item in signInList">
				<image mode="widthFix" v-if="item.isHistory && item.isLogin === 0" src="/pagesSignIn/static/sign-in-history-no.png"></image>
				<image mode="widthFix" v-if="item.isHistory && item.isLogin === 1" src="/pagesSignIn/static/sign-in-history-yes.png"></image>
				<image mode="widthFix" v-if="item.isNowDay && item.isLogin === 0" src="/pagesSignIn/static/sign-in-today-no.png"></image>
				<image mode="widthFix" v-if="item.isNowDay && item.isLogin === 1" src="/pagesSignIn/static/sign-in-today-yes.png"></image>
				<image mode="widthFix" v-if="item.isFuture" src="/pagesSignIn/static/sign-in-future.png"></image>
				<text>{{item.weekDay}}</text>
			</view>
		</view>
		<image class="circle" src="/pagesSignIn/static/circle.png"></image>
		<image class="btn" @click="doSignIn()" src="/pagesSignIn/static/sign-in-btn.png"></image>
		
		<u-popup :show="showPop" mode="center" bgColor="transparent" @close="showPop = false">
			<view style="display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="showPop = false">
				<image style="width: 542rpx; height: 542rpx;" src="/pagesSignIn/static/ten.png"></image>
				<image style="width: 388rpx; height: 124rpx;" src="/pagesSignIn/static/use.png"></image>
				<image style="width: 80rpx; height: 80rpx; margin-top: 32rpx;" @click="showPop=false" src="/pagesSignIn/static/close.png"></image>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import myApi from '../http/apis-my.js'
	export default{
		data(){
			return {
				navBarHeight: getApp().globalData.statusBarHeight + 48,
				showPop: false,
				signInList: []
			}
		},
		methods: {
			doSignIn(){
				myApi.loginIn().then(res =>{
					this.showPop = true
					this.loginRecord()
				})
			},
			loginRecord(){
				myApi.loginRecord().then(res =>{
					const todayIndex = res.findIndex(item => item.isNowDay === 1)
					this.signInList = res.map((item, i) =>{
						return {
							...item,
							isFuture: i > todayIndex,
							isHistory: i< todayIndex
						}
					})
				})
			}
		},
		created() {
			this.loginRecord()
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
			padding: 0 30rpx 0 32rpx;
			.item{
				display: inline-block;
				width: 88rpx;
				text-align: center;
				margin-right: 12rpx;
				&:last-child{
					margin-right: 0;
				}
				image{
					width: 100%;
				}
				text{
					line-height: 36rpx;
					font-weight: 400;
					font-size: 26rpx;
					color: #FFFFFF;
					margin-top: 8rpx;
				}
			}
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