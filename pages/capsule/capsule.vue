<template>
	<view>
		<u-navbar
			leftIconSize="20px"
			title="星空胶囊"
			leftIconColor="#fff"
			:bgColor="'transparent'"
			:titleStyle="{color: '#fff'}"
			@leftClick="back()"
		></u-navbar>
		<view style="height: 100vh;">
			<swiper
				style="height: 100%;"
				:indicator-dots="false"
				:autoplay="false"
				:vertical="true"
				:current="current"
			>
				<swiper-item :style="{background: pageItem.background}" v-for="pageItem in pageList" style="">
					<view class="swiper-item uni-bg-red">
						<view>1111</view>
						<view>1111</view>
						<view>1111</view>
						<view>1111</view>
						<view>1111</view>
						<u-button type="primary" text="确定" @click="current++"></u-button>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				pageList: [
					{
						name:'a',
						background: 'red'
					},
					{
						name: 'b',
						background: 'yellow'
					},{
						name: 'c',
						background: 'blue'
					}
				]
			}
		},
		methods: {
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
