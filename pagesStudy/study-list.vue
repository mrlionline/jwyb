<template>
	<scroll-view
		:scroll-y="true"
		:style="'height: 100vh;'"
		bgColor="#fff"
		@scrolltolower="arriveBottom()"
	>
		<view class="study-list">
			<view class="search">
				<u-search
					placeholder="搜索课程标题"
					v-model="keyword"
					:showAction="false"
					@search="getList()"
				></u-search>
			</view>
			<u-sticky bgColor="#fff">
				<u-tabs :list="tabs" @change="tabChange($event)"></u-tabs>
			</u-sticky>
			<view class="curriculum-box">
				<view class="curriculum-item" v-for="item in curriculum" @click="goDetail(item)">
					<view class="image-box">
						<image :src="item.image"></image>
						<text class="time" v-if="item.time">{{item.time}}</text>
						<view class="lock" v-if="item.lock">
							<image src="/pagesStudy/static/lock.png" mode=""></image>
						</view>
					</view>
					<view class="text-box">
						<text class="title">{{item.title}}</text>
						<text class="learned" v-if="item.learnedPerson && item.learnedPerson>0">{{item.learnedPerson}}人学过</text>
					</view>
				</view>
				<u-loadmore :line="true" :status="moreDataStatus" @loadmore="arriveBottom()" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import studyApi from "@/http/apis-study.js"
	export default{
		data(){
			return {
				keyword: '',
				activeTabId: '',
				tabs: [],
				pageSize: 10,
				pageNum: 1,
				moreDataStatus: 'loadmore',
				curriculum: []
			}
		},
		methods: {
			arriveBottom(){
				this.pageNum++
				this.queryList()
			},
			groupList(){
				studyApi.groupList().then(res =>{
					this.tabs = [
						{
							name: '全部',
							id: ''
						},
						...res.children
					]
				})
			},
			getList(){
				this.moreDataStatus = "loadmore"
				this.curriculum = []
				this.queryList()
			},
			queryList(){
				if(this.moreDataStatus === 'nomore'){
					return;
				}
				const params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					knowledgeId: this.activeTabId,
					courseName: this.keyword
				}
				studyApi.queryList(params).then(res =>{
					const newList = res.dataSet.map(item =>{
						return {
							image: item.mainDiagram,
							title: item.name,
							learnedPerson: item.hits,
							id: item.id,
							lock: !item.permission
						}
					})
					this.curriculum = [...this.curriculum, ...newList]
					if (!res.dataSet || res.dataSet.length === 0 || res.pageTotal === res.pageNum) {
						this.moreDataStatus = 'nomore'
					}else {
						this.moreDataStatus = 'loadmore'
					}
				})
			},
			tabChange(e){
				console.log(e)
				this.moreDataStatus = 'loadmore'
				this.curriculum = []
				this.activeTabId = e.id
				this.queryList()
			},
			goDetail(item){
				if(item.lock){
					return
				}
				uni.navigateTo({
					url: `/pagesStudy/study-video?id=${item.id}`
				})
			}
		},
		created() {
			this.groupList()
			this.queryList()
			// for (let i = 0; i < 100; i++) {
			// this.curriculum.push({
			// 			image: 'http://39.105.146.234:30001/jw/assets/images/wx/default-bg.jpg',
			// 			title: '绝味人在一起入职培训绝味人在一起入职培训',
			// 			learnedPerson: 0,
			// 			type: 'video',
			// 			time: '1:00:00',
			// 			id: Math.random()
			// 		})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.study-list{
		min-height: 100vh;
		background-color: #F3F5F7;
		.search{
			padding: 32rpx;
			background-color: #FFFFFF;
		}
		.curriculum-box{
			display: flex;
			flex-wrap: wrap;
			padding: 24rpx 32rpx;
			font-size: 0;
			.curriculum-item{
				width: 330rpx;
				margin-right: 26rpx;
				margin-bottom: 24rpx;
				box-shadow: 0 2px 10px 0 rgba(11,27,50,0.05);
				border-radius: 4px;
				overflow: hidden;
				&:nth-child(2n){
					margin-right: 0;
				}
				.image-box{
					position: relative;
					image{
						width: 330rpx;
						height: 184rpx;
					}
					.time{
						position: absolute;
						bottom: 10rpx;
						right: 10rpx;
						font-weight: 400;
						font-size: 16rpx;
						color: #FFFFFF;
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
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
				.text-box{
					background-color: #FFFFFF;
					padding: 12rpx 16rpx 16rpx;
					height: 148rpx;
					.title{
						display: inline-block;
						font-weight: 400;
						font-size: 26rpx;
						color: #444251;
						width: 100%;
						height: 72rpx;
						line-height: 36rpx;
						margin-bottom: 16rpx;
						overflow: hidden;
					}
					.learned{
						display: inline-block;
						padding: 0 8rpx;
						background-color: #FBF1E8;
						height: 32rpx;
						line-height: 32rpx;
						font-weight: 400;
						font-size: 20rpx;
						color: #F2731E;
						border-radius: 4px;
					}
				}
			}
		}
	}
</style>