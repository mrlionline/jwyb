<template>
	<view class="label-container">
		<PageNavbar title="选择位置"></PageNavbar>
		<!-- 位置列表  -->
		<view class="community-main" :style="{'margin-top': navBarHeight + 'px'}">
			<view class="location-choose">
				<view class="location-choose-item" v-for="(item, index) in locationChooseOption" :key="index" :name="item.value" @click="locationChooseHandle(item)">
					{{ item.name }} 
					<view v-if="item.value === locationChoose" class="icon-label"><u-icon name="checkbox-mark" size="16" color="#333333"></u-icon></view>
				</view>
			</view>
			<view class="user-store-choose">
				<view class="location-choose-item" v-for="(item, index) in userStoreList" :key="index" :name="item" @click="storeChooseHandle(item)">
					{{ item }} 
					<view v-if="item === storeChoose" class="icon-label"><u-icon name="checkbox-mark" size="16" color="#333333"></u-icon></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import locationApis from '@/http/community/location.js'
	import PageNavbar from '../components/pageNavbar.vue'
	export default {
		components: {
			PageNavbar
		},
		data() {
			return {
				background: {
					backgroundColor: '#001f3f',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				/*  选择位置选项 */
				// 基本位置选项数据
				locationChooseOption: [{
						name: '不显示位置',
						value: 0,
						disabled: false
					},
					{
						name: '关联我的门店',
						value: 2,
						disabled: false
					},
					{
						name: '实时位置',
						value: 1,
						disabled: false
					}
				],
				//关联门店
				userStoreList: [],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				locationChoose: 0,
				storeChoose: "",
				/* 导航栏高度设置 */
				navBarHeight: getApp().globalData.statusBarHeight + 48
			}
		},
		created() {
			console.info("你好呀………………………………")
			
		},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			// 选择选项
			locationChooseHandle(item){
				const thisObj = this
				thisObj.locationChoose = item.value
				console.info(item)
				if(item.value === 1){
					thisObj.userStoreList = []
					thisObj.storeChoose = ""
					uni.getLocation({
						type: 'wgs84',
						geocode: true,
						success: function (res) {
							console.info('当前位置：', res);
							console.log('当前位置的经度：', res.longitude);
							console.log('当前位置的纬度：', res.latitude);
							uni.chooseLocation({
								success: function (res) {
									console.log('位置名称：' + res.name);
									console.log('详细地址：' + res.address);
									console.log('纬度：' + res.latitude);
									console.log('经度：' + res.longitude);
									thisObj.goReleasePage(1,"",res.longitude,res.latitude,(res.name || res.address))
								},
								fail: function (res) {
									console.info('获取实时位置失败-->', res)
									thisObj.locationChoose = 0
									// setTimeout(() => {
										
									// }, 10)
								}
							});
						}
					});
				} else if(item.value === 2){
					thisObj.listUserStore()
				} else if(item.value === 0) {
					thisObj.userStoreList = []
					thisObj.storeChoose = ""
					thisObj.goReleasePage(0)
					
				}
			},
			//返回发布动态页面
			goReleasePage(type,store,longitude,latitude,address){
				if(type === 0){
					uni.navigateTo({
						url: `/pagesCommunity/community/release/release?type=${type}`
					})
				} else if(type === 2){
					uni.navigateTo({
						url: `/pagesCommunity/community/release/release?type=${type}&store=${store}`
					})
				} else if(type === 1){
					uni.navigateTo({
						url: `/pagesCommunity/community/release/release?type=${type}&longitude=${longitude}&latitude=${latitude}&address=${address}`
					})
				}
				
			},
			storeChooseHandle(item){
				const thisObj = this
				thisObj.storeChoose = item
				thisObj.goReleasePage(2,item)
				console.info(item)
			},
			/* 请求关联门店的接口 */
			listUserStore(){
				const thisObj = this
				locationApis.getUserStore().then(res => {
					if(res.length > 0){
						thisObj.userStoreList = res
						console.info("关联门店->>",thisObj.userStoreList)
						thisObj.storeChoose = res[0]
						if(res.length === 1){
							thisObj.goReleasePage(2,res[0])
						}
					} else {
						uni.showToast({
							title: "暂无关联门店！",
							icon: 'none'
						})
						console.info("请求关联门店的接口失败！001")
					}
				})
			},
		},
		computed: {
			
		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		// background: #F5F6F7;
	}
	.label-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		background-color: #F5F6F7;
	}
	.community-main {
		width: 100%;
		min-height: 100%;
		margin: 128rpx 0 0 0;
		padding:0;
		.location-choose,
		.user-store-choose {
			width: 100%;
			height: auto;
			overflow: hidden;
			margin: 0 0 16rpx 0;
			padding: 0;
			background-color: #FFFFFF;
			//列表 头部 列表信息
			.location-choose-item {
				width: 100%;
				height: 96rpx;
				overflow: hidden;
				padding: 0 32rpx;
				font-weight: 400;
				font-size: 30rpx;
				color: #222222;
				line-height: 96rpx;
				border-bottom: 2rpx solid #F5F6F7;
				clear: both;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.icon-label {
					width: 32rpx;
					heigth: 32rpx;
				}
				
			}
		}
	}
	/deep/ .u-radio__icon-wrap {
		border: none !important;
	}
	/deep/ .u-radio__icon-wrap--circle {
		background-color: #333333;
	}
	.active-radio /deep/ .u-icon__icon {
		color: #000000 !important;
	}
</style>
