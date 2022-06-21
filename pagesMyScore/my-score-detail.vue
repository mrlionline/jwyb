<template>
	<view class="my-score-detail">
		<page-header title="积分明细" :showBack="true" :isDefault="true"></page-header>
		<view class="bg-gradient"></view>
		<view class="bg-bottom"></view>
		<view class="page-content" :style="{'padding-top': navBarHeight + 'px'}">
			<view class="filter">
				<view @click="showTypeList = true">
					<text>{{type}}</text>
					<u-icon name="arrow-down" color="#ffffff" size="12px"></u-icon>
				</view>
				<view @click="showTimeList = true">
					<text>{{time}}</text>
					<u-icon name="arrow-down" color="#ffffff" size="12px"></u-icon>
				</view>
			</view>
			<scroll-view :scroll-y="true" :style="'height: calc(100vh - ' + navBarHeight + 'px - 82rpx);'">
				<view class="history-item" v-for="item in historyList">
					<view class="head-box">
						<image src="/static/defaultAvatar.png"></image>
					</view>
					<view class="info">
						<view class="title">{{item.title}}</view>
						<view class="time">{{item.time}}</view>
					</view>
					<view class="score">
						<text class="positive" v-if="item.score >= 0">+{{item.score}}</text>
						<text class="negative" v-if="item.score < 0">{{item.score}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-picker
			:show="showTypeList"
			:columns="typeList"
			keyName="label"
			@confirm="typeChange($event)"
			@cancel="showTypeList = false"
		></u-picker>
		<u-picker
			:show="showTimeList"
			:columns="timeList"
			keyName="label"
			@confirm="timeChange($event)"
			@cancel="showTimeList = false"
		></u-picker>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				navBarHeight: getApp().globalData.statusBarHeight + 48,
				typeId: 1,
				showTypeList: false,
				typeList: [
					[
						{
							label: '全部类型',
							id: 1
						},
						{
							label: '类型一',
							id: 2
						},{
							label: '类型二',
							id: 3
						}
					]
				],
				timeId: 1,
				showTimeList: false,
				timeList: [
					[
						{
							label: '最近一周',
							id: 1
						},{
							label: '最近一月',
							id: 2
						},{
							label: '最近一年',
							id: 3
						}
					]
				],
				historyList: [
					{
						title: '每日签到',
						time: '2022/01/01 12:00',
						score: 20
					},
					{
						title: '商品兑换',
						time: '2022/01/01 12:00',
						score: -2000
					}
				]
			}
		},
		methods: {
			typeChange(e){
				console.log(e)
				this.typeId = e.value[0].id
				this.showTypeList = false
			},
			timeChange(e){
				console.log(e)
				this.timeId = e.value[0].id
				this.showTimeList = false
			}
		},
		computed: {
			type: function(){
				return this.typeList[0].find(item => item.id === this.typeId).label
			},
			time: function(){
				return this.timeList[0].find(item => item.id === this.timeId).label
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
		.bg-bottom{
			width: 750rpx;
			height: calc(100vh - 900rpx);
			background-color: #4E40A0;
		}
		.page-content{
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			display: flex;
			flex-direction: column;
			width: 750rpx;
			height: 100vh;
			.filter{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 108rpx;
				width: 100%;
				height: 42rpx;
				margin-bottom: 40rpx;
				&>view{
					display: flex;
					flex-direction: row;
					align-items: center;
					height: 42rpx;
					font-weight: 600;
					font-size: 30rpx;
					color: #FFFFFF;
					text{
						display: inline-block;
						margin-right: 5px;
					}
				}
			}
			.history-item{
				position: relative;
				display: flex;
				align-items: center;
				width: 686rpx;
				height: 120rpx;
				background: #554994;
				border-radius: 8px;
				margin: 0 auto 16rpx;
				.head-box{
					width: 72rpx;
					height: 72rpx;
					margin:0 32rpx;
					background-color: #FFFFFF;
					border-radius: 100%;
					overflow: hidden;
					padding: 12rpx;
					image{
						width: 48rpx;
						height: 48rpx;
					}
				}
				.info{
					.title{
						line-height: 42rpx;
						font-weight: 500;
						font-size: 30rpx;
						color: #FFFFFF;
					}
					.time{
						line-height: 34rpx;
						font-weight: 400;
						font-size: 24rpx;
						color: #FFFFFF;
						margin-top: 8rpx;
					}
				}
				.score{
					position: absolute;
					right: 32rpx;
					top: 50%;
					transform: translateY(-50%);
					font-weight: 500;
					font-size: 42rpx;
					.positive{
						color: #FFFFFF;
					}
					.negative{
						color: #FFD940;
					}
				}
			}
		}
	}
</style>