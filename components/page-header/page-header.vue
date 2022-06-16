<template>
	<view class="page-header">
		<!-- <view class="ph-status-space"></view>
		<view class="ph-navbar-space"></view> -->
		<view class="ph-content" v-if="!isDefault">
			<view class="ph-wrap">
				<image class="ph-bg-img" src="/static/bg.png"></image>
				<u-navbar
					:leftIconSize="backArrowSize"
					:title="title"
					leftIconColor="#fff"
					:bgColor="'transparent'"
					:titleStyle="{color: titleColor}"
					@leftClick="back()"
				></u-navbar>
			</view>
		</view>
		<view v-if="isDefault">
			<u-navbar
				:leftIconSize="backArrowSize"
				:title="title"
				leftIconColor="#fff"
				:bgColor="'transparent'"
				:titleStyle="{color: titleColor}"
				@leftClick="back()"
			></u-navbar>
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
			},
			isDefault: {
				type: Boolean,
				default: false
			},
			titleColor: {
				type: String,
				default: '#fff'
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
	.ph-wrap{
		position: relative;
		width: 750rpx;
		height: 640rpx;
		background: #2F1AB5;
		.ph-bg-img{
			position: absolute;
			top: 0;
			left: 0;
			right:0;
			width: 750rpx;
			height: 640rpx;
		}
	}
</style>
