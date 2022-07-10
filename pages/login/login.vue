<template>
	<view>
		<page-header title=" " :showBack="false"></page-header>
		<view class="container">
			<image class="main-bg" src="/static/login-bg.png"></image>
			<view class="page-title">
				<view class="page-title-first">绝味人 在一起</view>
				<view class="page-title-second">{{pageTitleSecond}}</view>
			</view>
			<view class="login-form">
				<template v-if="loginType === 'password'">
					<view class="input-wrap">
						<image class="inp-icon" src="/static/icon-msg.png"></image>
						<view class="divider"></view>
						<u--input
							class="input-node"
							placeholder="输入账号/手机号码"
							border="none"
							v-model="number"
						  ></u--input>
					</view>
					<view class="input-wrap">
						<image class="inp-icon" src="/static/icon-pwd.png"></image>
						<view class="divider"></view>
						<u-input
							class="input-node"
							placeholder="输入密码"
							border="none"
							v-model="password"
							:password="!showPassword"
						  >
							<template slot="suffix">
								<u-icon size="20px" :name="showPassword ? 'eye' : 'eye-off'" @click="showPassword = !showPassword"></u-icon>
							</template>
						  </u-input>
					</view>
					<view class="input-wrap">
						<image class="inp-icon" src="/static/icon-pwd.png"></image>
						<view class="divider"></view>
						<u-input
							class="input-node"
							placeholder="输入验证码"
							border="none"
							v-model="imgVerCode"
						  >
							<template slot="suffix">
								<image @click="formula" style="width: 160rpx;height: 80rpx;" :src="imgVerCodeSrc"></image>
							</template>
						  </u-input>
					</view>
				</template>
				<template v-if="loginType === 'verCode'">
					<view class="input-wrap">
						<image class="inp-icon" src="/static/icon-mobile.png"></image>
						<view class="divider"></view>
						<u--input
							class="input-node"
							placeholder="输入手机号码"
							border="none"
							v-model="mobile"
						  ></u--input>
					</view>
					<view class="input-wrap">
						<image class="inp-icon" src="/static/icon-pwd.png"></image>
						<view class="divider"></view>
						<u-input
							class="input-node"
							placeholder="输入验证码"
							border="none"
							v-model="imgVerCode"
						  >
							<template slot="suffix">
								<image @click="formula" style="width: 160rpx;height: 80rpx;" :src="imgVerCodeSrc"></image>
							</template>
						  </u-input>
					</view>
					<view class="input-wrap">
						<image class="inp-icon" src="/static/icon-pwd.png"></image>
						<view class="divider"></view>
						<u-input
							class="input-node"
							placeholder="输入验证码"
							border="none"
							v-model="verCode"
						  >
							<template slot="suffix">
								<text :class="gettingVerCode ? 'ver-code-btn-disabled': 'ver-code-btn'" @click="getVerCode">{{verCodeText}}</text>
							</template>
						  </u-input>
					</view>
				</template>
				<view class="toggle-login-type">
					<text @click="changeLoginType">{{toggleLoginTypeText}}</text>
				</view>
				<view
					class="login-btn"
					:class="{'login-btn-disabled': loginBtnIsDisabled}"
					:disabled="loginBtnIsDisabled"
					@click="login"
				>登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loginApis from '../../http/apis-login.js'
	import infoListApis from '../../http/information/list.js'
	const SECOND = 60
	export default {
		data() {
			return {
				loginType: 'password',
				number: '',	// 账号
				password: '',
				mobile: '',
				verCode: '',
				showPassword: false,
				gettingVerCode: false,
				countDown: SECOND,
				timer: null,
				imgVerCodeSrc: '',
				imgVerCode: ''
			}
		},
		methods: {
			changeLoginType(){
				this.loginType = this.loginType === 'password' ? 'verCode' : 'password'
			},
			login(){
				if(this.loginBtnIsDisabled) return
				if(this.loginType === 'password'){
					this.loginByPassword()
				}else if(this.loginType === 'verCode'){
					this.loginByVerCode()
				}
			},
			loginByPassword(){
				const params = {
					accountType: 'MOBILE',
					formulaResult: this.imgVerCode,
					login: this.number,
					loginType: 'APP',
					password: this.password
				}
				loginApis.login(params).then(res =>{
					this.loginSuccess(res)
				}).catch(e => {
					this.formula()
				})
			},
			loginByVerCode(){
				const params = {
					accountType: 'MOBILE',
					formulaResult: this.imgVerCode,
					login: this.mobile,
					loginType: 'APP',
					smsCode: this.verCode
				}
				loginApis.loginForPhone(params).then(res =>{
					this.loginSuccess(res)
				}).catch(() =>{
					this.formula()
				})
			},
			loginSuccess(res){
				uni.setStorageSync('userInfo', res.userInfo)
				this.userWechatLogin()
				uni.setStorage({
					key: 'token',
					data: res.authorization,
					success: function () {
						uni.redirectTo({
							url: '/pages/index/index'
						})
					}
				});
			},
			/* 静默登录 */
			userWechatLogin(){
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.info("loginRes-->",loginRes)
					//
					infoListApis.apiCode2Session(loginRes.code).then(res => {
						console.info("微信登录接口！res-->",res.openid)
						if(res.openid){
							uni.setStorageSync('userOpenId', res.openid)
						}
					})
					
				  }
				})
			},
			getVerCode(){
				if(this.gettingVerCode) return
				if(!this.mobile) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
					return
				}
				if(!this.imgVerCode) {
					uni.showToast({
						title: '请输入图形验证码',
						icon: 'none'
					})
					return
				}
				this.gettingVerCode = true
				this.countDown = SECOND
				this.timer = setInterval(() =>{
					if(this.countDown === 0){
						clearInterval(this.timer)
						this.gettingVerCode = false
						return
					}
					this.countDown--
				}, 1000)
				const params = {
					phoneNumber: this.mobile,
					templateId: 1,
					formulaResult: this.imgVerCode

				}
				loginApis.sendSmsCode(params).then(() => {
					uni.showToast({
						title: '验证码已发送',
						icon: 'none'
					})
		
				}).catch(err =>{
					clearInterval(this.timer)
					this.gettingVerCode = false

				})
			},
			formula(){
				loginApis.formula().then(res =>{
					this.imgVerCode = ''
					this.imgVerCodeSrc = res.replace(/[\r\n]/g, '')
				})
			}
		},
		computed: {
			pageTitleSecond: function(){
				if(this.loginType === 'password'){
					return '请输入您的账号和密码登录'
				}else if(this.loginType === 'verCode'){
					return '请输入您的手机号和验证码登录'
				}
			},
			toggleLoginTypeText: function(){
				if(this.loginType === 'password'){
					return '验证码登录'
				}else if(this.loginType === 'verCode'){
					return '账号密码登录'
				}
			},
			loginBtnIsDisabled: function(){
				if(this.loginType === 'password'){
					return this.number.trim() === '' || this.password.trim() === '' || this.imgVerCode.trim() === ''
				}else if(this.loginType === 'verCode'){
					return this.mobile.trim() === '' || this.verCode.trim() === ''
				}
			},
			verCodeText: function(){
				if(this.gettingVerCode){
					return this.countDown + 'S'
				}else {
					return '获取验证码'
				}
			}
		},
		created() {
			this.formula()
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
		.main-bg{
			position: absolute;
			bottom: 0;
			width: 750rpx;
			height: 320rpx;
			z-index: -100;
		}
	}
	.page-title{
		position: absolute;
		top: -94px;
		left: 32px;
		height: 62px;
		.page-title-first{
			font-weight: bold;
			font-size: 24px;
			color: #FFFFFF;
			line-height: 33px;
		}
		.page-title-second{
			font-size: 15px;
			color: #FFFFFF;
			line-height: 21px;
			margin-top: 8px;
		}
	}
	.login-form{
		padding: 64rpx;
		.input-wrap{
			display: flex;
			align-items: center;
			width: 622rpx;
			height: 108rpx;
			padding: 0 13px;
			margin-bottom: 24px;
			border-radius: 8px;
			border: 1px solid #D7D9DB;
			.inp-icon{
				width: 44rpx;
				height: 44rpx;
			}
			.divider{
				width: 1px;
				height: 76rpx;
				background-color: #D7D9DB;
				margin-left: 13px;
				margin-right: 23px;
			}
		}
		.toggle-login-type{
			margin: 32px 0 40px;
			text-align: center;
			font-size: 15px;
			color: #F2731E;
		}
		.login-btn{
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
		.login-btn-disabled{
			background-color: #D7D9DB;
		}
		.ver-code-btn{
			color: #F2731E;
			font-size: 12px;
		}
		.ver-code-btn-disabled{
			color: #959BA4;
			font-size: 12px;
		}
	}
</style>
