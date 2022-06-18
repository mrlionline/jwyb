<template>
	<view class="label-container">
		<PageNavbar title="发动态"></PageNavbar>
		<!-- 社区列表  -->
		<view class="community-main">
			<view class="community-list" v-if="Object.keys(communityList).length>0 ">
				<!-- 动态内容 -->
				<view class="community-info">
					<image class="user-photo" :src="communityList.authorAvatar || '/pagesCommunity/static/community/tabBarMyActive.png'" mode="aspectFit"></image>
					<view class="user-info">
						<view class="user-name">{{ communityList.authorName || '佚名' }}</view>
						<view class="timer">{{ communityList.releaseTime || communityList.mtime }}</view>
					</view>
					<view class="status">{{ '·' + communityList.approveTypeName }}</view>
					<u-icon class="more-dot" name="more-dot-fill" color="#000000" size="24" @click="openCommunityDelState"></u-icon>
				</view>
				<!-- 动态图片视频 -->
				<view class="community-content">
					<view class="community-text">{{ communityList.content }}</view>
					<view class="community-media">
						<u-grid :col="3" v-if="communityList.fileList.length">
							<u-grid-item v-for="(itm, idx) in communityList.fileList" :key="idx">
								<image class="grid-img" :src="itm.fileUrl" mode="aspectFit"></image>
							</u-grid-item>
						</u-grid>
						
					</view>
				</view>
				<!-- 动态评论和点赞数 -->
				<view class="community-operate">
					 <view class="operate-chat">
						 <u-icon name="chat" color="#959BA4" size="28"></u-icon>
						 <text>{{ communityList.commentNum }}</text>
					 </view>
					 <view class="operate-thumb">
						<u-icon name="thumb-up" color="#959BA4" size="28"></u-icon>
						<view>{{ communityList.hbNum }}</view>
					 </view>
				</view>
			</view>
			<!-- 测试  -->
			<view class="community-list">
				<view class="community-info">
					<view class="user-info">
						<view class="user-name">曾经沧海</view>
						<view class="timer">刚刚</view>
					</view>
					<view class="status">·待审核</view>
					<u-icon class="more-dot" name="more-dot-fill" color="#000000" size="24" @click="openCommunityDelState"></u-icon>
				</view>
				<view class="community-content">
					<view class="community-text">星空胶囊活动有效促进了大家互帮互助团结一致，让我们一同努力，创造更好的绝味大家庭！</view>
					<view class="community-media">
						<u-grid :col="3">
							<u-grid-item>
								<image class="grid-img" src="/pagesCommunity/static/community/tabBarMyActive.png" mode="aspectFit"></image>
							</u-grid-item>
							<u-grid-item>
								<image class="grid-img" src="/pagesCommunity/static/community/tabBarMyActive.png" mode="aspectFit"></image>
							</u-grid-item>
							<u-grid-item>
								<image class="grid-img" src="/pagesCommunity/static/community/tabBarMyActive.png" mode="aspectFit"></image>
							</u-grid-item>
							<u-grid-item>
								<image class="grid-img" src="/pagesCommunity/static/community/tabBarMyActive.png" mode="aspectFit"></image>
							</u-grid-item>
							<u-grid-item>
								<image class="grid-img" src="/pagesCommunity/static/community/tabBarMyActive.png" mode="aspectFit"></image>
							</u-grid-item>
							<u-grid-item>
								<image class="grid-img" src="/pagesCommunity/static/community/tabBarMyActive.png" mode="aspectFit"></image>
							</u-grid-item>
						</u-grid>
						
					</view>
				</view>
				<view class="community-operate">
					 <view class="operate-chat" @click="operateChat(1)">
						 <u-icon name="chat" color="#959BA4" size="28"></u-icon>
						 <text>999</text>
					 </view>
					 <view class="operate-thumb">
						<u-icon name="thumb-up" color="#959BA4" size="28"></u-icon>
						<view>123</view>
					 </view>
				</view>
				<!--  评论模块  -->
				<view class="community-comments">
					 <view class="comments-user">
					 	<view class="user-name">曾经沧海</view>
					 </view>
					 <view class="comments-content">大家一起加油！</view>
					 <view class="comments-reply">
						<view class="reply-item">
							<u-read-more ref="uReadMore" showHeight="50" textIndent="0" closeText="全文" :shadowStyle="shadowStyle">
								<u-parse :content="content" @load="load"></u-parse>
							</u-read-more>
						</view>
						<view class="reply-item">
							<text class="commenter-name">李振</text>
							<text class="with-symbol">：</text>
							<text class="reply-content">加油，加油，加油！</text>
						</view>
						<view class="reply-item">
							<text class="commenter-name">李振</text>
							<text class="with-symbol">：</text>
							<text class="reply-content">加油，加油，加油！</text>
						</view>
						<view class="reply-item">
							<u-read-more ref="uReadMore" :toggle="true" showHeight="50" textIndent="0">
								<u-parse :content="content" @load="load"></u-parse>
							</u-read-more>
						</view>
					 </view>
				</view>
			</view>
		</view>
		<!--  删除动态相关  -->
		<u-popup :show="showCommunityDel" @close="closeCommunityDel" @open="openCommunityDel" :round="16">
			<!--  删除选项  -->
			<view class="community-del" v-if="communityDelIco">
				<view class="community-del-button" @click="communityDelHandle">删除动态</view>
				<button class="community-del-cancel" type="default" @click="communityDelCancel">取消</button>
			</view>
			<!--  确认删除选项  -->
			<view class="confirm-del" v-if="confirmDelIco">
				<view class="confirm-del-text">删除评论后，评论下所有的回复都会被删除</view>
				<view class="community-del-button" @click="confirmDelHandle">确定删除</view>
				<button class="community-del-cancel" type="default" @click="communityDelCancel">取消</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import commentsApis from '@/http/community/comments.js'
	import PageNavbar from '../components/pageNavbar.vue'
	export default {
		components: {
			PageNavbar
		},
		data() {
			return {
				formData: {
					id: null,
					pageNum: 1,
					pageSize: 10,
				},
				//社区动态列表
				communityList: {},
				background: {
					backgroundColor: '#001f3f',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				shadowStyle: {
					// #ifndef APP-NVUE
					backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
					// #endif
					// #ifdef APP-NVUE
					// nvue上不支持设置复杂的backgroundImage属性
					backgroundImage: "linear-gradient(to top, #fff, rgba(255, 255, 255, 0.5))",
					backgroundImage: none
					// #endif
					paddingTop: "0px",
					marginTop: "0px",
				},
				hasNext: 0,
				showCommunityDel: false,
				communityDelIco: false,
				confirmDelIco: false,
				content: "<text class='commenter-name'>李振</text><text class='with-text'>回复</text><text class='responder-name'>李雷</text><text></text><text class='with-symbol'>：</text><text class='reply-content'>山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？</text>",
			}
		},
		onLoad(option) {
			if (option.id) {
				this.formData.id = option.id || 1
				this.listPageOfCommunit()
				this.listPageOfInteraction()
			} else {
				uni.showToast({
					title: "页面展示异常！",
					icon: 'none'
				})
			}
			
		},
		methods: {
			listPageOfCommunit(){
				const thisObj = this
				commentsApis.getUsersByStarId(this.formData.id).then(res => {
					if(Object.keys(res).length > 1){
						thisObj.communityList = res
					} else {
						console.info("获取社区列表接口失败！001")
					}
				})
			},
			listPageOfInteraction(){
				const thisObj = this
				commentsApis.queryInteractionList(this.formData).then(res => {
					if(Object.keys(res).length > 1){
						thisObj.communityList = res
					} else {
						console.info("获取社区列表接口失败！001")
					}
				})
			},
			openCommunityDel() {
			  // console.log('open');
			},
			closeCommunityDel() {
			  this.showCommunityDel = false
			  this.communityDelIco = false
			  this.confirmDelIco = false
			  // console.log('close');
			},
			openCommunityDelState(){
				this.showCommunityDel = true
				this.communityDelIco = true
			},
			communityDelCancel(){
				this.showCommunityDel = false
				this.communityDelIco = false
				this.confirmDelIco = false
			},
			/* 删除动态操作 */
			communityDelHandle(){
				this.communityDelIco = false
				this.confirmDelIco = true
			},
			confirmDelHandle(){
				this.communityDelCancel()
				this.queryDelCommunit()
			},
			/* 删除动态的请求接口 */
			queryDelCommunit(){
				const thisObj = this
				commentsApis.apiDelCommunit(this.formData.id).then(res => {
					console.info("删除动态的请求接口  res-->",res)
					if(Object.keys(res).length > 1){
						thisObj.communityList = res
					} else {
						console.info("删除动态的请求接口！001")
					}
				})
			},
			load() {
				this.$refs.uReadMore.init();
			}
			
		},
		computed: {
			
		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
	}
	.label-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.community-main {
		width: 100%;
		height: auto;
		margin: 128rpx 0 0 0;
		padding:0;
		background-color: #F5F6F7;
		.community-list {
			width: 100%;
			height: auto;
			margin: 0 0 16rpx 0;
			padding: 0;
			background-color: #FFFFFF;
			//列表 头部 列表信息
			.community-info {
				width: 686rpx;
				height: 136rpx;
				overflow: hidden;
				margin: 0 auto 16rpx auto;
				padding: 40rpx 0 0 0;
				clear: both;
				.user-photo {
					width: 96rpx;
					height: 96rpx;
					overflow: hidden;
					border-radius: 50%;
					float: left;
					// box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.4);
				}
				.user-info {
					width: 360rpx;
					height: 96rpx;
					overflow: hidden;
					float: left;
					padding: 0 0 0 16rpx;
					.user-name {
						height: 48rpx;
						font-weight: 600;
						font-size: 30rpx;
						color: #222222;
						line-height: 48rpx;
						
					}
					.timer {
						height: 48rpx;
						line-height: 48rpx;
						font-weight: 400;
						font-size: 28rpx;
						color: #888888;
					}
				}
				.status{
					width: auto;
					height: 48rpx;
					margin: 0 32rpx 0 0;
					padding: 0 20rpx;
					float: left;
					background: rgba(242,115,30, 0.1);
					border-radius: 24rpx;
					font-weight: 400;
					font-size: 24rpx;
					line-height: 48rpx;
					text-align: center;
					color: #F2731E;
				}
				.more-dot {
				}
			}
			//列表主体内容
			.community-content{
				width: auto;
				padding: 0 32rpx 0 144rpx;
				.community-text {
					width: 100%;
					max-height: 144rpx;
					overflow: hidden;
					margin: 0 0 32rpx 0;
					padding: 0;
					font-weight: 400;
					line-height: 48rpx;
					font-size: 30rpx;
					color: #222222;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
				.community-media {
					width: 100%;
					height: auto;
					overflow: hidden;
					margin: 0 0 16rpx 0;
					.u-grid-item {
						margin: 0 0 8rpx 0;
					}
					.grid-img {
						width: 156rpx;
						height: 156rpx;
					}
				}
			}
			//列表操作项
			.community-operate{
				width: auto;
				height: auto;
				overflow: hidden;
				padding: 0 32rpx 0 144rpx;
				border-top: 2rpx solid #EEEEEE;
				.operate-chat,
				.operate-thumb{
					width: 50%;
					height: 80rpx;
					float: left;
					color: #959BA4;
					font-weight: 400;
					font-size: 12px;
					line-height: 80rpx;
					display: flex;
					align-items: center;
					.u-icon {
						
					}
					text {
						float: left;
					}
					
				}
				.operate-thumb {
					padding: 0 0 0 80rpx;
					
				}
			}
			.community-comments {
				width: 686rpx;
				height: auto;
				overflow: hidden;
				margin: 32rpx auto 32rpx auto;
				padding: 0rpx 0 0 0;
				border-bottom: 2rpx solid #EEEEEE;
				clear: both;
				.comments-user {
					width: 100%;
					height: 56rpx;
					overflow: hidden;
					margin: 0 0 4rpx 0;
					float: left;
					.user-photo {
						width: 56rpx;
						height: 56rpx;
						overflow: hidden;
						border-radius: 50%;
						float: left;
						// box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.4);
					}
					.user-name {
						height: 56rpx;
						padding: 0 0 0 16rpx;
						font-weight: 600;
						font-size: 24rpx;
						color: #444251;
						line-height: 56rpx;
						float: left;
						
					}
				}
				.comments-content {
					width: 614rpx;
					max-height: 352rpx;
					overflow: hidden;
					margin: 0 0 32rpx 0;
					padding: 0 0 0 72rpx;
					font-weight: 400;
					line-height: 44rpx;
					font-size: 30rpx;
					color: #222222;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 8;
					-webkit-box-orient: vertical;
				}
				.comments-reply {
					margin: 0 0 32rpx 72rpx;
					padding: 24rpx;
					background: #F5F6F7;
					border-radius: 8rpx;
					.reply-item {
						.commenter-name,
						.responder-name,
						.with-symbol {
							font-weight: 500;
							font-size: 28rpx;
							color: #444251;
							line-height: 40rpx;
						}
						.with-text {
							font-weight: 400;
							font-size: 28rpx;
							color: #567DF4;
							line-height: 40rpx;
						}
						.reply-content {
							font-weight: 400;
							font-size: 26rpx;
							color: #444251;
						}
						
					}
					
				}
			}
		}
	}
	/* 删除动态相关 */
	.community-del,
	.confirm-del {
		padding: 32rpx;
		.confirm-del-text {
			width: 100%;
			height: 66rpx;
			padding: 0 0 30rpx 0;
			border-bottom: 2rpx solid #F5F6F7;
			font-weight: 400;
			font-size: 24rpx;
			line-height: 36rpx;
			text-align: center;
			color: #959BA4;
		}
		.community-del-button {
			width: 100%;
			height: 96rpx;
			overflow: hidden;
			margin: 0 0 16rpx 0;
			font-weight: 400;
			font-size: 30rpx;
			line-height: 96rpx;
			text-align: center;
			color: #E20812;
		}
		.community-del-cancel {
			height: 96rpx;
			margin: 0 0 32rpx 0;
			background-color: #F5F6F7;
			border-radius: 16rpx;
			border-color: #F5F6F7;
		}
		button.community-del-cancel::after {
			border-color: #F5F6F7;
		}
	}
</style>
