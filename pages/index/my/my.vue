<template>
	<view>
		<view class="my-container">
			<view class="user-info">
				<view class="user-star-tag">
					<text>三星店员</text>
				</view>
				<view class="user-header">
					<image :src="userInfo.headerUrl"></image>
				</view>
				<view class="user-name">{{userInfo.name}}</view>
				<view class="user-star">
					<image v-for="star in userInfo.star" src="/static/my/star@3x.png"></image>
				</view>
			</view>
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
	export default {
		data() {
			return {
				userInfo: {
					headerUrl: '/static/header.jpg',
					name: '李霞红',
					star: 3
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
			},
			goReset(){
				uni.navigateTo({
					url: '/pages/login/reset-password'
				});
			}
		}
	}
</script>

<style lang="scss">
	.my-container{
		position: fixed;
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
	}
	.user-info{
		position: relative;
		left: 50%;
		top: -80rpx;
		transform: translateX(-50%);
		width: 240rpx;
		height: 360rpx;
		.user-star-tag{
			position: absolute;
			top: 110rpx;
			left: calc(100% + 16px);
			display: flex;
			align-items: center;
			height: 20px;
			padding: 0 10px;
			background: #FDF1E8;
			border-radius: 12px;
			text{
				font-size: 12px;
				text-align: center;
				color: #F2731E;
				white-space: nowrap;
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
			margin: 8px 0;
			height: 28px;
			line-height: 28px;
			font-size: 20px;
			color: #444251;
			letter-spacing: 0;
			text-align: center;
		}
		.user-star{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 16px;
			image{
				width: 14px;
				height: 14px;
				margin-right: 2px;
				&:last-child{
					margin-right: 0;
				}
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
