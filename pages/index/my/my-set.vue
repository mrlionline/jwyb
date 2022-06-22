<template>
	<view class="set" :style="{'padding-top': navBarHeight+'px'}">
		<page-header title="设置" :showBack="true" :isDefault="true" titleColor="#000"></page-header>
		<view class="btn-wrap btn-wrap-reset-pwd" @click="goReset">
			<!-- <u-icon size="20px" name="edit-pen"></u-icon> -->
			<image class="icon" src="/static/icon-edit.png"></image>
			<text class="btn-text">修改密码</text>
			<view class="arrow-right">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="btn-wrap" @click="logoutConfirm = true">
			<!-- <u-icon size="20px" name="arrow-right-double"></u-icon> -->
			<image class="icon" src="/static/icon-logout.png"></image>
			<text class="btn-text">退出登录</text>
			<view class="arrow-right">
				<u-icon name="arrow-right"></u-icon>
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
	export default{
		data(){
			return {
				navBarHeight: getApp().globalData.statusBarHeight + 48,
				logoutConfirm: false
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
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrap{
		position: relative;
		display: flex;
		align-items: center;
		width: 654rpx;
		height: 112rpx;
		padding: 0 48rpx 0 36rpx;
		margin: 0 auto 32rpx;
		border: 1px solid #D7D9DB;
		border-radius: 8px;
		.icon{
			width: 40rpx;
			height: 40rpx;
		}
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
</style>