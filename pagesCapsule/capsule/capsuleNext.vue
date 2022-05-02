<template>
	<view class="next">
		<image class="icon" src="/pagesCapsule/static/capsule/next-icon.png"></image>
		<image class="down-arrow down-arrow1" src="/pagesCapsule/static/capsule/down-arrow.png"></image>
		<image class="down-arrow down-arrow2" src="/pagesCapsule/static/capsule/down-arrow.png"></image>
	</view>
</template>

<script>
</script>

<style lang="scss">
	@keyframes oneArrow
	{
		0%{
			opacity: 0;
			top: -19rpx;
		}
		50%{
			opacity: 1;
			top: 0;
		}
		100%{
			opacity: 0;
			top: 19rpx;
		}
	}
	.next{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.icon{
			width: 72rpx;
			height: 72rpx;
		}
		.down-arrow{
			position: relative;
			top: -19rpx;
			width: 35rpx;
			height: 19rpx;
			opacity: 0;
		}
		.down-arrow1{
			animation: oneArrow 2s linear infinite;
		}
		.down-arrow2{
			margin-top: -19rpx;
			animation: oneArrow 2s 1s linear infinite;
		}
	}
</style>