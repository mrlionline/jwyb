<template>
	<view style="height: 100%;">
		<page-header title="我的" :showBack="false" :isDefault="true" titleColor="#000"></page-header>
		<view class="my-container" :style="{'padding-top': navBarHeight + 'px'}">
			<view class="base-info section">
				<view class="left">
					<view class="head">
						<image v-if="userInfo.avatar" :src="userInfo.avatar"></image>
						<image mode="aspectFit" v-if="!userInfo.avatar" src="/static/defaultAvatar.png"></image>
					</view>
					<view>
						<text>李红</text>
						
					</view>
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="integral section">
				<view class="left">
					<image src="../../../static/time-line-dot.png" style="width: 20px; height: 20px;"></image>
					<text style="font-weight: 400;font-size: 15px;color: #FFE3A5; margin-left: 20rpx;">我的积分</text>
				</view>
				<view class="right">
					<text style="color: #FFE3A5; font-size: 48rpx; font-weight: bold; margin-right: 30rpx;">5000</text>
					<u-icon color="#FFE3A5" size="48rpx" name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="function white-section">
				<view class="fun-item">
					<image src="../../../static/my/my-updates.png"></image>
					<text>我的动态</text>
				</view>
				<view class="fun-item">
					<image src="../../../static/my/set.png"></image>
					<text>设置</text>
				</view>
			</view>
			<view class="information white-section">
				<view class="header">资讯</view>
				<view class="content">
					<view class="information-item">
						<view class="number">123</view>
						<view class="name">收藏</view>
					</view>
					<view class="information-item">
						<view class="number">123</view>
						<view class="name">点赞</view>
					</view>
					<view class="information-item">
						<view class="number">1209</view>
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
	export default {
		data() {
			return {
				navBarHeight: getApp().globalData.statusBarHeight + 48,
				userInfo: {
					avatar: '/static/header.jpg',
					name: ''
				},
				logoutConfirm: false,
				position: [],
				myStar: {
					name: '',
					icon: ''
				}
			}
		},
		methods: {
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
			}
		},
		created() {
			this.userInfo = uni.getStorageSync('userInfo')
			indexApis.getUserInfoById(-1).then(res => {
				this.position = res.userPositions
			})
			indexApis.getMyStar(0).then(res => {
				this.myStar = res
			})
			
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
		height: 100vh;
		background: #F4F6F8;
		z-index: 1;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
		padding-bottom: 176rpx;
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
		height: 152rpx;
		padding: 0 12rpx 0 8rpx;
		.left{
			display: flex;
			align-items: center;
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
	}
	.integral{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 8px;
		height: 144rpx;
		background-image: linear-gradient(193deg, #7A36DC 3%, #1F1D8E 83%);
		margin-top: 40rpx;
		padding: 0 32rpx;
		.left,
		.right{
			display: flex;
			align-items: center;
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
			image{
				width: 96rpx;
				height: 96rpx;
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
