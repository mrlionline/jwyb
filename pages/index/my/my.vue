<template>
	<view style="height: 100%;">
		<page-header
			title="我的"
			:showBack="false"
			:isDefault="true"
			titleColor="#000"
			:border="true"
		></page-header>
		<view class="my-container" :style="{'padding-top': navBarHeight + 'px'}">
			<view class="base-info section">
				<view class="left">
					<view class="head">
						<image v-if="wechatUserInfo.avatarUrl" :src="wechatUserInfo.avatarUrl"></image>
						<image mode="aspectFit" v-if="!wechatUserInfo.avatarUrl" src="/static/defaultAvatar.png"></image>
					</view>
					<view class="user-name">
						<text>{{userInfo.name}}</text>
						<view class="user-star" v-if="myStar.name">
							<image :src="myStar.icon" mode="aspectFit"></image>
							<text>{{myStar.name}}</text>
						</view>
					</view>
				</view>
				<view class="right">
					<image @click="goto('/pagesSignIn/sign-in')" src="../../../static/my/sign-in-btn.png"></image>
				</view>
			</view>
			<view class="integral section">
				<image src="/static/my/scroll-bg.png" class="bg"></image>
				<view class="left">
					<image src="../../../static/my/scroll-icon.png" style="width: 20px; height: 20px;"></image>
					<text style="font-weight: 400;font-size: 15px;color: #FFE3A5; margin-left: 20rpx;">我的积分</text>
				</view>
				<view class="right" @click="goto('/pagesMyScore/my-score')">
					<text style="color: #FFE3A5; font-size: 48rpx; font-weight: bold; margin-right: 30rpx;">{{score}}</text>
					<u-icon color="#FFE3A5" size="48rpx" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="function white-section">
				<view class="fun-item" @click="goto('/pagesCommunity/community/list/list?type=mine')">
					<view class="icon-box">
						<image src="../../../static/my/my-updates.png"></image>
					</view>
					<text>我的动态</text>
				</view>
				<view class="fun-item" @click="goto('pages/index/my/my-set')">
					<view class="icon-box">
						<image src="../../../static/my/set.png"></image>
					</view>
					<text>设置</text>
				</view>
			</view>
			<view class="information white-section">
				<view class="header">资讯</view>
				<view class="content">
					<view class="information-item" @click="goto('/pages/information/myList?currentTab=1')">
						<view class="number">{{information.collectionTotalNum}}</view>
						<view class="name">收藏</view>
					</view>
					<view class="information-item" @click="goto('/pages/information/myList?currentTab=2')">
						<view class="number">{{information.pointTotalNum}}</view>
						<view class="name">点赞</view>
					</view>
					<view class="information-item" @click="goto('/pages/information/myList?currentTab=3')">
						<view class="number">{{information.replyTotalNum}}</view>
						<view class="name">评论</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal
			:show="logoutConfirm"
			:showCancelButton="true"
			confirmColor="#E20812"
			@cancel="logoutConfirm = false"
			@confirm="logout"
		>
				<text style="font-weight: bold;">您确定要退出登录吗？</text>
		</u-modal>
	</view>
</template>

<script>
	import indexApis from '../../../http/apis-index.js'
	import myApis from '../../../http/apis-my.js'
	export default {
		data() {
			return {
				navBarHeight: getApp().globalData.statusBarHeight + 48,
				wechatUserInfo: {},
				userInfo: {
					avatar: '',
					name: ''
				},
				logoutConfirm: false,
				position: [],
				myStar: {
					name: '',
					icon: ''
				},
				information: {
					collectionTotalNum: 0,	// 收藏
					pointTotalNum: 0,
					replyTotalNum: 0
				},
				score: ''
			}
		},
		methods: {
			getUserProfile(){
				const wechatUserInfo = getApp().globalData.wechatUserInfo
				if(wechatUserInfo){
					this.wechatUserInfo = wechatUserInfo
				}else {
					uni.getUserProfile({
						desc: '展示头像',
						success: res =>{
							this.wechatUserInfo = res.userInfo
							getApp().globalData.wechatUserInfo = this.wechatUserInfo
						}
					})
				}
			},
			goto(url){
				uni.navigateTo({
					url: url
				});
			},
			logout(){
				indexApis.logout().then(() =>{
					uni.clearStorage();
					uni.reLaunch({
						url: '/pages/login/login'
					})
				})
			},
			goReset(){
				uni.navigateTo({
					url: '/pages/login/reset-password'
				});
			},
			statisticsMyInformationCount(){
				myApis.statisticsMyInformationCount({}).then(res =>{
					this.information = res
				})
			},
			myIntegralTop(){
				myApis.myIntegralTop().then(res =>{
					this.score = res.totalIntegral
				})
			}
		},
		created() {
			this.getUserProfile()
			this.userInfo = uni.getStorageSync('userInfo')
			indexApis.getUserInfoById(-1).then(res => {
				this.position = res.userPositions
			})
			indexApis.getMyStar(0).then(res => {
				this.myStar = res
			})
			this.statisticsMyInformationCount()
			this.myIntegralTop()
		}
	}
</script>

<style lang="scss" scoped>
	.space{
		height: 412rpx;
	}
	.my-container{
		// position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
		z-index: 1;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}
	.section{
		width: calc(100% - 64rpx);
		margin: 0 auto;
	}
	.white-section{
		background: #FFFFFF;
		box-shadow: 0 2px 10px 0 rgba(11,27,50,0.05);
		border-radius: 8px;
		width: calc(100% - 64rpx);
		margin: 0 auto;
	}
	.base-info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 200rpx;
		padding: 40rpx 12rpx 0 8rpx;
		.left{
			display: flex;
			align-items: center;
			.user-name{
				display: flex;
				flex-direction: column;
				.user-star{
					position: relative;
					margin-top: 12rpx;
					font-size: 0;
					image{
						position: absolute;
						left: 0;
						top: -2rpx;
						width: 64rpx;
						height: 44rpx;
					}
					text{
						display: inline-block;
						height: 40rpx;
						line-height: 40rpx;
						padding: 0 22rpx 0 86rpx;
						font-size: 20rpx;
						color: #8A4F0A;
						background: #FFDA20;
						border-radius: 0 80px 80px 0;
					}
				}
			}
		}
		.head{
			width: 160rpx;
			height: 160rpx;
			border: 2px solid #fff;
			border-radius: 100%;
			overflow: hidden;
			margin-right: 52rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.right image{
			width: 64rpx;
			height: 108rpx;
		}
	}
	.integral{
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 8px;
		width: 686rpx;
		height: 144rpx;
		margin-top: 40rpx;
		padding: 0 32rpx;
		.left,
		.right{
			position: relative;
			display: flex;
			align-items: center;
			z-index: 1;
		}
		.bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 686rpx;
			height: 144rpx;
			z-index: 0;
		}
	}
	.function{
		display: flex;
		padding: 32rpx 28rpx;
		margin-top: 24rpx;
		font-size: 0;
		.fun-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 172rpx;
			height: 132rpx;
			margin-right: 58rpx;
			text-align: center;
			&:nth-child(3n+0){
				margin-right: 0;
			}
			.icon-box{
				width: 96rpx;
				height: 96rpx;
				padding: 15rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			text{
				font-weight: 400;
				font-size: 26rpx;
				color: #444251;
			}
		}
	}
	.information{
		padding: 24rpx 32rpx 40rpx;
		margin-top: 24rpx;
		.header{
			line-height: 36rpx;
			font-weight: 500;
			font-size: 26rpx;
			color: #444251;
			margin-bottom: 32rpx;
		}
		.content{
			display: flex;
			justify-content: space-between;
			.information-item{
				width: 164rpx;
				text-align: center;
				.number{
					line-height: 58rpx;
					font-weight: 500;
					font-size: 42rpx;
					color: #444251;
					text-align: center;
				}
				.name{
					line-height: 36rpx;
					font-weight: 400;
					font-size: 26rpx;
					color: #444251;
					text-align: center;
					margin-top: 4rpx;
				}
			}
		}
	}
</style>
