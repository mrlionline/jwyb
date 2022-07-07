<template>
	<view class="home-card">
		<view v-if="config.cols === 1" class="hc-single">
			<view class="single-item" v-for="card in list" @click="goto(card)">
				<image :src="card.img"></image>
				<text class="card-title ellipsis">{{card.label}}</text>
				<text class="card-desc ellipsis" v-if="card.descriptionVisible">{{card.description}}</text>
				<view class="lock" v-if="card.lock">
					<image src="/static/home/lock.png" mode=""></image>
				</view>
			</view>
		</view>
		<view v-if="config.cols === 2" class="hc-double">
			<view class="double-item" v-for="card in list" @click="goto(card)">
				<image :src="card.img"></image>
				<view class="card-title-wrap">
					<text class="card-title ellipsis">{{card.label}}</text>
					<text class="card-desc ellipsis" v-if="card.descriptionVisible">{{card.description}}</text>
				</view>
				<view class="lock" v-if="card.lock">
					<image src="/static/home/lock.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import indexApis from '@/http/apis-index.js'
	export default{
		props: [ 'config' ],
		data(){
			return {
				list: []
			}
		},
		created() {
			console.log('this.con23f2ig', this.config)
			const list = []
			this.config.contents.forEach(item =>{
				const newItem = {
					...item,
					lock: false
				}
				list.push(newItem)
				if(newItem.type === 'lesson'){ 
					indexApis.getCardDetail(newItem.id).then(res =>{
						newItem.lock = !res.permission
					})
				}
			})
			this.list = list
		},
		methods: {
			goto(card){
				if(card.lock){
					return
				}
				let url = ''
				if(card.type === 'star'){
					url = '/pagesCapsule/capsule/capsule'
				}else if(card.type === 'signIn'){
					url = '/pagesSignIn/sign-in'
				}else if(card.type === 'lesson'){
					url = `/pagesStudy/study-video?id=${card.id}`
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
				position: relative;
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
			position: relative;
			margin-bottom: 32rpx;
			image{
				width: 620rpx;
				height: 180rpx;
			}
		}
		.lock{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgba(0, 0, 0, .6);
			image{
				width: 40rpx !important;
				height: 40rpx !important;
			}
		}
	}
</style>