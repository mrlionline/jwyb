<template>
	<view class="label-container">
		<PageNavbar></PageNavbar>
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
					<view class="status">{{ '·' + (communityList.statusName || communityList.approveTypeName) }}</view>
					<u-icon class="more-dot" name="more-dot-fill" color="#000000" size="24" @click="openCommunityDelState(communityList)"></u-icon>
				</view>
				<!-- 动态图片视频 -->
				<view class="community-content">
					<view class="community-text" v-if="communityList.content">
						{{ communityList.content }}
					</view>
					<!-- <view class="community-media">
						<u-grid :col="3" v-if="communityList.fileList.length">
							<u-grid-item v-for="(itm, idx) in communityList.fileList" :key="idx">
								<image class="grid-img" :src="itm.fileUrl" mode="aspectFit"></image>
							</u-grid-item>
						</u-grid>
						
					</view> -->
					<view class="community-media" v-if="communityList.fileList.length && communityList.fileList[0].fileType === 'mp4'">
						<view class="community-video-label" v-for="(itm, idx) in communityList.fileList" :key="idx">
							<video id="community-video" :src="itm.fileUrl" object-fit="cover"></video>
						</view>
					</view>
					<view class="community-media" v-else>
						<u-grid :col="3">
							<u-grid-item v-for="(itm, idx) in communityList.fileList" :key="idx">
								<image class="grid-img" :src="itm.fileUrl" mode="aspectFit"></image>
							</u-grid-item>
						</u-grid>
					</view>
					<!-- 地理位置展示  -->
					<view class="location-address" v-if="communityList.locationName || communityList.storeName">
						<view class="location-address-label">
							<image class="address-img" src="/pagesCommunity/static/community/location-address-img.png" mode="aspectFit"></image>
							<view class="address-text">{{ communityList.locationName || communityList.storeName }}</view>
						</view>
					</view>
				</view>
				<!-- 动态评论和点赞数 -->
				<view class="community-operate">
					 <view class="operate-chat">
					 	<image class="chat-photo" src="/pagesCommunity/static/community/operate-chat.png" mode="aspectFit"></image>
					 	<text>{{ communityList.commentNum }}</text>
					 </view>
					 <view class="operate-thumb" @click="operateThumb(communityList)">
						<u-icon name="thumb-up" color="#959BA4" size="28"></u-icon>
						<view>{{ communityList.hbNum }}</view>
					 </view>
				</view>
				<!--  评论模块  -->
				<CommunityComments :interactionList="interactionList" :commentId="formData.interactiveCommunityId"></CommunityComments>
				<!-- <view class="community-comments"  v-for="(item, index) in interactionList" :key="index">
					 <view class="comments-user">
					 	<image class="user-photo" src="/pagesCommunity/static/community/" mode="aspectFit"></image>
					 	<view class="user-name">{{ item.commenterName }}</view>
					 </view>
					 <view class="comments-content">{{ item.content }}</view>
					 <view class="comments-reply">
						<view class="reply-item" v-for="(itm, idx) in item.replyList" :key="idx">
							<text class="commenter-name">{{ itm.responderName }}</text>
							<text class="with-symbol">：</text>
							<text class="reply-content">{{ itm.content }}</text>
						</view>
					 </view>
				</view> -->
			</view>
		</view>
		<!--  评论动态  -->
		<view class="fix-community-comments" v-if="communityList.status === '2'">
			<view class="textarea-label">
				<!--  focus="true" -->
				<u-textarea ref="fixCommentsTextarea" class="fix-comments-textarea" v-model="fixCommentsContent.content" placeholder="写评论" @blur="commentPost" :formatter="fixCommentsFormatter" border="none" cursorSpacing="30"></u-textarea>
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
				<view class="confirm-del-text">删除动态后，动态下所有的回复都会被删除</view>
				<view class="community-del-button" @click="confirmDelHandle">确定删除</view>
				<button class="community-del-cancel" type="default" @click="communityDelCancel">取消</button>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import PageNavbar from '../components/pageNavbar.vue'
	import CommunityComments from '../components/communityComments.vue'
	import commentsApis from '@/http/community/comments.js'
	import informationApis from '@/http/community/list.js'
	export default {
		components: {
			CommunityComments,
			PageNavbar
		},
		data() {
			return {
				formData: {
					interactiveCommunityId: null,
					pageNum: 1,
					pageSize: 10,
					// status: 2,
				},
				fixCommentsContent: {
					content: null,	//回复内容
					interactiveCommunityId: null, //动态id
					replyType: 0, //回复类型 0 动态回复 1 动态评论回复
				},
				//社区动态列表
				communityList: {},
				interactionList: [],
				hasNext: 0,
				//删除评论
				showCommunityDel: false,
				communityDelIco: false,
				confirmDelIco: false,
				//全部回复
				showCommunityDel: false,
				showCommentReply: false,
				content: "<text class='commenter-name'>李振</text><text class='with-text'>回复</text><text class='responder-name'>李雷</text><text></text><text class='with-symbol'>：</text><text class='reply-content'>山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？</text>",
			}
		},
		onLoad(option) {
			if (option.id) {
				this.formData.interactiveCommunityId = option.id || 1
				this.fixCommentsContent.interactiveCommunityId = option.id || 1
				this.listPageOfCommunit()
				this.listPageOfInteraction()
			} else {
				uni.showToast({
					title: "页面展示异常！",
					icon: 'none'
				})
			}
			
		},
		//上拉加载
		onReachBottom() {
			console.info("上拉加载哟！！")
			if(this.hasNext === 1){
				this.formData.pageNum++;
				this.listPageOfInteraction();
			}
		},
		onReady() {
			// 如果需要兼容微信小程序的话，需要用此写法
			let thisTextarea = (this.$refs.fixCommentsTextarea && this.$refs.fixCommentsTextarea.setFormatter) || undefined
			thisTextarea && thisTextarea(this.fixCommentsFormatter)
		},
		methods: {
			listPageOfCommunit(){
				const thisObj = this
				commentsApis.getUsersByStarId(this.formData.interactiveCommunityId).then(res => {
					if(Object.keys(res).length > 1){
						thisObj.communityList = res
					} else {
						console.info("获取社区列表接口失败！001")
					}
				})
			},
			// 评论列表接口
			listPageOfInteraction(){
				const thisObj = this
				commentsApis.queryInteractionList(this.formData).then(res => {
					console.info("评论列表接口  res--->",res)
					if(res.length > 0){
						thisObj.interactionList.push(...res)
						this.hasNext = 1
					} else {
						this.hasNext = 0
						console.info("评论列表接口！001")
					}
				})
			},
			/* 删除评论弹窗相关  */
			openCommunityDel() {
			  // console.log('open');
			},
			closeCommunityDel() {
			  this.showCommunityDel = false
			  this.communityDelIco = false
			  this.confirmDelIco = false
			  // console.log('close');
			},
			openCommunityDelState(community){
				if(community.isMe == 1){
					this.showCommunityDel = true
					this.communityDelIco = true
				} else {
					uni.showToast({
						title: "非本人动态，无法操作！",
						icon: 'none'
					})
				}
				
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
				commentsApis.apiDelCommunit(this.formData.interactiveCommunityId).then(res => {
					console.info("删除动态的请求接口  res-->",res)
					if(Object.keys(res).length > 1){
						uni.showToast({
							title: "删除动态成功！",
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: "删除动态失败！",
							icon: 'none'
						})
						console.info("删除动态的请求接口！001")
					}
				})
			},
			//评论动态的相关方法
			fixCommentsFormatter(value){
				// 让输入框只能输入数值，过滤其他字符
				// return value.replace(/[^0-9]/ig, "")
			},
			commentPost(event){
				const thisObj = this
				let {value, cursor} = event.detail
				let fixComments = thisObj.fixCommentsContent
				console.info("发布-->",value)
				if(value){
					fixComments.content = value
					thisObj.queryAddCommuityReply(fixComments)
				} else {
					uni.showToast({
						title: "请输入评论！",
						icon: 'none'
					})
				}
				
			},
			// 新增动态评论
			queryAddCommuityReply(data){
				const thisObj = this
				commentsApis.apiAddCommuityReply(data).then(res => {
					console.info("新增动态评论  res-->",res)
					uni.showToast({
						title: "评论动态成功！",
						icon: 'none'
					})
					thisObj.pageRefresh()
					thisObj.fixCommentsContent.content = ""
				})
				.catch(function(error){
					uni.showToast({
						title: "评论动态失败！",
						icon: 'none'
					})
					console.info("新增动态评论！001")
				})
				
			},
			// 刷新页面
			pageRefresh(){
				const thisObj = this
				thisObj.formData.pageNum = 1
				thisObj.interactionList = []
				thisObj.listPageOfCommunit()
				thisObj.listPageOfInteraction()
			},
			//点赞功能
			operateThumb(item){
				const thisObj = this
				let data = {
					subjectId: item.id,
					hbType: 1,
				}
				if(item.isHb){
					informationApis.apiDelCommunitHB(data).then(res => {
						console.info("取消点赞功能-->",res)
						uni.showToast({
							title: "点赞已取消！",
							icon: 'none'
						})
						//刷新页面
						thisObj.pageRefresh()
					})
					.catch(function(error){
						uni.showToast({
							title: "点赞取消失败！",
							icon: 'none'
						})
					})
				} else {
					informationApis.apiAddCommunitHB(data).then(res => {
						console.info("点赞功能-->",res)
						uni.showToast({
							title: "点赞成功！",
							icon: 'none'
						})
						//刷新页面
						thisObj.pageRefresh()
						
					})
					.catch(function(error){
						uni.showToast({
							title: "点赞失败！",
							icon: 'none'
						})
					})
				}
			},
			
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
					// max-height: 144rpx;
					overflow: hidden;
					margin: 0 0 32rpx 0;
					padding: 0;
					font-weight: 400;
					line-height: 48rpx;
					font-size: 30rpx;
					color: #222222;
					// text-overflow: ellipsis;
					// display: -webkit-box;
					// -webkit-line-clamp: 3;
					// -webkit-box-orient: vertical;
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
			// .community-comments {
			// 	width: 686rpx;
			// 	height: auto;
			// 	overflow: hidden;
			// 	margin: 32rpx auto 32rpx auto;
			// 	padding: 0rpx 0 0 0;
			// 	border-bottom: 2rpx solid #EEEEEE;
			// 	clear: both;
			// 	.comments-user {
			// 		width: 100%;
			// 		height: 56rpx;
			// 		overflow: hidden;
			// 		margin: 0 0 4rpx 0;
			// 		float: left;
			// 		.user-photo {
			// 			width: 56rpx;
			// 			height: 56rpx;
			// 			overflow: hidden;
			// 			border-radius: 50%;
			// 			float: left;
			// 			// box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.4);
			// 		}
			// 		.user-name {
			// 			height: 56rpx;
			// 			padding: 0 0 0 16rpx;
			// 			font-weight: 600;
			// 			font-size: 24rpx;
			// 			color: #444251;
			// 			line-height: 56rpx;
			// 			float: left;
						
			// 		}
			// 	}
			// 	.comments-content {
			// 		width: 614rpx;
			// 		max-height: 352rpx;
			// 		overflow: hidden;
			// 		margin: 0 0 32rpx 0;
			// 		padding: 0 0 0 72rpx;
			// 		font-weight: 400;
			// 		line-height: 44rpx;
			// 		font-size: 30rpx;
			// 		color: #222222;
			// 		text-overflow: ellipsis;
			// 		display: -webkit-box;
			// 		-webkit-line-clamp: 8;
			// 		-webkit-box-orient: vertical;
			// 	}
			// 	.comments-reply {
			// 		margin: 0 0 32rpx 72rpx;
			// 		padding: 24rpx;
			// 		background: #F5F6F7;
			// 		border-radius: 8rpx;
			// 		.reply-item {
			// 			.commenter-name,
			// 			.responder-name,
			// 			.with-symbol {
			// 				font-weight: 500;
			// 				font-size: 28rpx;
			// 				color: #444251;
			// 				line-height: 40rpx;
			// 				}
			// 				.with-text {
			// 					font-weight: 400;
			// 					font-size: 28rpx;
			// 					color: #567DF4;
			// 					line-height: 40rpx;
			// 				}
			// 				.reply-content {
			// 					font-weight: 400;
			// 					font-size: 26rpx;
			// 					color: #444251;
			// 				}
							
			// 			}
						
			// 		}
			// 	}
			
			.location-address {
				width: 100%;
				height: auto;
				overflow: hidden;
				margin: 0 0 32rpx 0;
				padding: 0;
				.location-address-label {
					width: fit-content;
					height: 56rpx;
					margin: 0;
					padding: 0;
					background: #FFFFFF;
					border: 2rpx solid #EEEEEE;
					border-radius: 26rpx;
					display: flex;
					align-items: center;
					.address-img {
						width: 36rpx;
						height: 36rpx;
						margin: 0 0 0 8rpx;
						// border-radius: 50%;
						// background-color: #567DF4;
					}
					.address-text {
						width: auto;
						height: 36rpx;
						padding: 0 16rpx;
						font-weight: 400;
						font-size: 26rpx;
						line-height: 36rpx;
						color: #959BA4;
						
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
						padding: 0 0 0 8rpx;
					}
					.chat-photo {
						width: 32rpx;
						height: 32rpx;
					}
					
				}
				.operate-thumb {
					padding: 0 0 0 80rpx;
					
				}
			}
		}
	}
	.community-video-label {
		width: 484rpx;
		height: 340rpx;
	}
	#community-video {
		width: 484rpx;
		height: 340rpx;
		// margin: 0 0 0 288rpx;
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
	.fix-community-comments {
		width: 750rpx;
		height: 200rpx;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		position: fixed;
		bottom: 0;
		background-color: white;
		.textarea-label {
			width: 686rpx;
			height: 152rpx;
			margin: 0 auto;
			padding: 0;
		}
		.u-textarea__field {
			padding: 16rpx 16rpx 0 16rpx;
			background: #F5F6F7;
		}
		/deep/ .u-textarea {
			height: 136rpx;
			padding: 0 !important;
		}
	}
	
	/* 查看全文样式修正 */
	.u-read-more /deep/ .u-read-more__toggle {
		display: block!important;
	}
	.u-read-more /deep/ .u-read-more__toggle__text {
		display: block!important;
	}
	.u-read-more .u-read-more__toggle__text  /deep/ .u-text {
		display: block!important;
	}
	.u-read-more .u-read-more__toggle__text .u-text /deep/ .u-text__value {
		display: block!important;
		text-align: right!important;
		padding: 0 10rpx 20rpx 0;
	}
	.u-read-more__toggle /deep/ .u-read-more__toggle__icon {
		display: none!important;
	}
</style>
