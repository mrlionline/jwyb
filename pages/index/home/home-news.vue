<template>
	<view class="home-news">
		<home-section-header :config="headerConfig" @click="headClick()"></home-section-header>
		<view class="hn-item" v-for="news in list" v-if="news.pubStatus === 1" @click="goto(news.id)">
			<view class="item-info" :style="{'width': news.img ? 'calc(100% - 136rpx)' : '100%'}">
				<view class="title">{{news.title}}</view>
				<view class="desc">
					<text>{{news.ctime}}</text>
					<text v-if="news.informationTypeName">{{news.informationTypeName}}</text>
					<text>{{news.authorName}}</text>
				</view>
			</view>
			<image class="item-head" v-if="news.fileType !== 'mp4' && news.fileUrl" :src="news.fileUrl"></image>
			<video class="item-video" v-if="news.fileType === 'mp4' && news.fileUrl" @click.stop="" :src="news.fileUrl" @error="videoErrorCallback" controls></video>
		</view>
	</view>
</template>

<script>
	import indexApis from "@/http/apis-index.js"
	export default{
		props: [
			"config"
		],
		data(){
			return {
				headerConfig: {
					icon: '../../static/home/news-head.png',
					title: this.config.title
				},
				list: []
			}
		},
		methods: {
			goto(id){
				uni.navigateTo({
					url: `pages/information/detail?id=${id}`
				});
			},
			headClick(){
				uni.$emit('tabChange', '资讯')
			}
		},
		created() {
			this.config.contents.forEach((item, index) =>{
				item = {
					id: item.id,
					title: '',
					ctime: '',
					informationTypeName: '',
					authorName: '',
					fileType: '',
					fileUrl: ''
				}
				this.list.push(item)
				indexApis.find({
					id: item.id,
					enter: 'web'
				}).then(res =>{
					this.list[index].title = res.title
					this.list[index].ctime = res.ctime
					this.list[index].informationTypeName = res.informationTypeName
					this.list[index].authorName = res.authorName
					this.list[index].pubStatus = res.pubStatus
					if(res.informationFileList && res.informationFileList.length){
						const file = res.informationFileList[0]
						this.list[index].fileType = file.fileType
						this.list[index].fileUrl = file.fileUrl
					}
					
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	.home-news{
		background-color: #ffffff;
		.hn-item{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			padding: 32rpx;
			.title{
				line-height: 48rpx;
				font-weight: 600;
				font-size: 17px;
				color: #444251;
				margin-bottom: 16rpx;
			}
			.desc{
				line-height: 34rpx;
				text{
					font-weight: 400;
					font-size: 12px;
					color: #959BA4;
					margin-right: 20rpx;
				}
			}
			.item-head,
			.item-video{
				width: 136rpx;
				height: 112rpx;
			}
		}
	}
</style>