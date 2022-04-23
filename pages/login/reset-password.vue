<template>
	<view>
		<page-header title="修改密码"></page-header>
		<view class="container">
			<view class="login-form">
				<view class="input-wrap">
					<u-icon name="grid-fill" color="#444251" size="22"></u-icon>
					<view class="divider"></view>
					<u--input
						class="input-node"
						placeholder="请输入原密码"
						border="none"
						v-model="oldPassword"
						:password="true"
					  ></u--input>
				</view>
				<view class="input-wrap">
					<u-icon name="grid-fill" color="#444251" size="22"></u-icon>
					<view class="divider"></view>
					<u-input
						class="input-node"
						placeholder="请输入新密码"
						border="none"
						v-model="newPassword"
						:password="!showNewPassword"
					  >
						<template slot="suffix">
							<u-icon size="20px" :name="showNewPassword ? 'eye' : 'eye-off'" @click="showNewPassword = !showNewPassword"></u-icon>
						</template>
					  </u-input>
				</view>
				<view class="input-wrap">
					<u-icon name="grid-fill" color="#444251" size="22"></u-icon>
					<view class="divider"></view>
					<u-input
						class="input-node"
						placeholder="请再次输入新密码"
						border="none"
						v-model="confirmNewPassword"
						:password="!showConfirmNewPassword"
					  >
						<template slot="suffix">
							<u-icon size="20px" :name="showConfirmNewPassword ? 'eye' : 'eye-off'" @click="showConfirmNewPassword = !showConfirmNewPassword"></u-icon>
						</template>
					  </u-input>
				</view>
				<view
					class="reset-btn"
					:class="{'reset-btn-disabled': resetBtnIsDisabled}"
					:disabled="resetBtnIsDisabled" 
					@click="reset"
				>确定修改</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: '',
				showNewPassword: false,
				showConfirmNewPassword: false
				
			}
		},
		methods: {
			showToast(msg){
				this.$refs.uToast.show({
					type: 'default',
					message: msg
				})
			},
			reset(){
				if(this.resetBtnIsDisabled) return
				if(this.newPassword === this.confirmNewPassword){
					
				}else {
					this.showToast('两次密码输入不一致')
				}
			}
		},
		computed: {
			resetBtnIsDisabled: function(){
				return this.oldPassword.trim() === '' || this.newPassword.trim() === '' || this.confirmNewPassword.trim() === ''
			}
		}
	}
</script>

<style lang="scss">
	.container{
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
	.login-form{
		padding: 64rpx;
		.input-wrap{
			display: flex;
			align-items: center;
			width: 622rpx;
			height: 108rpx;
			padding: 0 13px;
			margin-bottom: 16px;
			border-radius: 8px;
			border: 1px solid #D7D9DB;
			.divider{
				width: 1px;
				height: 76rpx;
				background-color: #D7D9DB;
				margin-left: 13px;
				margin-right: 23px;
			}
		}
		.reset-btn{
			display: inline-block;
			width: 622rpx;
			height: 108rpx;
			line-height: 108rpx;
			text-align: center;
			background: #567DF4;
			font-size: 18px;
			color: #FFFFFF;
			border-radius: 29px;
		}
		.reset-btn-disabled{
			background-color: #D7D9DB;
		}
	}
</style>
