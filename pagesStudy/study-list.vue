<template>
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
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				keyword: '',
				activeTabId: '',
				tabs: [
					{name: '全部', id: ''},
					{name: '全部2', id: '2'},
					{name: '全部3', id: '3'},
					{name: '全部4', id: '4'},
					{name: '全部5', id: '5'},
					{name: '全部6', id: '6'},
					{name: '全部7', id: '7'},
					{name: '全部8', id: '8'},
					{name: '全部9', id: '9'},
					{name: '全部10', id: '10'},
					{name: '全部11', id: '11'},
					{name: '全部12', id: '12'},
					{name: '全部13', id: '13'}
				],
				curriculum: [
					{
						image: 'http://39.105.146.234:30001/jw/assets/images/wx/default-bg.jpg',
						title: '绝味人在一起入职培训绝味人在一起入职培训绝味人在一起入职培训绝味人在一起入职培训绝味人在一起入职培训绝味人在一起入职培训',
						learnedPerson: 1234,
						type: 'video',
						time: '1:00:00',
						id: Math.random(),
						lock: true
					},
					{
						image: 'http://39.105.146.234:30001/jw/assets/images/wx/default-bg.jpg',
						title: '绝味人在一起入职培训绝味人在一起入职培训',
						learnedPerson: 1234,
						type: 'pdf',
						id: Math.random()
					},
					{
						image: 'http://39.105.146.234:30001/jw/assets/images/wx/default-bg.jpg',
						title: '绝味人在一起入职培训绝味人在一起入职培训',
						learnedPerson: 0,
						type: 'video',
						time: '1:00:00',
						id: Math.random()
					}
				]
			}
		},
		methods: {
			getList(){
				
			},
			tabChange(e){
				console.log(e)
				this.activeTabId = e.id
				this.getList()
			},
			goDetail(item){
				if(item.lock){
					return
				}
				if(item.type === 'video'){
					uni.navigateTo({
						url: `/pagesStudy/study-video?id=${item.id}`
					})
				}
			}
		},
		created() {
			for (let i = 0; i < 100; i++) {
			this.curriculum.push({
						image: 'http://39.105.146.234:30001/jw/assets/images/wx/default-bg.jpg',
						title: '绝味人在一起入职培训绝味人在一起入职培训',
						learnedPerson: 0,
						type: 'video',
						time: '1:00:00',
						id: Math.random()
					})
			}
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
						height: 72rpx;
						line-height: 36rpx;
						margin-bottom: 16rpx;
						overflow: hidden;
					}
					.learned{
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