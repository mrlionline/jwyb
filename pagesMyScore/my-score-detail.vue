<template>
	<view class="my-score-detail">
		<page-header title="积分明细" :showBack="true" :isDefault="true"></page-header>
		<view class="bg-gradient"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-score-detail{
		position: relative;
		.bg-gradient{
			width: 750rpx;
			height: 900rpx;
			background-image: linear-gradient(180deg, #271C54 0%, #4E40A0 100%);
		}
	}
</style>