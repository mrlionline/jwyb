<template>
	<view class="page-header">
		<!-- <view class="ph-status-space"></view>
		<view class="ph-navbar-space"></view> -->
		<view class="ph-content">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="ph-wrap">
				<image class="ph-bg-img" src="/static/apply.png"></image>
				<u-navbar
					:leftIconSize="backArrowSize"
					:title="title"
					leftIconColor="#fff"
					:bgColor="'transparent'"
					:titleStyle="{color: '#fff'}"
					@leftClick="back()"
				></u-navbar>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"page-header",
		props:{
			title: {
				type: String
			},
			showBack: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			};
		},
		created() {
			
		},
		computed: {
			backArrowSize: function(){
				return this.showBack ? '20px' : 0
			}
		},
		methods: {
			back(){
				console.log('111')
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	// .ph-status-space{
	// 	height: var(--status-bar-height);
	// }
	// .ph-navbar-space{
	// 	height: 44px;
	// }
	.ph-content{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: linear-gradient(to right, #2F1AB5,#567DF4);
	}
	.ph-wrap{
		position: relative;
		width: 100%;
		height: 646rpx;
		background: linear-gradient(to right, #2F1AB5,#567DF4);
		.ph-bg-img{
			position: absolute;
			top: 0;
			right: 0;
			max-width: 200px;
			height: 200px;
		}
	}
</style>
