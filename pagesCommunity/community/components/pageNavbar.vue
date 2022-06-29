<template>
	<view class="page-navbar">
		<u-navbar :is-back="isShowBack" :title="title" :background="backgroundStyle" @leftClick="goBack()" :leftIconSize="leftIconSize"></u-navbar>
	</view>
</template>

<script>
	export default {
		name:"pageNavbar",
		props:{
			title: {
				type: String,
				default: "互动社区"
			},
			backgroundStyle: {
				type: Object,
				default: {
					backgroundColor: '#001f3f',
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				}
			},
			isShowBack: {
				type: Boolean,
				default: true
			},
			
		},
		data() {
			return {
				
			};
		},
		created() {
		},
		computed: {
			leftIconSize: function(){
				return this.isShowBack ? '20px' : 0
			}
		},
		methods: {
			goBack(){
				let pages = getCurrentPages()
				// console.info("pages-->",pages)
				if(pages.length > 1){
					uni.navigateBack()
				}
			},
			// 查询是否刘海屏设备
			hasNotch(){
				if(plus.navigator.hasNotchInScreen()){
					alert('此设备是刘海屏');
				} else {
					alert('此设备不是刘海屏');
				}
			}
		}
	}
</script>

<style lang="scss">
	
</style>
