<template>
	<view class="label-container">
		<PageNavbar title="我的动态"></PageNavbar>
		<!-- 社区列表  -->
		<view class="community-main">
			<view class="community-list" v-for="(item, index) in communityList" :key="index">
				<!-- 动态内容 -->
				<view class="community-info">
					<image class="user-photo" :src="item.authorAvatar || '../../static/defaultAvatar.png'" mode="aspectFit"></image>
					<view class="user-info">
						<view class="user-name">{{ item.authorName || '佚名' }}</view>
						<view class="timer">{{ item.releaseTime || item.mtime }}</view>
					</view>
					<view class="status">{{ '·' + (item.statusName || item.approveTypeName) }}</view>
					<u-icon class="more-dot" name="more-dot-fill" color="#000000" size="24" @click="openCommunityDelState(item)"></u-icon>
				</view>
				<!-- 动态图片视频 -->
				<view class="community-content" v-if="item.content">
					<view class="community-text">
						<u-read-more ref="uReadMore" showHeight="144" textIndent="0" closeText="全文" :shadowStyle="shadowStyle" toggle="true">
							<u-parse :content="item.content" @load="loadReadMoreReply"></u-parse>
						</u-read-more>
					</view>
					
					<view class="community-media" v-if="item.fileList.length && item.fileList[0].fileType === 'mp4'">
						<view class="community-video-label" v-for="(itm, idx) in item.fileList" :key="idx">
							<video id="community-video" :src="itm.fileUrl" object-fit="cover"></video>
						</view>
					</view>
					<view class="community-media" v-else>
						<u-grid :col="3">
							<u-grid-item v-for="(itm, idx) in item.fileList" :key="idx">
								<image class="grid-img" :src="itm.fileUrl" mode="aspectFit"></image>
							</u-grid-item>
						</u-grid>
					</view>
					<!-- 地理位置展示  -->
					<view class="location-address" v-if="item.locationName || item.storeName">
						<view class="location-address-label">
							<image class="address-img" src="../../static/community/location-address-img.png" mode="aspectFit"></image>
							<view class="address-text">{{ item.locationName || item.storeName }}</view>
						</view>
					</view>
				</view>
				
				<!-- 动态评论和点赞数 -->
				<view class="community-operate">
					 <view class="operate-chat" @click="operateChat(item.id)">
					 	<image class="chat-photo" src="/pagesCommunity/static/community/operate-chat.png" mode="aspectFit"></image>
						<text>{{ item.commentNum }}</text>
					 </view>
					 <view class="operate-thumb" @click="operateThumb(item)">
						<u-icon v-if="item.isHb" name="thumb-up-fill" color="#567DF4" size="20"></u-icon>
						<u-icon v-else name="thumb-up" color="#959BA4" size="20"></u-icon>
						<view>{{ item.hbNum }}</view>
					 </view>
				</view>
			</view>
		</view>
		<!-- 发布动态 -->
		<view class="fix-release-button" @click="goReleaseHandle">
			<image class="fix-release-img" src="../../static/community/community-release.png" mode="aspectFit"></image>
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
	import informationApis from '../../http/community/list.js'
	import commentsApis from '../../http/community/comments.js'
	import PageNavbar from '../../components/pageNavbar/pageNavbar.vue'
	export default {
		components: {
			PageNavbar
		},
		data() {
			return {
				formData: {
					pageNum: 1,
					pageSize: 10,
				},
				//社区动态列表  isMe 是否是自己发表的评论 0 不是 1 是
				communityList: [],
				background: {
					backgroundColor: '#001f3f'
				},
				hasNext: 0,
				//删除评论
				showCommunityDel: false,
				communityDelIco: false,
				confirmDelIco: false,
				delId: null,
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
			}
		},
		onShow() {
			console.info("onShow")
			this.queryCommunitByUserId()
		},
		//上拉加载
		onReachBottom() {
			console.info("上拉加载哟！！")
			if(this.hasNext === 1){
				this.formData.pageNum++;
				this.queryCommunitByUserId();
			}
		},
		methods: {
			queryCommunitByUserId(){
				const thisObj = this
				informationApis.apiCommunitByUserId(thisObj.formData).then(res => {
					if(res.length > 0){
						thisObj.communityList.push(...res)
						// this.$forceUpdate()
						thisObj.hasNext = 1
						console.info("res.data-->",thisObj.communityList)
					} else {
						thisObj.hasNext = 0
						console.info("获取社区列表接口失败！001")
					}
				})
			},
			operateChat(id){
				uni.navigateTo({
					url: `/pagesCommunity/community/comments/comments?id=${id}`
				})
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
			// 刷新页面
			pageRefresh(){
				const thisObj = this
				thisObj.formData.pageNum = 1
				thisObj.communityList = []
				thisObj.queryCommunitByUserId()
			},
			goReleaseHandle(){
				uni.navigateTo({
					url: "/pagesCommunity/community/release/release"
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
			openCommunityDelState(item){
				const thisObj = this
				if(item.isMe == 1){
					thisObj.showCommunityDel = true
					thisObj.communityDelIco = true
					thisObj.delId = item.id
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
				commentsApis.apiDelCommunit(thisObj.delId).then(res => {
					uni.showToast({
						title: "删除动态成功！",
						icon: 'none'
					})
					//刷新页面
					thisObj.pageRefresh()
				})
				.catch(function(error){
					uni.showToast({
						title: "删除动态失败！",
						icon: 'none'
					})
				})
			},
			// 查看全文的load
			loadReadMoreReply() {
				const thisObj = this
				for (let i = 0; i < thisObj.communityList.length; i++) {
					thisObj.$refs.uReadMore[i].init()
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
					width: 48rpx;
					height: 48rpx;
				}
			}
			//列表主体内容
			.community-content{
				width: auto;
				padding: 0 32rpx 0 144rpx;
				.community-text {
					width: 100%;
					height: auto;
					// max-height: 144rpx;
					overflow: hidden;
					margin: 0 0 28rpx 0;
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
	// 发布动态按钮
	.fix-release-button {
		width: 136rpx;
		height: 136rpx;
		z-index: 1000;
		position: fixed;
		right: 0;
		bottom: 120rpx;
		.fix-release-img {
			width: 136rpx;
			height: 136rpx;
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
	// .u-read-more__toggle /deep/ .u-read-more__toggle__text {
	// 	position: absolute;
	// 	top: 0;
	// 	right: 0;
	// }
	.u-read-more__toggle /deep/ .u-read-more__toggle__icon {
		display: none!important;
	}
</style>
