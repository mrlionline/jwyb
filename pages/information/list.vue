<template>
	<view class="label-container">
		<view class="header-fixed-main">
			<image class="label-background-img" src="/static/community/bg.png" :style="{'height': ((navBarHeight+112)*2) + 'rpx'}"></image>
			<PageNavbar title="资讯" :bgColor="'transparent'" :leftIconColor="'#FFFFFF'" :isShowBack="false" :titleStyle="titleStyle" :isBorder="false"></PageNavbar>
			<view class="search-label" :style="{'margin-top': (navBarHeight) + 'px'}">
				<u-search placeholder="搜索资讯标题" @search="searchCommunity" v-model="formData.title" :show-action="false" :bgColor="'#FFFFFF'"></u-search>
			</view>
			<u-tabs class="tabs-list" :list="tabsList" :current="tabsCurrent" @change="tabsChange" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle"
				lineWidth="26rpx"
				lineHeight="4rpx"
				lineColor="#567DF4"
			></u-tabs>
		</view>
		<scroll-view class="community-main" v-if="infoList && infoList.length > 0" :style="{'margin-top': ((navBarHeight+112)) + 'px','height': 'calc(100vh - '+(navBarHeight+112)+'px)' }" :scroll-top="scrollTop" scroll-y="true" :refresher-threshold="150" @scrolltolower="lowerScrollInfo" @scroll="scroll">
			<!-- 资讯 -1- -->
			<view class="tabs-info-list" v-for="(item, index) in infoList" :key="index">
				<view class="info-title" @click="infoToDetail(item.id)">
					{{ item.title }}
				</view>
				<view class="info-content" @click="infoToDetail(item.id)">
					<uParseMax :content="item.contentStr" @preview="previewContent" @navigate="navigateContent" ></uParseMax>
				</view>
				<!-- 缩略图  -->
				<view class="info-thumbnail" v-if="item.informationFileList && item.informationFileList.length > 0 && (item.informationFileList[0].fileType === 'mp4' || item.informationFileList[0].fileType === 'avi' || item.informationFileList[0].fileType === 'mkv')">
					<view class="community-video-label" v-for="(itm, idx) in item.informationFileList.slice(0,1)" :key="idx">
						<video id="community-video" :src="itm.fileUrl" object-fit="cover"></video>
					</view>
				</view>
				<view class="info-thumbnail" v-else-if="item.informationFileList && item.informationFileList.length > 0">
					<u-grid :col="3">
						<u-grid-item v-for="(itm, idx) in item.informationFileList" :key="idx">
							<image class="grid-img" :src="itm.fileUrl" mode="aspectFit" @click="previewCommunityImage(itm.fileUrl)"></image>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="info-message">
					<text class="message-time">{{ item.ctime }}</text>
					<text v-if="item.informationTypeName || item.informationType" class="message-post">{{ item.informationTypeName || item.informationType }}</text>
					<text class="message-name">{{ item.authorName }}</text>
				</view>
			</view>
		</scroll-view>
		<view class="information-empty" :style="{'margin-top': ((navBarHeight+112)) + 'px','height': 'calc(100vh - '+(navBarHeight+112)+'px)' }" v-else>
			<u-empty mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
	import infoListApis from '../../http/information/list.js'
	import PageNavbar from './components/pageNavbar.vue'
	import uParseMax from '@/components/u-parse/u-parse.vue'
	import {marked} from "marked"
	export default {
		components: {
			PageNavbar,
			uParseMax
		},
		data() {
			return {
				formData: {
					title: "",//咨询标题
					pageNum: 1,//页数-不分页查询时，该字段传null
					pageSize: 10,//每页数量-不分页查询时，该字段传null
					informationTypeId: 0 //咨询类别id
				},
				tabsList: [],
				infoList: [],
				tabsCurrent: 0,
				hasNext: 0,
				titleStyle: {
					color: '#FFFFFF'
				},
				activeStyle: {
					color: '#444251',
					fontWeight: 'bold',
					fontSize: '30rpx'
				},
				inactiveStyle: {
					color: '#444251',
					fontWeight: 400,
					fontSize: '30rpx'
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				/* 导航栏高度设置 */
				navBarHeight: getApp().globalData.statusBarHeight + 44
			}
		},
		async created() {
			let thisObj = this
			console.info("你好,created………………………………")
			await thisObj.queryInfoTypeList()
			// 获取缓存数据
			const sInfoList = uni.getStorageSync('Info_infoList') || null
			if(sInfoList && sInfoList.length > 0){
				thisObj.infoList = sInfoList
				thisObj.tabsCurrent = uni.getStorageSync("Info_tabsCurrent") || 0
				thisObj.formData = uni.getStorageSync("Info_formData") || {}
				thisObj.scrollTop = uni.getStorageSync("Info_scrollTop") || 0
			} else {
				await thisObj.queryAppletList()
			}
		},
		beforeDestroy() {
			let thisObj = this
			console.info(this.formData,"beforeDestroy啦………………………………",this.old.scrollTop)
			uni.setStorageSync("Info_formData",thisObj.formData)
			uni.setStorageSync("Info_infoList",thisObj.infoList)
			uni.setStorageSync("Info_scrollTop",thisObj.old.scrollTop)
			uni.setStorageSync("Info_tabsCurrent",thisObj.tabsCurrent)
		},
		//上拉加载
		onReachBottom() {
			console.info("上拉加载哟！！")
			if(this.hasNext === 1){
				this.formData.pageNum++;
				this.queryAppletList();
			}
		},
		onReady(){
			// uni.$on('scroll-top-change',e =>{
			// 	this.scrollTop = e
			// })
		},
		methods: {
			//资讯列表
			queryAppletList(){
				const thisObj = this
				let thisData = uni.$u.deepClone(thisObj.formData)
				if(!thisData.informationTypeId){
					delete thisData.informationTypeId
				}
				if(!thisData.title){
					delete thisData.title
				}
				infoListApis.apiAppletList(thisData).then(res => {
						// console.info("res res res-->",res)
					if(res.length > 0){
						let tabsList = uni.$u.deepClone(thisObj.tabsList)
						res.forEach(function(ele,index){
							for (let i = 0; i < tabsList.length; i++) {
								if(ele.informationTypeId == tabsList[i].id){
									ele.informationType = tabsList[i].name
								}
							}
							// ele.contentStr = (ele.content);
							// ele.contentStr = marked.parse(ele.content)
							let thisText = ele.content
							if(thisText.indexOf('&lt;body&gt;')>-1){
								thisText = thisText.substring(thisText.indexOf('&lt;body&gt;') + 12, thisText.indexOf('&lt;/body&gt;'))
								// console.info("1-->",thisText)
								if(thisText.indexOf('&lt;body&gt;')>-1){
									thisText = thisText.substring(thisText.indexOf('&lt;body&gt;') + 12, thisText.indexOf('&lt;/body&gt;'))
									// console.info("2-->",thisText)
								}
							}
							if(thisText.indexOf('<body>')>-1){
								thisText = thisText.substring(thisText.indexOf('<body>') + 6, thisText.indexOf('</body>'))
								// console.info("1-->",thisText)
								if(thisText.indexOf('<body>')>-1){
									thisText = thisText.substring(thisText.indexOf('<body>') + 6, thisText.indexOf('</body>'))
									// console.info("2-->",thisText)
								}
							}
							ele.contentStr = thisText
							console.info("thisText-->",thisText)
							
							// console.info("contentStr-->",ele.contentStr)
						})
						thisObj.infoList.push(...res)
						thisObj.hasNext = 1
						console.info("infoList-->",thisObj.infoList)
					} else {
						if(thisData.pageNum == 1){
							thisObj.infoList = []
						}
						thisObj.hasNext = 0
						console.info("获取资讯列表失败！001")
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
				const thisObj = this
				console.info("搜索!!!!")
				// uni.$u.deepClone()
				let thisData = thisObj.formData
				if(thisData.title){
					thisObj.infoList = []
					thisData.pageNum = 1
					thisObj.queryAppletList()
					thisObj.scrollEl()
				} else {
					uni.showToast({
						title: "请输入搜索内容！",
						icon: 'none'
					})
				}
				
			},
			tabsChange(item){
				console.info("切换!!!!",item)
				const thisObj = this
				// uni.$u.deepClone()
				let thisData = thisObj.formData
				thisData.informationTypeId = item.id
				thisObj.infoList = []
				thisData.pageNum = 1
				thisObj.queryAppletList()
				thisObj.scrollEl()
			},
			previewContent(src, e) {
			  // do something
			},
			navigateContent(href, e) {
			  // do something
			  console.info("href-->",href)
			},
			//跳转资讯详情
			infoToDetail(id){
				uni.navigateTo({
					url: `pages/information/detail?id=${id}`
				})
			},
			scrollEl() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			// scroll-view
			lowerScrollInfo: function(e) {
				console.log("底部刷新")
				const thisObj = this
				if(thisObj.hasNext === 1){
					thisObj.formData.pageNum++;
					thisObj.queryAppletList();
				}
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
		},
		computed: {
			
		}
	}
</script>

<style lang="scss">
	@import url("@/components/u-parse/u-parse.css");
	page {
		height: 100vh;
	}
	.label-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		min-height: 100vh;
		background-color: #F5F6F7;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);
		.header-fixed-main {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: auto;
			overflow: hidden;
			z-index: 3;
			.label-background-img{
				position: absolute;
				top: 0;
				left: 0;
				right:0;
				width: 750rpx;
				z-index: -1;
			}
			.search-label {
				width: 684rpx;
				height: 136rpx;
				overflow: hidden;
				margin: 0 auto;
				padding: 0;
				display: flex;
				align-items: center;
			}
			.u-tabs {
				border-bottom: 1rpx solid #EEEEEE;
			}
			/deep/ .u-tabs {
				position: relative;
				z-index: 2;
				background-color: #FFF;
			}
		}
		
		.community-main,
		.information-empty {
			position: relative;
			width: 100%;
			height: auto;
			padding: 0;
			background: #F5F6F7;
			// margin: 0 0 24rpx 0;
			margin: 0;
			z-index: 2;
				.tabs-info-list {
					width: 100%;
					height: auto;
					overflow: hidden;
					padding: 0 32rpx;
					background: #FFFFFF;
					border-bottom: 24rpx solid #F5F6F7;
				}
				.info-title {
					width: 100%;
					max-height: 96rpx;
					overflow: hidden;
					margin: 32rpx 0 16rpx 0;
					font-weight: 600;
					font-size: 34rpx;
					line-height: 48rpx;
					color: #444251;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.info-content {
					width: 100%;
					height: auto;
					max-height: 126rpx;
					overflow: hidden;
					margin: 0 0 16rpx 0;
					padding: 0;
					font-weight: 400;
					font-size: 30rpx;
					line-height: 42rpx;
					color: #959BA4;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					.wxParse {
						font-size: 30rpx!important;
						line-height: 42rpx!important;
					}
					.wxParse view {
						display: inline-block;
						font-size: 30rpx!important;
						line-height: 42rpx!important;
					}
					.wxParse view.text {
						display: inline;
					}
					.wxParse p {
						display: block;
						margin: 8rpx 0;
					}
					.wxParse .p {
						margin: 0!important;
					}
					.wxParse span {
						display: inline-block;
						margin: 0;
						padding: 0 6rpx;
					}
					.wxParse image.img,
					.wxParse view.video {
						display:none;
					}
					
				}
				.info-thumbnail {
					width: 100%;
					height: auto;
					overflow: hidden;
					margin: 0 0 16rpx 0;
					.community-video-label {
						width: 484rpx;
						height: 340rpx;
						#community-video,
						video {
							width: 484rpx;
							height: 340rpx;
						}
					}
					.u-grid-item {
						margin: 0 0 8rpx 0;
					}
					.grid-img {
						width: 216rpx;
						height: 136rpx;
					}
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
			.information-empty {
				padding: 0 0 50rpx 0;
				background-color: #F5F6F7;
				// background-color: transparent;
			}
		}
	}
	.search-label /deep/ .u-search__content__input {
		height: 72rpx!important;
	}
	/deep/ .u-tabbar {
		position: relative;
		z-index: 5;
	}
</style>
