<template>
	<view style="width: 310rpx;;">
		<view class="home-item" @click="goto()">
			<image :src="item.icon"></image>
			<text>{{item.label}}</text>
		</view>
		<!-- <web-view v-if="linkType !== 'wx'" :src="link"></web-view> -->
	</view>
</template>

<script>
	export default {
		name:"home-item",
		props:[ 'item' ],
		data() {
			return {
				type: '',
				link: ''
			};
		},
		methods: {
			goto(){
				if(item.linkType === 'wx'){
					uni.navigateTo({
						url: this.item.link
					})
				}else {
					this.link = item.link
				}
				this.type = item.linkType
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
		border-radius: 8px;
		box-shadow: 0 2px 20px 0 rgba(68,66,81,0.10);
		background: #FFFFFF;
	}
	.home-item image{
		width: 176rpx;
		height: 176rpx;
	}
	.home-item text{
		font-size: 15px;
		color: #444251;
		letter-spacing: 0;
		text-align: center;
		line-height: 1;
		padding-bottom: 56rpx;
		font-weight: bold;
	}
</style>
