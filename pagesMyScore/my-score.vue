<template>
	<scroll-view
		:scroll-y="true"
		class="my-scroe"
		@scrolltolower="arriveBottom()"
	>
		<page-header title="我的积分" :showBack="true" :isDefault="true"></page-header>
		<view class="head">
			<image class="bg" src="/pagesMyScore/static/bg.png"></image>
			<view class="my-score">
				<text class="score">{{score}}</text>
				<text class="desc">当前积分</text>
			</view>
			<image class="to-detail" @click="goto('/pagesMyScore/my-score-detail')" src="/pagesMyScore/static/score-detail.png"></image>
			<view class="rank">
				<text>你的当前排名是第 {{rank}} 位</text>
			</view>
		</view>
		<view class="list-wrap">
			<image class="top-list" src="/pagesMyScore/static/top-list.png"></image>
			<view class="list-content">
				<view class="list-item" v-for="(item, index) in list" :class="'list-item' + (index+1)">
					<image class="level-icon level" v-if="index < 3" :src="'/pagesMyScore/static/top' + (index+1) + '.png'"></image>
					<text class="level level-text" v-if="index >=3">{{index+1}}</text>
					<image class="header" :src="item.avatar || '/static/defaultAvatar.png'"></image>
					<text class="name">{{item.userName}}</text>
					<view class="score">{{item.totalIntegral}}积分</view>
				</view>
				<u-loadmore :line="true" :status="moreDataStatus" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import myApis from '../http/apis-my.js'
	export default{
		data(){
			return {
				navBarHeight: getApp().globalData.statusBarHeight + 48,
				score: '', 
				rank: '',
				pageNum: 1,
				pageSize: 10,
				list: [],
				moreDataStatus: 'loadmore'
			}
		},
		methods: {
			goto(url){
				uni.navigateTo({
					url: url
				});
			},
			myIntegralTop(){
				myApis.myIntegralTop().then(res =>{
					this.score = res ? res.totalIntegral : 0
					this.rank = res ? res.rank : '-'
				})
			},
			arriveBottom(){
				this.pageNum++
				this.integralTop()
			},
			integralTop(){
				if(this.moreDataStatus === 'nomore'){
					return;
				}
				const params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				this.moreDataStatus = 'loading'
				myApis.integralTop(params).then(res =>{
					this.list = [...this.list, ...res.dataSet]
					if (!res.dataSet || res.dataSet.length === 0 || res.pageTotal === res.pageNum) {
						this.moreDataStatus = 'nomore'
					}else {
						this.moreDataStatus = 'loadmore'
					}
				})
			}
		},
		created() {
			this.myIntegralTop()
			this.integralTop()
		}
	}
</script>

<style lang="scss" scoped>
	.my-scroe{
		height: 100vh;
		.head{
			position: relative;
			width: 100%;
			font-size: 0;
			.bg{
				width: 750rpx;
				height: 544rpx;
			}
			.my-score{
				position: absolute;
				left: 64rpx;
				bottom: 162rpx;
				display: flex;
				flex-direction: column;
				.score{
					line-height: 50px;
					font-size: 72rpx;
					color: #FFFFFF;
				}
				.desc{
					height: 21px;
					font-weight: 400;
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}
			.to-detail{
				position: absolute;
				right: 32rpx;
				bottom: 162rpx;
				width: 178rpx;
				height: 56rpx;
			}
			.rank{
				position: absolute;
				bottom: 0;
				left: 32rpx;
				right: 32rpx;
				width: 686rpx;
				height: 104rpx;
				line-height: 104rpx;
				background-image: linear-gradient(-45deg, #7733D9 0%, #86A4FF 100%);
				border: 2px solid rgba(255,245,224,0.60);
				box-shadow: 0 2px 10px 0 rgba(11,27,50,0.05);
				border-radius: 8px;
				padding-left: 78rpx;
				text{
					font-weight: 600;
					font-size: 30rpx;
					color: #FFF3DB;
					text-shadow: 0 2px 4px #7943DE;
				}
			}
		}
		.list-wrap{
			position: relative;
			background: #4D3F9E;
			overflow: hidden;
			.top-list{
				position: absolute;
				left: 50%;
				top: 24rpx;
				transform: translateX(-50%);
				width: 642rpx;
				height: 144rpx;
			}
			.list-content{
				width: 686rpx;
				min-height: calc(100vh - 544rpx - 80rpx);
				background: #231960;
				border: 2px solid #567DF4;
				box-shadow: 0 2px 10px 0 rgba(11,27,50,0.05);
				border-radius: 8px;
				margin: 40rpx auto;
				padding-top: 116rpx;
				.list-item{
					position: relative;
					display: flex;
					align-items: center;
					width: 622rpx;
					height: 112rpx;
					margin: 0 auto 16rpx;
					border-radius: 8px;
					padding-left: 100rpx;
					&.list-item1{
						background-color: #577DF4;
					}
					&.list-item2{
						background-color: #4355B8;
					}
					&.list-item3{
						background-color: #2D2E7D;
					}
					.level{
						position: absolute;
						left: 50rpx;
						top: 50%;
						transform: translate(-50%, -50%);
					}
					.level-icon{
						width: 48rpx;
						height: 48rpx;
					}
					.level-text{
						font-weight: 500;
						font-size: 26rpx;
						color: #FFFFFF;
					}
					.header{
						width: 80rpx;
						height: 80rpx;
						border: 2px solid #fff;
						border-radius: 100%;
						margin-right: 28rpx;
					}
					.name{
						font-weight: 500;
						font-size: 26rpx;
						color: #FFFFFF;
					}
					.score{
						position: absolute;
						right: 24rpx;
						top: 50%;
						transform: translateY(-50%);
						font-weight: 500;
						font-size: 26rpx;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>