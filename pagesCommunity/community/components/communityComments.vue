<template>
	<!--  评论模块  -->
	<view class="community-comments-label" v-if="interactionList.length > 0">
		<view class="community-comments" v-for="(item, index) in interactionList" :key="item.id">
			<!-- 用户信息 -->
			 <view class="comments-user">
				<image class="user-photo" :src="item.commenterAvatar || '/pagesCommunity/static/community/tabBarMyActive.png'" mode="aspectFit"></image>
				<view class="user-name">{{ item.commenterName }}</view>
			 </view>
			 <!-- 评论内容 -->
			 <view class="comments-content" @click="replyToComment(item)">
				 <u-read-more ref="uReadMore" showHeight="42" textIndent="0" closeText="全文" :shadowStyle="shadowStyle" toggle="true" @close="setReadMoreReply(item)" @open="setReadMoreReply(item)">
				 	<u-parse :content="item.content" @load="loadReadMoreReply(interactionList.length,'uReadMore')"></u-parse>
				 </u-read-more>
			 </view>
			 <!-- 回复内容 -->
			 <view class="comments-reply" v-if="item.replyList && item.replyList.length > 0">
				<view class="reply-item" v-for="(itm, idx) in item.replyList.slice(0,3)" :key="idx">
					<view class="reply-content" @click="replyToCommentToReply(item,idx)">
						<view class="" v-if="itm.responderName">
							<text class="commenter-name">{{ itm.commenterName }}</text>
							<text class="reply-symbol">回复</text>
							<text class="responder-name">{{ itm.responderName }}</text>
							<text class="with-symbol">：</text>
						</view>
						<view class="" v-else>
							<text class="commenter-name">{{ itm.commenterName }}</text>
							<text class="with-symbol">：</text>
						</view>
						<view class="reply-content-label">
							<u-read-more :ref="'uReadMoreToReply-'+index" showHeight="42" textIndent="0" closeText="全文" :shadowStyle="shadowStyle" toggle="true" @close="setReadMoreToReply(index,idx,item)" @open="setReadMoreToReply(index,idx,item)">
								<u-parse :content="itm.content" @load="loadReadMoreToReply(index,idx,item)"></u-parse>
							</u-read-more>
						</view>
					</view>
				</view>
				<view class="replies-all-view" @click="repliesAllView(item)" v-if="item.replyList.length > 3">查看全部回复</view>
			 </view>
			 <!-- 评论日期 -->
			 <view class="comments-timer">{{ item.ctime }}</view>
			 <view class="operate-chat">
			 	<image class="chat-photo" src="/pagesCommunity/static/community/operate-chat.png" mode="aspectFit" @click="replyToComment(item)"></image>
			 </view>
		</view>
		<!--  查看全部回复 -开始-  -->
		<u-popup class="reply-to-reply-popup" :show="showCommentReply" @close="closeCommentReply" @open="openCommentReply" :round="16" @click="clickCommentReplyPopup" :overlayStyle="overlayReplyToReply">
			<view class="comment-reply-header">{{ queryReplyTotal + '条回复' }}</view>
			<scroll-view class="scroll-Y" :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lowerReplyToReply" @scroll="scroll">
				<!--  回复列表  inFloorReplies -->
				<!--  回复评论的头部  -->
				<view class="in-floor-replies">
					<!-- 用户信息 -->
					 <view class="comments-user">
						<image class="user-photo" :src="inFloorReplies.commenterAvatar || '/pagesCommunity/static/community/tabBarMyActive.png'" mode="aspectFit"></image>
						<view class="user-name">{{ inFloorReplies.commenterName }}</view>
					 </view>
					 <!-- 评论内容   @click="replyToComment(inFloorReplies)"  @close="setReadMoreReply(item)" @open="setReadMoreReply(item)" -->
					 <view class="comments-content">
						 <u-read-more ref="uReadMoreInFloor" showHeight="42" textIndent="0" closeText="全文" :shadowStyle="shadowStyle" toggle="true">
						 	<u-parse :content="inFloorReplies.content" @load="loadReadMoreReply(1,'uReadMoreInFloor')"></u-parse>
						 </u-read-more>
					 </view>
				</view>
				<!-- 回复楼中楼 -->
				<view class="community-comments in-floor-replies-comments" v-for="(item, index) in queryReplyList" :key="index">
					 <view class="comments-user">
						<image class="user-photo" :src="item.commenterAvatar || '/pagesCommunity/static/community/tabBarMyActive.png'" mode="aspectFit"></image>
						<view class="user-name">
							<view class="" v-if="item.responderName">
								<text class="commenter-name">{{ item.commenterName }}</text>
								<text class="reply-symbol">回复</text>
								<text class="responder-name">{{ item.responderName }}</text>
								<text class="with-symbol">：</text>
							</view>
							<view class="" v-else>
								<text class="commenter-name">{{ item.commenterName }}</text>
								<text class="with-symbol">：</text>
							</view>
						</view>
					 </view>
					 <view class="comments-content" @click="replyToReplyComment(item)">
						<view class="comments-content-label">
							<u-read-more ref="uReadMoreReplyToReply" showHeight="42" textIndent="0" closeText="全文" :shadowStyle="shadowStyle" toggle="true" @close="setReadMoreReplyToReply(index,item)" @open="setReadMoreReplyToReply(index,item)">
								<u-parse :content="item.content" @load="loadReadMoreReplyToReply(queryReplyList.length,'uReadMoreReplyToReply')"></u-parse>
							</u-read-more>
						</view>
					 </view>
					 <!-- 评论日期 -->
					 <view class="comments-timer">{{ item.ctime }}</view>
					 <view class="operate-chat">
						 <image class="chat-photo" src="/pagesCommunity/static/community/operate-chat.png" mode="aspectFit"></image>
					 </view>
				</view>
			</scroll-view>
			<!--  楼中楼回复  -开始-  -->
			<!--  回复评论  -->
			<u-popup :show="showReplyToReply" @close="closeReplyToComment" @open="openReplyToComment" :round="16" overlay="false">
				<view class="reply-to-comment-header">写回复</view>
				<view class="textarea-label">
					<!--  focus="true" -->
					<u-textarea class="fix-comments-textarea" focus="true" v-model="replyToCommentContent.content" placeholder="写回复" @blur="replyToCommentPost" border="none" ref="fixCommentsTextarea" cursorSpacing="30"></u-textarea>
				</view>
			</u-popup>
			<!--  楼中楼回复   -结束-   -->
		</u-popup>
		<!--  查看全部回复 -结束-  -->
		<!--  删除回复相关  -->
		<u-popup :show="showCommentsDel" @close="closeCommentsDel" @open="openCommentsDel" :round="16">
			<!--  删除选项  -->
			<view class="comments-del" v-if="commentsDelIco">
				<view class="comments-del-button" @click="commentsDelHandle">删除评论</view>
				<view class="comments-del-button comments-reply-button" @click="commentsReplyHandle">回复评论</view>
				<button class="comments-del-cancel" type="default" @click="commentsDelCancel">取消</button>
			</view>
			<!--  确认删除选项  -->
			<view class="confirm-del" v-if="confirmCommentsDelIco">
				<view class="confirm-del-text">删除评论后，评论下所有的回复都会被删除</view>
				<view class="comments-del-button" @click="confirmCommentsDelHandle">确定删除</view>
				<button class="comments-del-cancel" type="default" @click="commentsDelCancel">取消</button>
			</view>
		</u-popup>
		<!--  删除回复相关  -->
		<!--  回复评论  -->
		<u-popup :show="showReplyToComment" @close="closeReplyToComment" @open="openReplyToComment" :round="16" overlay="false">
			<view class="reply-to-comment-header">写回复</view>
			<view class="textarea-label">
				<!--  focus="true" -->
				<u-textarea class="fix-comments-textarea" focus="true" v-model="replyToCommentContent.content" placeholder="写回复" @blur="replyToCommentPost" border="none" ref="fixCommentsTextarea" cursorSpacing="30"></u-textarea>
			</view>
		</u-popup>
	</view>
	
</template>

<script>
	import commentsApis from '@/http/community/comments.js'
	export default {
		name:"CommunityComments",
		props: {
			commentId: {
				type: Number,
				default: 0
			},
			interactionList: {
				type: Array,
				default: []
			},
			commentType: {
				type: String,
				default: "list"
			}
		},
		data() {
			return {
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "0px",
					marginTop: "0px",
				},
				formData: {
					id: null, // 评论ID
					pageNum: 1,
					pageSize: 10,
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				/* 楼中楼弹窗数据列表 */
				queryReplyList: [],
				queryReplyTotal: 0,
				showCommentReply: false,
				replyToCommentContent: {
					content: null,	//回复内容
					interactiveCommunityId: null, //动态id
					replyType: 1, //回复类型 0 动态回复 1 动态评论回复
					subjectId: null
				},
				//  楼中楼评论头部信息
				inFloorReplies: {},
				showReplyToComment: false,
				showReplyToReply: false,
				timerMore: undefined,
				timerMoreToReply: undefined,
				timerMoreReplyToReply: undefined,
				//楼中楼评论下拉刷新
				hasNext: 0,
				//删除评论
				showCommentsDel: false,
				commentsDelIco: false,
				confirmCommentsDelIco: false,
				overlayReplyToReply: {
					background: 'rgba(245,246,247,0.8)'
				}
			}
		},
		created() {
			console.info("--->",this.interactionList)
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lowerReplyToReply: function(e) {
				console.log("底部刷新")
				const thisObj = this
				if(thisObj.hasNext === 1){
					thisObj.formData.pageNum++;
					thisObj.queryReplyListByReplyId();
				}
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			loadReadMoreReply(num,refName) {
				console.info(num,"<--->>",refName)
				const thisObj = this
				for (let i = 0; i < num; i++) {
					thisObj.$refs[refName][i].init()
				}
			},
			loadReadMoreToReply(index,idx,item) {
				console.info(index,"<--->>",idx,"---->",item)
				const thisObj = this
				let thisRef = "uReadMoreToReply-" + index
				console.info("thisRef-->",thisRef)
				if(item.replyList.length > 1){
					thisObj.$refs[thisRef][idx].init()
				} else {
					thisObj.$refs[thisRef][0].init()
				}
				
				// if(item.replyList.length > 1){
				// 	for (let j = 0; j < item.replyList.length; j++) {
				// 		thisObj.$refs[thisRef][j].init()
				// 	}
				// } else {
				// 	thisObj.$refs[thisRef].init()
				// }
				
				// for (let i = 0; i < item.length; i++) {
				// 	let thisEle = item[i].replyList
				// 	console.info("thisEle-->",thisEle)
				// 	if(thisEle && thisEle.length>0){
						
				// 	} else {
				// 		return
				// 	}
				// }
			},
			setReadMoreReply(item) {
				const thisObj = this
				item.readMoreReplyState = true
				// console.info("set - item --->",item)
				this.timerMore = setTimeout(() => {
				    //TODO 
					item.readMoreReplyState = false
					clearTimeout(this.timerMore)
				}, 100);
				
			},
			setReadMoreToReply(index,idx,item) {
				console.info(idx,"set - itm --->",item.replyList)
				const thisObj = this
				let itm = item.replyList[idx]
				itm.readMoreReplyState = true
				this.timerMoreToReply = setTimeout(() => {
				    //TODO 
					itm.readMoreReplyState = false
					clearTimeout(this.timerMoreToReply)
				}, 200);
				
			},
			//全部回复弹窗相关
			openCommentReply() {
			  console.log('open');
			},
			closeCommentReply() {
			  this.showCommentReply = false
			  console.log('close');
			},
			clickCommentReplyPopup(){
				const thisObj = this
				console.info("点击了楼中楼！！")
				// thisObj.showReplyToComment = false
				thisObj.showReplyToReply = false
			},
			setCommentReply() {
			  this.showCommentReply = true
			  console.log('弹窗呀^^');
			},
			repliesAllView(item) {
				const thisObj = this
				//楼中楼评论头部信息
				thisObj.inFloorReplies = item
				let formData = thisObj.formData
				formData.id = item.id
				formData.pageNum = 1
				console.info("item-->",item)
				thisObj.queryReplyListByReplyId(formData)
			},
			//全部回复接口
			queryReplyListByReplyId: function(item) {
				const thisObj = this
				commentsApis.apiReplyListByReplyId(this.formData).then(res => {
					console.info("全部回复接口  res--->",res)
					thisObj.queryReplyTotal = res.totalNumber || 0
					if(res.dataSet.length > 0){
						thisObj.queryReplyList.push(...res.dataSet)
						thisObj.showCommentReply = true
						thisObj.hasNext = 1
					} else {
						thisObj.hasNext = 0
						console.info("全部回复接口！001")
					}
				})
			},
			// 回复评论相关方法
			replyToComment(item) {
				const thisObj = this
				console.info('item--->',item);
				//赋值ID
				let fixComments = thisObj.replyToCommentContent
				fixComments.subjectId = item.id
				if(!item.readMoreReplyState){
					if(item.isMe){
						// 是本人需选择操作内容
						thisObj.showCommentsDel = true
						thisObj.commentsDelIco = true
					} else {
						//非本人只需回复
						thisObj.commentsReplyHandle()
					}
				} else {
					console.info("冒泡")
				}
			},
			replyToCommentToReply(item,idx) {
				const thisObj = this
				//赋值ID
				let fixComments = thisObj.replyToCommentContent
				fixComments.subjectId = item.id
				let itmData = item.replyList[idx]
				if(!itmData.readMoreReplyState){
					if(itmData.isMe){
						// 是本人需选择操作内容
						thisObj.showCommentsDel = true
						thisObj.commentsDelIco = true
					} else {
						//非本人只需回复
						thisObj.commentsReplyHandle()
					}
				} else {
					console.info("冒泡")
				}
			},
			closeReplyToComment() {
				const thisObj = this
				thisObj.showReplyToComment = false
				thisObj.showReplyToReply = false
				console.log('close');
			},
			openReplyToComment() {
			  console.log('open');
			},
			replyToCommentPost(event){
				const thisObj = this
				let {value, cursor} = event.detail
				let fixComments = thisObj.replyToCommentContent
				console.info("发布-->",value)
				if(value){
					fixComments.content = value
					fixComments.interactiveCommunityId = thisObj.commentId
					thisObj.queryReplyToCommentPost(fixComments)
				} else {
					uni.showToast({
						title: "请输入评论！",
						icon: 'none'
					})
				}
				
			},
			// 新增回复评论
			queryReplyToCommentPost(data){
				const thisObj = this
				commentsApis.apiAddCommuityReply(data).then(res => {
					console.info("新增回复评论  res-->",res)
					uni.showToast({
						title: "回复评论成功！",
						icon: 'none'
					})
					thisObj.showReplyToComment = false
					thisObj.showReplyToReply = false
					//刷新页面
					thisObj.$parent.pageRefresh()
				})
				.catch(function(error){
					uni.showToast({
						title: "回复评论失败！",
						icon: 'none'
					})
					console.info("新增回复评论！001")
				})
			},
			/* 楼中楼评论回复 回复动作以及显示全部动作 */
			replyToReplyComment(item) {
				console.info("楼中楼点击回复！！！")
				const thisObj = this
				//
				let fixComments = thisObj.replyToCommentContent
				fixComments.subjectId = item.id
				if(!item.readMoreReplyState){
					if(item.isMe){
						// 是本人需选择操作内容
						thisObj.showCommentsDel = true
						thisObj.commentsDelIco = true
					} else {
						//非本人只需回复
						thisObj.commentsReplyHandle("replyToReply")
					}
				} else {
					console.info("冒泡")
				}
			},
			setReadMoreReplyToReply(index,item) {
				const thisObj = this
				console.info(index,"set - item --->",item)
				item.readMoreReplyState = true
				thisObj.timerMoreReplyToReply = setTimeout(() => {
				    //TODO 
					item.readMoreReplyState = false
					clearTimeout(thisObj.timerMoreReplyToReply)
				}, 200)
			},
			loadReadMoreReplyToReply(num,refName) {
				const thisObj = this
				console.info(num,"<--num-----refName-->",refName)
				for (let i = 0; i < num; i++) {
					thisObj.$refs[refName][i].init()
				}
			},
			/* 删除评论弹窗相关  */
			openCommentsDel() {
			  // console.log('open');
			},
			closeCommentsDel() {
			  this.showCommentsDel = false
			  this.commentsDelIco = false
			  this.confirmCommentsDelIco = false
			  // console.log('close');
			},
			openCommentsDelState(comments){
				if(comments.isMe == 1){
					this.showCommentsDel = true
					this.commentsDelIco = true
				} else {
					uni.showToast({
						title: "非本人动态，无法操作！",
						icon: 'none'
					})
				}
				
			},
			commentsDelCancel(){
				this.showCommentsDel = false
				this.commentsDelIco = false
				this.confirmCommentsDelIco = false
			},
			/* 删除动态操作 */
			commentsDelHandle(){
				this.commentsDelIco = false
				this.confirmCommentsDelIco = true
			},
			confirmCommentsDelHandle(){
				this.commentsDelCancel()
				this.queryDelCommuityReply()
			},
			/* 删除评论的请求接口 */
			queryDelCommuityReply(){
				const thisObj = this
				commentsApis.apiDelCommuityReply(thisObj.replyToCommentContent.subjectId).then(res => {
					console.info("删除评论的请求接口  res-->",res)
					uni.showToast({
						title: "删除评论成功！",
						icon: 'none'
					})
					//刷新页面
					thisObj.$parent.pageRefresh()
				})
				.catch(function(error){
					uni.showToast({
						title: "删除评论失败！",
						icon: 'none'
					})
					console.info("删除评论的请求接口！001")
				})
			},
			// 选择回复评论
			commentsReplyHandle(type){
				const thisObj = this
				thisObj.commentsDelCancel()
				let fixComments = thisObj.replyToCommentContent
				fixComments.content = ""
				if(type === 'replyToReply'){
					//楼中楼回复
					thisObj.showReplyToReply = true
				} else {
					thisObj.showReplyToComment = true
				}
				
				
				//
			},
			
			
		},
		computed: {
			
		}
	}
</script>

<style lang="scss">
.community-comments-label {
	width: 750rpx;
	height: auto;
	overflow: hidden;
	padding: 0 0 200rpx 0;
}
.community-comments,
.in-floor-replies {
	width: 100%;
	height: auto;
	overflow: hidden;
	margin: 0;
	padding: 32rpx;
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
			.commenter-name,
			.responder-name,
			.reply-symbol,
			.with-symbol {
				font-weight: 500;
				font-size: 26rpx;
				color: #444251;
				line-height: 40rpx;
			}
			.reply-symbol {
				padding: 0 8rpx;
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
			.reply-content-label {
				padding: 0 0 16rpx 0;
				font-weight: 400;
				font-size: 30rpx;
				color: #444251;
			}
		}
		
		.comments-content {
			// width: 614rpx;
			// max-height: 352rpx;
			overflow: hidden;
			margin: 0 0 32rpx 0;
			padding: 0 0 0 72rpx;
			font-weight: 400;
			line-height: 42rpx;
			font-size: 30rpx;
			color: #222222;
			// text-overflow: ellipsis;
			// display: -webkit-box;
			// -webkit-line-clamp: 8;
			// -webkit-box-orient: vertical;
			.comments-content-label {
				font-weight: 400;
				font-size: 26rpx;
				color: #444251;
			}
		}
	}
	.comments-content {
		// width: 614rpx;
		// max-height: 352rpx;
		overflow: hidden;
		margin: 0 0 32rpx 0;
		padding: 0 0 0 72rpx;
		font-weight: 400;
		line-height: 42rpx;
		font-size: 30rpx;
		color: #222222;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 8;
		// -webkit-box-orient: vertical;
	}
	.comments-reply {
		margin: 0 0 16rpx 72rpx;
		padding: 24rpx;
		background: #F5F6F7;
		border-radius: 8rpx;
		.reply-item {
			.commenter-name,
			.responder-name,
			.reply-symbol,
			.with-symbol {
				font-weight: 500;
				font-size: 26rpx;
				color: #444251;
				line-height: 40rpx;
			}
			.reply-symbol {
				padding: 0 8rpx;
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
			.reply-content-label {
				padding: 0 0 16rpx 0;
				font-weight: 400;
				font-size: 26rpx;
				color: #444251;
			}
				
		}
		.replies-all-view {
			height: 36rpx;
			font-weight: 400;
			font-size: 26rpx;
			line-height: 36rpx;
			color: #567DF4;
		}
			
	}
	.operate-chat,
	.comments-timer {
		width: 50%;
		height: 36rpx;
		float: left;
		margin: 0 0 0 72rpx;
		font-weight: 400;
		font-size: 12px;
		color: #959BA4;
		line-height: 36rpx;
		display: flex;
		align-items: center;
		.chat-photo {
			width: 32rpx;
			height: 32rpx;
		}
	}
	.operate-chat {
		width: 32rpx;
		float: right;
		text-align: right;
	}
}
.in-floor-replies {
	margin: 32rpx auto 0 auto;
	padding: 32rpx 32rpx 0 32rpx;
	.comments-content {
		margin: 0;
	}
}
.comment-reply-header {
	width: 100%;
	height: 108rpx;
	text-align: center;
	font-weight: 500;
	font-size: 15px;
	color: #222222;
	line-height: 108rpx;
	border-bottom: 2rpx solid #EEEEEE;
}
	.scroll-Y {
		height: 1000rpx;
		.in-floor-replies-comments {
			background-color: #F5F6F7;
		}
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	
	.textarea-label {
		width: 686rpx;
		height: 180rpx;
		margin: 0 auto 0 auto;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.textarea-label /deep/ .u-textarea__field {
		padding: 16rpx 16rpx 0 16rpx;
		background: #F5F6F7;
	}
	.textarea-label /deep/ .u-textarea {
		// height: 120rpx;
		padding: 0 !important;
	}
	.reply-to-comment-header {
		width: 100%;
		height: 80rpx;
		text-align: center;
		font-weight: 500;
		font-size: 30rpx;
		color: #222222;
		line-height: 80rpx;
		border-bottom: 2rpx solid #EEEEEE;
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
	
	/* 删除动态相关 */
	.comments-del,
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
		.comments-del-button {
			width: 100%;
			height: 96rpx;
			overflow: hidden;
			margin: 0 0 16rpx 0;
			font-weight: 400;
			font-size: 30rpx;
			line-height: 96rpx;
			text-align: center;
			color: #E20812;
			border-bottom: 2rpx solid #F5F6F7;
		}
		.comments-reply-button {
			color: #000000;
			border-bottom: none;
		}
		.comments-del-cancel {
			height: 96rpx;
			margin: 0 0 32rpx 0;
			background-color: #F5F6F7;
			border-radius: 16rpx;
			border-color: #F5F6F7;
			color: #888888;
		}
		button.comments-del-cancel::after {
			border-color: #F5F6F7;
		}
	}
	.reply-to-reply-popup {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
</style>
