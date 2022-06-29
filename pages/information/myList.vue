<template>
	<view class="label-container">
		<PageNavbar title="我的资讯"></PageNavbar>
		<view class="community-main" :style="{'margin-top': navBarHeight + 'px'}">
			<u-sticky bgColor="#fff">
				<u-tabs :list="infoTabList" :current="tabsCurrent" @change="tabsChange" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle" :itemStyle="itemStyle" scrollable="false"></u-tabs>
			</u-sticky>
			<!-- 资讯 -1- -->
			<view class="tabs-information" v-if="infoList.length > 0">
				<view class="tabs-info-list" v-for="(item, index) in infoList" :key="index">
					<view class="info-title" @click="infoToDetail(item.id)">
						{{ item.title }}
					</view>
					<view class="info-content">
						<uParseMax :content="item.contentStr" @preview="previewContent" @navigate="navigateContent" ></uParseMax>
					</view>
					<!-- 缩略图  -->
					<view class="info-thumbnail" v-if="item.informationFileList">
						<u-grid :col="3">
							<u-grid-item v-for="(itm, idx) in item.informationFileList" :key="idx">
								<image class="grid-img" :src="itm.fileUrl" mode="aspectFill" @click="previewCommunityImage(itm.fileUrl)"></image>
							</u-grid-item>
						</u-grid>
					</view>
					<view class="info-message">
						<text class="message-time">{{ item.ctime }}</text>
						<text v-if="item.informationType" class="message-post">{{ item.informationType }}</text>
						<text class="message-name">{{ item.authorName }}</text>
					</view>
				</view>
			</view>
			<view class="information-empty" v-else>
				<u-empty mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png">
				</u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import infoListApis from '../../http/information/list.js'
	import PageNavbar from '@/components/pageNavbar/pageNavbar.vue'
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
					pageNum: 1,//页数-不分页查询时，该字段传null
					pageSize: 10,//每页数量-不分页查询时，该字段传null
					heartType: 2 //资讯 type
				},
				//资讯类型列表
				infoTypeList: [],
				//我的资讯Tab列表
				infoTabList: [
					{
						name: "收藏",
						type: 2 // 1:资讯点赞，2:收藏， 3:阅读’ 4:评论
					},
					{
						name: "点赞",
						type: 1
					},
					{
						name: "评论",
						type: 4
					},
				],
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
				itemStyle: {
					width: "33.33%",
					height: "88rpx"
				},
				/* 导航栏高度设置 */
				navBarHeight: getApp().globalData.statusBarHeight + 48
			}
		},
		created() {
			console.info("created………………………………")
		},
		onLoad(option) {
			const thisObj = this
			if (option.currentTab) {
				thisObj.tabsCurrent = parseInt(option.currentTab)-1
			} else {
				thisObj.tabsCurrent = 0
			}
			thisObj.queryAppletList()
			thisObj.queryInfoTypeList()
			
		},
		//上拉加载
		onReachBottom() {
			console.info("上拉加载哟！！")
			if(this.hasNext === 1){
				this.formData.pageNum++;
				this.queryAppletList();
			}
		},
		methods: {
			//资讯列表
			queryAppletList(){
				const thisObj = this
				let thisData = uni.$u.deepClone(thisObj.formData)
				infoListApis.apiMyHeartList(thisData).then(res => {
						// console.info("res res res-->",res)
					if(res.length > 0){
						let infoTypeList = uni.$u.deepClone(thisObj.infoTypeList)
						res.forEach(function(ele,index){
							for (let i = 0; i < infoTypeList.length; i++) {
								if(ele.informationTypeId == infoTypeList[i].id){
									ele.informationType = infoTypeList[i].name
									return
								}
							}
							// ele.contentStr = (ele.content);
							// ele.contentStr = marked.parse(ele.content)
							let thisText = decodeURIComponent(ele.content)
							if(thisText.indexOf('&lt;body&gt;')>-1){
								thisText = thisText.substring(thisText.indexOf('&lt;body&gt;') + 12, thisText.indexOf('&lt;/body&gt;')-12)
								console.info("1-->",thisText)
								if(thisText.indexOf('&lt;body&gt;')>-1){
									thisText = thisText.substring(thisText.indexOf('&lt;body&gt;') + 12, thisText.indexOf('&lt;/body&gt;')-12)
									console.info("2-->",thisText)
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
						thisObj.infoTypeList = newTab
					} else {
						console.info("获取社区列表接口失败！001")
					}
				})
			},
			tabsChange(item){
				console.info("切换!!!!",item)
				const thisObj = this
				// uni.$u.deepClone()
				let thisData = thisObj.formData
				thisData.heartType = item.type
				thisObj.infoList = []
				thisData.pageNum = 1
				thisObj.queryAppletList()
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
					url: `/pages/information/detail?id=${id}`
				})
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
		min-height: 100%;
		.label-background-img{
			position: absolute;
			top: 0;
			left: 0;
			right:0;
			width: 750rpx;
			height: 312rpx;
			z-index: 1;
		}
		.community-main {
			position: relative;
			width: 100%;
			height: auto;
			margin: 176rpx 0 0 0;
			padding:0;
			z-index: 1;
			// background-color: #F5F6F7;
			.tabs-information,
			.information-empty {
				width: 100%;
				height: auto;
				overflow: hidden;
				padding: 0;
				background: #FFFFFF;
				margin: 0 0 24rpx 0;
				.tabs-info-list {
					width: 100%;
					height: auto;
					overflow: hidden;
					padding: 0 32rpx;
					border-bottom: 24rpx solid #F5F6F7;
				}
				.info-title {
					width: 100%;
					max-height: 96rpx;
					overflow: hidden;
					margin: 32rpx 0 0 0;
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
					// max-height: 126rpx;
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
					.wxParse .p {
						margin: 16rpx 0;
					}
					.wxParse span {
						display: inline-block;
						margin: 0;
						padding: 0;
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
			}
		}
	}
</style>
