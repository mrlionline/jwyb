<template>
	<view class="label-container">
		<PageNavbar title="资讯"></PageNavbar>
		<view class="community-main" v-if="infoDetail.title" :style="{'margin-top': navBarHeight + 'px'}">
			<!-- 资讯 -1- -->
			<view class="detail-information">
				<view class="info-title">
					{{ infoDetail.title }}
				</view>
				<view class="info-message">
					<text class="message-time">{{ infoDetail.ctime }}</text>
					<text class="message-post" v-if="infoDetail.informationType">{{ infoDetail.informationType }}</text>
					<text class="message-name">{{ infoDetail.authorName }}</text>
				</view>
				<view class="info-content">
					<uParseMax :content="infoDetail.contentStr" @preview="previewContent" @navigate="navigateContent" noData="暂无数据"></uParseMax>
				</view>
				<!-- 缩略图  -->
				<view class="info-thumbnail" v-if="infoDetail.informationFileList">
					<u-grid :col="3">
						<u-grid-item v-for="(itm, idx) in infoDetail.informationFileList" :key="idx">
							<image class="grid-img" :src="itm.fileUrl" mode="aspectFill" @click="previewCommunityImage(itm.fileUrl)"></image>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<view class="detail-comments-label">
				<view class="detail-comments-list">
					<!-- replyCount -->
					<view class="reply-count">评论<text>{{ infoDetail.replyCount }}</text></view>
					<!-- readCount -->
					<view class="read-count">阅读<text>{{ infoDetail.readCount }}</text></view>
					<!-- fabulousCount -->
					<view class="fabulous-count">点赞<text>{{ infoDetail.fabulousCount }}</text></view>
					<view class="community-comments" v-for="(item, index) in infoDetail.replyDTOList" :key="item.id">
						 <view class="comments-user">
							<image class="user-photo" :src="item.avatar || '../../static/tabBarMyActive.png'" mode="aspectFit"></image>
							<view class="user-name">{{ item.replyName }}</view>
						 </view>
						 <view class="comments-content">{{ item.content }}</view>
						 <!-- 评论日期 -->
						 <view class="comments-timer">{{ item.ctime }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="community-empty" v-else>
			<u-empty mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</view>
		<!--  评论动态  -->
		<view class="fix-community-comments">
			<view class="textarea-label">
				<!--  focus="true" -->
				<u-textarea ref="fixCommentsTextarea" class="fix-comments-textarea" v-model="fixCommentsContent.content" placeholder="写评论" @blur="commentPost" :formatter="fixCommentsFormatter" border="none" height="36" cursorSpacing="30" autoHeight></u-textarea>
			</view>
			<view class="operate-chat" @click="operateChat()">
				<u-icon name="chat" color="#959BA4" size="24"></u-icon>
			</view>
			<view class="operate-thumb" @click="operateThumb(infoDetail.fabulousOrNot)">
				<u-icon v-if="infoDetail.fabulousOrNot" name="thumb-up-fill" color="#567DF4" size="24"></u-icon>
				<u-icon v-else name="thumb-up" color="#959BA4" size="24"></u-icon>
			</view>
			<view class="operate-star" @click="operateStar(infoDetail.collectionOrNot)">
				<u-icon v-if="infoDetail.collectionOrNot" name="star-fill" color="#FFD940" size="24"></u-icon>
				<u-icon v-else name="star" color="#959BA4" size="24"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import infoDetailApis from '../../http/information/detail.js'
	import infoListApis from '../../http/information/list.js'
	import PageNavbar from './components/pageNavbar.vue'
	import uParseMax from '@/components/u-parse/u-parse.vue'
	export default {
		components: {
			PageNavbar,
			uParseMax
		},
		data() {
			return {
				id: null,
				formData: {
					keyword: "",
				},
				fixCommentsContent: {
					content: "",
					passiveStatus: 1,  //被动状态 如果父级节点下线，则下线; 1:已上线、 2:已下线
					replyType: 0,  // 评论类型 0:资讯回复 1:资讯评论的回复
					subjectId: ""  //被评论主体id 默认是=information_id（即资讯的回复reply_type=0）
				},
				tabsCurrent: 0,
				infoDetail: {},
				queryReplyList: [
					{
						content: "评论内容评论内容评论内容",	//评论内容
						commenterName: "曾经沧海", //姓名/头像
						ctime: "2022-05-28 13:03",  //日期
						fabulousCount: "11",	//点赞数量
						id: "",	//消息回复id
						informationId: "",	//资讯id
						replyType: "0",	//评论类型 0:资讯回复 1:资讯评论的回复
						status: "",	//状态 1:已上线、 2:已下线
						subjectId: "",	//被评论主体id 默认是=information_id（即资讯的回复reply_type=0）；如果reply_type=1，则为指向性回复，记information_reply_id
						sunReply: ""	//是否还有子评论
					},
					{
						content: "评论内容评论内容评论内容",	//评论内容
						commenterName: "曾经沧海", //姓名/头像
						ctime: "2022-05-28 13:03",  //日期
						fabulousCount: "11",	//点赞数量
						id: "",	//消息回复id
						informationId: "",	//资讯id
						replyType: "0",	//评论类型 0:资讯回复 1:资讯评论的回复
						status: "",	//状态 1:已上线、 2:已下线
						subjectId: "",	//被评论主体id 默认是=information_id（即资讯的回复reply_type=0）；如果reply_type=1，则为指向性回复，记information_reply_id
						sunReply: ""	//是否还有子评论
					}
				],
				// 新增/取消点赞、新增/取消收藏 
				infoHeartBeatData: {
					informationId: "",  //资讯id
					replyId: "",  //评论id
					hbType: 3,  // 心动类型 1:资讯点赞，2:收藏， 3:阅读’ 4:评论点赞
				},
				tabsList: [],
				/* 导航栏高度设置 */
				navBarHeight: getApp().globalData.statusBarHeight + 48
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id || 0
				this.infoHeartBeatData.informationId = option.id || 0
				this.queryAppletList()
				this.queryInfoTypeList()
			} else {
				uni.showToast({
					title: "页面展示异常！",
					icon: 'none'
				})
			}
			
		},
		created() {
			console.info("你好呀………………………………")
		},
		onReady() {
			// 如果需要兼容微信小程序的话，需要用此写法
			let thisTextarea = (this.$refs.fixCommentsTextarea && this.$refs.fixCommentsTextarea.setFormatter) || undefined
			thisTextarea && thisTextarea(this.fixCommentsFormatter)
		},
		methods: {
			queryAppletList(){
				const thisObj = this
				let thisData = {
					id: thisObj.id,
					enter: "applet"
				}
				infoDetailApis.apiInfoFindId(thisData).then(res => {
					if(Object.keys(res).length > 1){
						console.info("res res res-->",res)
						//
						let thisText = decodeURIComponent(res.content)
						if(thisText.indexOf('&lt;body&gt;')>-1){
							thisText = thisText.substring(thisText.indexOf('&lt;body&gt;') + 12, thisText.indexOf('&lt;/body&gt;')-12)
							console.info("1-->",thisText)
							if(thisText.indexOf('&lt;body&gt;')>-1){
								thisText = thisText.substring(thisText.indexOf('&lt;body&gt;') + 12, thisText.indexOf('&lt;/body&gt;')-12)
								console.info("2-->",thisText)
							}
						}
						let tabsList = uni.$u.deepClone(thisObj.tabsList)
						if(tabsList.length>0){
							for (let i = 0; i < tabsList.length; i++) {
								if(res.informationTypeId == tabsList[i].id){
									res.informationType = tabsList[i].name
								}
							}
						}
						res.contentStr = thisText
						thisObj.infoDetail = res
						thisObj.operateRead()
						
					} else {
						console.info("获取社区列表接口失败！001")
					}
				})
			},
			// 资讯类别列表  apiInfoTypeList
			queryInfoTypeList(){
				const thisObj = this
				infoListApis.apiInfoTypeList({
					pageNum: null,
					pageSize: null,
					typeName: ""
				}).then(res => {
						console.info("资讯类别列表-->",res)
					if(res.length > 0){
						res.forEach(function(ele){
							ele.name = ele.informationTypeName
						})
						let newTab = [
							{
								name: "全部",
								id: 0,
							}
						]
						newTab.push(...res)
						thisObj.tabsList = newTab
					} else {
						console.info("获取社区列表接口失败！001")
					}
				})
			},
			searchCommunity(){
				console.info("搜索!!!!")
			},
			tabsChange(){
				console.info("切换!!!!")
			},
			/* 资讯操作 */
			operateChat(state){
				console.info("评论--->",state)
			},
			// 阅读动作
			operateRead(){
				const thisObj = this
				let thisData = thisObj.infoHeartBeatData
				console.info("阅读--->")
				// 操作id
				thisData.replyId = thisObj.id
				// 心动类型 1:资讯点赞，2:收藏， 3:阅读’ 4:评论点赞
				thisData.hbType = 3
				thisObj.queryInfoHeartBeatSave(thisData)
			},
			//点赞动作
			operateThumb(state){
				const thisObj = this
				let thisData = thisObj.infoHeartBeatData
				console.info("点赞--->",state)
				// 操作id
				thisData.replyId = thisObj.id
				// 心动类型 1:资讯点赞，2:收藏， 3:阅读’ 4:评论点赞
				thisData.hbType = 1
				
				if(state){
					//已经点赞，执行取消点赞
					thisObj.queryInfoHeartBeatDel(thisData)
				} else {
					//未点赞，执行新增点赞
					thisObj.queryInfoHeartBeatSave(thisData)
				}
			},
			// 收藏动作
			operateStar(state){
				const thisObj = this
				let thisData = thisObj.infoHeartBeatData
				console.info("收藏--->",state)
				// 操作id
				thisData.replyId = thisObj.id
				// 心动类型 1:资讯点赞，2:收藏， 3:阅读’ 4:评论点赞
				thisData.hbType = 2
				
				if(state){
					//已经收藏，执行取消收藏
					thisObj.queryInfoHeartBeatDel(thisData)
				} else {
					//未收藏，执行新增收藏
					thisObj.queryInfoHeartBeatSave(thisData)
				}
			},
			// 取消点赞、取消收藏 接口
			queryInfoHeartBeatDel(data){
				const thisObj = this
				infoDetailApis.apiInfoHeartBeatDel(data).then(res => {
					console.info("取消功能-->",res)
					if(data.hbType === 1){
						uni.showToast({
							title: "点赞已取消！",
							icon: 'none'
						})
					} else if(data.hbType === 2) {
						uni.showToast({
							title: "收藏已取消！",
							icon: 'none'
						})
					} else {
						return
					}
					//刷新页面
					thisObj.pageRefresh()
				})
				.catch(function(error){
					if(data.hbType === 1){
						uni.showToast({
							title: "点赞取消失败！",
							icon: 'none'
						})
					} else if(data.hbType === 2) {
						uni.showToast({
							title: "收藏取消失败！",
							icon: 'none'
						})
					}
					
				})
			},
			// 新增点赞、新增收藏 接口
			queryInfoHeartBeatSave(data){
				const thisObj = this
				infoDetailApis.apiInfoHeartBeatSave(data).then(res => {
					console.info("新增点赞/新增收藏 接口-->",res)
					if(data.hbType === 1){
						uni.showToast({
							title: "点赞成功！",
							icon: 'none'
						})
					} else if(data.hbType === 2) {
						uni.showToast({
							title: "收藏成功！",
							icon: 'none'
						})
					} else {
						return
					}
					//刷新页面
					thisObj.pageRefresh()
				})
				.catch(function(error){
					if(data.hbType === 1){
						uni.showToast({
							title: "点赞失败！",
							icon: 'none'
						})
					} else if(data.hbType === 2) {
						uni.showToast({
							title: "收藏失败！",
							icon: 'none'
						})
					}
					
				})
			},
			//评论资讯的相关方法
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
					fixComments.informationId = parseInt(thisObj.id)
					fixComments.subjectId = parseInt(thisObj.id)
					thisObj.queryAddInfoReply(fixComments)
				} else {
					uni.showToast({
						title: "请输入评论！",
						icon: 'none'
					})
				}
			},
			// 新增资讯评论
			queryAddInfoReply(data){
				const thisObj = this
				infoDetailApis.apiAddInfoReply(data).then(res => {
					console.info("新增资讯评论  res-->",res)
					uni.showToast({
						title: "评论资讯成功！",
						icon: 'none'
					})
					thisObj.pageRefresh()
					thisObj.fixCommentsContent.content = ""
				})
				.catch(function(error){
					uni.showToast({
						title: "评论资讯失败！",
						icon: 'none'
					})
					console.info("新增资讯评论！001")
				})
				
			},
			// 刷新页面
			pageRefresh(){
				const thisObj = this
				thisObj.formData.pageNum = 1
				thisObj.infoDetail = {}
				thisObj.queryAppletList()
			},
			//正文内容HMTL内容优化方法
			previewContent(src, e) {
			  // do something
			},
			navigateContent(href, e) {
			  // do something
			  console.info("href-->",href)
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
		.community-main,
		.community-empty {
			width: 100%;
			height: auto;
			margin: 128rpx 0 0 0;
			padding:0;
			background-color: #F5F6F7;
			.detail-information {
				width: 100%;
				height: auto;
				overflow: hidden;
				padding: 0 32rpx;
				background: #FFFFFF;
				.info-title {
					width: 100%;
					height: auto;
					overflow: hidden;
					margin: 32rpx 0 16rpx 0;
					font-weight: 600;
					font-size: 34rpx;
					line-height: 48rpx;
					color: #444251;
				}
				.info-message {
					height: 34rpx;
					margin: 0 0 32rpx 0;
					font-weight: 400;
					font-size: 24rpx;
					line-height: 34rpx;
					color: #959BA4;
					.message-time,
					.message-post,
					.message-name {
						padding: 0 24rpx 0 0;
					}
				}
				.info-content {
					width: auto;
					height: auto;
					overflow: hidden;
					margin: 0 0 16rpx 0;
					font-weight: 400;
					font-size: 30rpx;
					color: #444251;
					text-align: justify;
					
					.wxParse view {
						display: inline-block;
					}
					.wxParse view.text {
						display: inline;
					}
					.wxParse p {
						display: block;
						margin: 16rpx 0;
					}
					.wxParse span {
						display: inline-block;
						margin: 0;
						padding: 0 6rpx;
					}
				}
				.info-thumbnail {
					width: 100%;
					height: auto;
					overflow: hidden;
					margin: 0 0 16rpx 0;
					.u-grid-item {
						margin: 0 0 8rpx 0;
					}
					.grid-img {
						width: 216rpx;
						height: 136rpx;
					}
				}
			}
			.detail-comments-label {
				width: 100%;
				height: auto;
				overflow: hidden;
				margin: 0;
				padding: 60rpx 32rpx 0 32rpx;
				background: #FFFFFF;
			}
			.detail-comments-list {
				width: 100%;
				height: auto;
				overflow: hidden;
				margin: 0 0 196rpx 0;
				padding: 32rpx 0 0 0;
				border-top: 2rpx solid #EEEEEE;
				.reply-count{
					width: 50%;
					height: 42rpx;
					margin: 0 0 32rpx 0;
					font-weight: 500;
					font-size: 30rpx;
					color: #444251;
					line-height: 42rpx;
					float: left;
					text {
						padding: 0 10rpx;
					}
				}
				.read-count,
				.fabulous-count{
					width: 25%;
					height: 42rpx;
					margin: 0 0 32rpx 0;
					font-weight: 400;
					font-size: 24rpx;
					color: #959BA4;
					line-height: 42rpx;
					text-align: right;
					float: left;
					text {
						padding: 0 10rpx;
					}
				}
				.community-comments {
					width: 686rpx;
					height: auto;
					overflow: hidden;
					margin: 32rpx auto 32rpx auto;
					padding: 0rpx 0 0 0;
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
						// max-height: 352rpx;
						overflow: hidden;
						margin: 0 0 8rpx 0;
						padding: 0 0 0 72rpx;
						font-weight: 400;
						line-height: 44rpx;
						font-size: 30rpx;
						color: #444251;
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
					.comments-timer {
						height: 36rpx;
						margin: 0 0 32rpx 72rpx;
						font-weight: 400;
						font-size: 12px;
						color: #959BA4;
						line-height: 36rpx;
					}
				}
			}
		}
	}
	.fix-community-comments {
		width: 750rpx;
		height: 156rpx;
		margin: 0;
		padding: 0;
		display: flex;
		// justify-content: center;
		align-items: center;
		z-index: 1000;
		position: fixed;
		bottom: 0;
		background-color: white;
		.textarea-label {
			width: 446rpx;
			height: auto;
			margin: 0 0 0 32rpx;
			padding: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 36rpx!important;
		}
		.operate-chat,
		.operate-thumb,
		.operate-star {
			margin: 0 0 0 32rpx;
		}
		
	}
	/deep/ .u-textarea__field {
		min-height: 82rpx!important;
		padding: 8rpx 8rpx 0 8rpx;
		background: #F5F6F7;
	}
	/deep/ .u-textarea {
		padding: 0!important;
	}
</style>
