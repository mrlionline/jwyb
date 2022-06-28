<template>
	<view class="home-card">
		<view v-if="config.cols === 1" class="hc-single">
			<view class="single-item" v-for="card in config.contents" @click="goto(card)">
				<image :src="card.img"></image>
				<text class="card-title ellipsis">{{card.label}}</text>
				<text class="card-desc ellipsis">{{card.description}}</text>
			</view>
		</view>
		<view v-if="config.cols === 2" class="hc-double">
			<view class="double-item" v-for="card in config.contents" @click="goto(card)">
				<image :src="card.img"></image>
				<view class="card-title-wrap">
					<text class="card-title ellipsis">{{card.label}}</text>
					<text class="card-desc ellipsis">{{card.description}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: [ 'config' ],
		data(){
			return {
				
			}
		},
		methods: {
			goto(card){
				let url = ''
				if(card.type === 'star'){
					url = '/pagesCapsule/capsule/capsule'
				}else if(card.type === 'signIn'){
					url = '/pagesSignIn/sign-in'
				}
				if(url){
					uni.navigateTo({ url })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-card{
		padding: 32rpx 32rpx 0;
		font-size: 0;
		background-color: #ffffff;
		.hc-single{
			overflow: hidden;
		}
		.card-title{
			line-height: 42rpx;
			font-weight: 500;
			font-size: 30rpx;
			color: #444251;
			margin-top: 16rpx;
		}
		.card-desc{
			line-height: 34rpx;
			font-weight: 400;
			font-size: 24rpx;
			color: #959BA4;
			margin-top: 4rpx;
		}
		.ellipsis{
			display: block;
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.hc-double{
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
			flex-wrap: wrap;
			.double-item{
				width: 300rpx;
				margin-right: 22rpx;
				padding-bottom: 32rpx;
				&:nth-child(2n+0){
					margin-right: 0;
				}
				image{
					width: 300rpx;
					height: 180rpx;
				}
				.card-title-wrap{
					padding-top: 16rpx;
				}
			}
		}
		.single-item{
			margin-bottom: 32rpx;
			image{
				width: 620rpx;
				height: 180rpx;
			}
		}
	}
</style>