<template>
	<view>
		<page-header :title="title"></page-header>
		<view class="container" :style="{'height': containerHeight}">
			<view class="card base-info">
				<view class="card-title">基本信息</view>
				<view class="base-info-wrap">
					<view class="bi-head">
						<image v-if="baseInfo.avatar" :src="baseInfo.avatar"></image>
						<image v-if="!baseInfo.avatar"  src="/static/defaultAvatar.png"></image>
					</view>
					<view class="bi-content">
						<view class="bi-name">
							{{baseInfo.name || ''}}
						
						</view>
						<text class="bi-base-text">电话：{{baseInfo.mobile || '-'}}</text>
						<text class="bi-base-text">工作状态：<text>{{baseInfo.workStatus || '正常'}}</text></text>
						<text class="bi-base-text">性别：{{sexMap[baseInfo.sex] || '保密'}}</text>
						<text class="bi-base-text">职位：{{baseInfo.title || '-'}}</text>
						<text class="bi-base-text">所属团队：{{baseInfo.deptArr[baseInfo.deptArr.length - 1] || '-'}}</text>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="card-title">星委会职位</view>
				<view class="position-way" v-for="position in positionWay">· {{position.positionName}} / {{position.starCouncilName}}</view>
			</view>
			<view class="card">
				<view class="card-title">星路历程</view>
				<time-line :list="timeLineList"></time-line>
			</view>
		</view>
	</view>
</template>

<script>
	import committeeApi from '../../http/apis-committee.js'
	import Caosule from '../../http/apis-capsule.js'
	export default {
		data() {
			return {
				containerHeight: `calc(100vh - ${getApp().globalData.statusBarHeight}px - 48px)`,
				id: '',
				title: '',
				baseInfo: {},
				positionWay: [],
				sexMap: {
					0: '保密',
					1: '男',
					2: '女'
				},
				timeLineList: [
					
				]
			}
		},
		methods: {
			getUserInfo() {
				Caosule.queryUserInfo(this.id).then(res => {
					console.log(res)
					this.baseInfo = res.baseInfo
					this.positionWay = res.userPositions || []
					let list = []
					if (this.baseInfo.hiredDate) {
						const date = new Date(this.baseInfo.hiredDate)
						const day = Math.ceil((new Date().getTime() - date.getTime()) / 1000 / 60 / 60 / 24)
						list.push({
							date: `${date.getMonth()+1}/${date.getDate()+1}`,
							year: date.getFullYear(),
							title: '入职绝味',
							desc: '加入绝味大家庭',
							time: date.getTime()
						})
					}
					
					list = list.concat(res.starUserHis.map(item => {
						const date = new Date(item.ctime)
						return {
							time: date.getTime(),
							date: `${date.getMonth()+1}/${date.getDate()+1}`,
							year: date.getFullYear(),
							title: item.starName,
							desc: item.activityName,
							image: '/static/home/level-1-personnel.png'
						}
					}))
					this.timeLineList = list.sort((a, b) => a.time - b.time)
					
				})
			},
			getDeptArr(deptTree) {
				const res = []
				let node = deptTree[0]
				while (node) {
					res.push(node.name)
					if (node.childDeptList && node.childDeptList.length) {
						node = node.childDeptList[0]
					} else {
						break
					}
				}
				return res
			}
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id
			this.title = option.name
			this.getUserInfo()
		},
		
		
	}
</script>

<style lang="scss">
	.container{
		position: fixed;
		bottom: 0;
		width: 100%;
		// height: calc(100vh - var(--status-bar-height) - 44px);
		background: #F5F6F7;
		z-index: 1;
		overflow-y: auto;
		padding: 24px;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}
	.card{
		padding: 24px 16px;
		background: #FFFFFF;
		box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
		border-radius: 8px;
		margin-bottom: 16px;
		.card-title{
			height: 16px;
			line-height: 16px;
			font-size: 13px;
			color: #444251;
			padding-left: 8px;
			border-left: 2px solid #567DF4;
			margin-bottom: 17px;
			font-weight: bold;
		}
	}
	.base-info-wrap{
		display: flex;
		align-items: flex-start;
		.bi-head{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 128rpx;
			height: 128rpx;
			border-radius: 5px;
			overflow: hidden;
			margin-right: 16px;
			image{
				max-width: 100%;
				max-height: 100%;
			}
		}
		.bi-name{
			line-height: 25px;
			font-size: 18px;
			margin-bottom: 16px;
			font-weight: bold;
			.bi-level{
				display: inline-block;
				height: 40rpx;
				line-height: 40rpx;
				padding: 0 10px;
				text-align: center;
				background-color: #FDF1E8;
				color: #F2731E;
				font-size: 12px;
				border-radius: 12px;
				margin-left: 8px;
			}
		}
		.bi-content > text{
			display: block;
			margin-bottom: 8px;
		}
		.bi-base-text{
			line-height: 21px;
			font-size: 15px;
			color: #444251;
		}
	}
	.position-way{
		line-height: 21px;
		font-size: 15px;
		color: #444251;
		margin-bottom: 8px;
	}
</style>
