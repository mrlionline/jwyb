<template>
	<div class="study-video">
		<view class="active-video-box">
			<video class="active-video" :src="src"></video>
			<view class="mask">
				<text v-for="item in 100">李明华</text>
			</view>
		</view>
		<div class="content">
			<view class="title">绝味人在一起入职培训绝味人在一起入职培训</view>
			<text class="learned">1234人学过</text>
			<view class="catalogue-box">
				<view class="title">
					<text style="font-weight: 600;font-size: 15px;color: #444251;">课程目录</text>
					<text style="margin-left: 8rpx;color: #959BA4;font-weight: 400;">共5个课件</text>
				</view>
				<scroll-view
					:scroll-y="true"
					:style="'height: calc(100vh - 688rpx);'"
				>
					<view class="catalogue-item" v-for="item in 10">
						<video
							class="video"
							:src="src"
							:show-center-play-btn="false"
							:controls="false"
						></video>
						<text class="name">第一节 时间的价值</text>
					</view>
				</scroll-view>
			</view>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4'
			}
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			this.getDetail(option.id)
		},
		methods: {
			getDetail(id){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.study-video{
		width: 100%;
		height: 100vh;
		background-color: #fff;
		.active-video-box{
			position: relative;
			width: 100%;
			height: 422rpx;
			.active-video{
				width: 100%;
				height: 422rpx;
			}
			.mask{
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				pointer-events: none;
				word-wrap: break-word;
				overflow: hidden;
				text{
					display: inline-block;
					margin: 10rpx 20rpx;
					color: #fff;
					transform: rotate(-30deg);
					opacity: .3;
				}
			}
		}
		.content{
			padding: 32rpx;
			.title{
				font-weight: 600;
				font-size: 34rpx;
				line-height: 48rpx;
				color: #444251;
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
			.catalogue-box{
				margin-top: 64rpx;
				.title{
					line-height: 42rpx;
					margin-bottom: 32rpx;
				}
				.catalogue-item{
					display: flex;
					align-items: center;
					height: 140rpx;
					margin-bottom: 32rpx;
					video{
						width: 248rpx;
						height: 140rpx;
					}
					.name{
						flex:2;
						padding: 0 32rpx;
						font-weight: 500;
						font-size: 26rpx;
						color: #444251;
					}
				}
			}
		}
	}
</style>