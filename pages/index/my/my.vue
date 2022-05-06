<template>
	<view style="height: 100%;">
		<view class="space"></view>
		<view class="my-container">
			<view class="user-info">
				<view class="user-star-tag">
					<image src="/static/star-1-leader.png"></image>
				</view>
				<view class="user-header">
					<image v-if="userInfo.avatar" :src="userInfo.avatar"></image>
					<image v-if="!userInfo.avatar" src="/static/header.jpg"></image>
				</view>
				<view class="user-name">{{userInfo.name}}</view>
			</view>
<!-- 			<view class="user-position">
				<text class="up-title">我的职位</text>
				<view class="position-item" v-for="item in userInfo.positionList">{{item}}</view>
			</view> -->
			<view class="btn-wrap btn-wrap-reset-pwd" @click="goReset">
				<u-icon size="20px" name="edit-pen"></u-icon>
				<text class="btn-text">修改密码</text>
				<view class="arrow-right">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view><view class="btn-wrap" @click="logoutConfirm = true">
				<u-icon size="20px" name="arrow-right-double"></u-icon>
				<text class="btn-text">退出登录</text>
				<view class="arrow-right">
					<u-icon name="arrow-right"></u-icon>
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
				userInfo: {
					avatar: '/static/header.jpg',
					name: ''
				},
				logoutConfirm: false
			}
		},
		methods: {
			logout(){
				uni.clearStorage();
				uni.reLaunch({
					url: '/pages/login/login'
				})
				// indexApis.logout().then(() =>{
				// 	uni.clearStorage();
				// 	uni.reLaunch({
				// 		url: '/pages/login/login'
				// 	})
				// })
			},
			goReset(){
				uni.navigateTo({
					url: '/pages/login/reset-password'
				});
			}
		},
		created() {
			this.userInfo = uni.getStorageSync('userInfo')
		}
	}
</script>

<style lang="scss">
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
		height: 74.6%;
		background: #FFFFFF;
		z-index: 1;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
		padding-bottom: 176rpx;
	}
	.user-info{
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		width: 240rpx;
		margin-top: -120rpx;
		.user-star-tag{
			position: absolute;
			top: calc(120rpx + 25rpx);
			left: 240rpx;
			image{
				width: 240rpx;
				height: 80rpx;
			}
		}
		.user-header{
			width: 240rpx;
			height: 240rpx;
			padding: 20rpx;
			border-radius: 100%;
			background-color: #FFFFFF;
			image{
				max-width: 100%;
				max-height: 100%;
				border-radius: 100%;
			}
		}
		.user-name{
			margin-top: 32rpx;
			height: 28px;
			line-height: 28px;
			font-size: 20px;
			color: #444251;
			letter-spacing: 0;
			text-align: center;
		}
	}
	.user-position{
		position: relative;
		padding: 48rpx;
		width: 654rpx;
		margin: 64rpx auto 32rpx;
		background-image: linear-gradient(170deg, #567DF4 0%, #A2CEFF 100%);
		border: 1px solid #567DF4;
		border-radius: 16px;
		.up-title{
			position: absolute;
			top: -24rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 188rpx;
			height: 48rpx;
			line-height: 48rpx;
			text-align: center;
			border: 1px solid #567DF4;
			border-radius: 26rpx;
			background: #94BDFD;
			color: #FFFFFF;
		}
		.position-item{
			font-size: 15px;
			color: #FFFFFF;
			line-height: 21px;
			margin-bottom: 16rpx;
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
	.btn-wrap{
		position: relative;
		display: flex;
		align-items: center;
		width: 654rpx;
		height: 112rpx;
		padding: 0 48rpx 0 36rpx;
		margin: 0 auto;
		border: 1px solid #D7D9DB;
		border-radius: 8px;
		.arrow-right{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 23.5px;
		}
		.btn-text{
			margin-left: 36rpx;
		}
	}
	.btn-wrap-reset-pwd{
		margin-bottom: 16px;
	}
</style>
