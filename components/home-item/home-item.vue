<template>
	<view class="home-item" @click="goto()">
		<image src="/static/apply.png"></image>
		<text>{{item.name}}</text>
	</view>
</template>

<script>
	export default {
		name:"home-item",
		props:[ 'item' ],
		data() {
			return {
				
			};
		},
		methods: {
			goto(){
				uni.navigateTo({
					url: this.item.url
				})
			}
		}
	}
</script>

<style>
	.home-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 310rpx;
		height: 258rpx;
		border-radius: 8px;
		box-shadow: 0 2px 20px 0 rgba(68,66,81,0.10);
		background: #FFFFFF;
	}
	.home-item image{
		width: 136rpx;
		height: 136rpx;
	}
	.home-item text{
		font-size: 15px;
		color: #444251;
		letter-spacing: 0;
		text-align: center;
		margin-top: 8px;
	}
</style>
