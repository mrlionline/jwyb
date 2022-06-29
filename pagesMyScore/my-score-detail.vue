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
			<scroll-view
				:scroll-y="true"
				:style="'height: calc(100vh - ' + navBarHeight + 'px - 82rpx);'"
				@scrolltolower="arriveBottom()"
			>
				<view class="history-item" v-for="item in historyList">
					<view class="head-box">
						<image :src="item.icon"></image>
					</view>
					<view class="info">
						<view class="title">{{item.typeName}}</view>
						<view class="time">{{item.ctime}}</view>
					</view>
					<view class="score">
						<text class="positive" v-if="item.integralScore >= 0">+{{item.integralScore}}</text>
						<text class="negative" v-if="item.integralScore < 0">{{item.integralScore}}</text>
					</view>
				</view>
				<u-loadmore :line="true" :status="moreDataStatus" @loadmore="arriveBottom()" />
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
	import myApis from '../http/apis-my.js'
	export default {
		data(){
			return {
				navBarHeight: getApp().globalData.statusBarHeight + 48,
				typeId: '',
				showTypeList: false,
				typeList: [],
				timeId: '',
				showTimeList: false,
				timeList: [],
				historyList: [],
				pageNum: 1,
				pageSize: 20,
				moreDataStatus: 'loadmore'
			}
		},
		methods: {
			arriveBottom(){
				this.pageNum++
				this.queryList()
			},
			typeChange(e){
				this.typeId = e.value[0].id
				this.showTypeList = false
				this.moreDataStatus = 'loadmore'
				this.historyList = []
				this.pageNum = 1
				this.queryList()
			},
			timeChange(e){
				this.timeId = e.value[0].id
				this.showTimeList = false
				this.moreDataStatus = 'loadmore'
				this.historyList = []
				this.pageNum = 1
				this.queryList()
			},
			queryList(){
				if(this.moreDataStatus === 'nomore'){
					return;
				}
				const params = {
					type: this.typeId,
					integralTimeType: this.timeId,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				this.moreDataStatus = 'loading'
				myApis.queryList(params).then(res =>{
					const newList = res.dataSet.map(item =>{
						return {
							...item,
							icon: `/pagesMyScore/static/score-type${item.type}.png`
						}
					})
					this.historyList = [...this.historyList, ...newList]
					if (!res.dataSet || res.dataSet.length === 0 || res.pageTotal === res.pageNum) {
						this.moreDataStatus = 'nomore'
					}else {
						this.moreDataStatus = 'loadmore'
					}
					console.log('this.historyList', this.historyList)
				})
			},
			getIntegralType(){
				myApis.getIntegralType().then(res =>{
					const resType = res.map(item =>{
						return {
							label: item.name,
							id: item.memo
						}
					})
					resType.unshift({
						label: '全部类型',
						id: ''
					})
					this.typeList.push(resType)
					console.log('this.typeList', this.typeList)
				})
			},
			getIntegralTimeType(){
				return myApis.getIntegralTimeType().then(res =>{
					const resTime = res.map(item =>{
						return {
							label: item.name,
							id: item.memo
						}
					})
					this.timeId = resTime[0].id
					this.timeList.push(resTime)
				})
			}
		},
		computed: {
			type: function(){
				return this.typeList[0] && this.typeList[0].find(item => item.id === this.typeId).label
			},
			time: function(){
				return this.timeList[0] && this.timeList[0].find(item => item.id === this.timeId).label
			}
		},
		created() {
			this.getIntegralType()
			this.getIntegralTimeType().then(() =>{
				this.queryList()
			})
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
