<template>
	<view>
		<page-header :title="title"></page-header>
		<view class="container" :style="{'height': containerHeight}">
			<view class="card base-info">
				<view class="card-title">基本信息</view>
				<view class="base-info-wrap">
					<view class="bi-head">
						<image v-if="baseInfo.avatar" :src="baseInfo.avatar"></image>
						<image v-if="!baseInfo.avatar"  src="/static/header.jpg"></image>
					</view>
					<view class="bi-content">
						<view class="bi-name">
							{{baseInfo.name}}
							<text class="bi-level">四星店员</text>
						</view>
						<text class="bi-base-text">电话：{{baseInfo.mobile}}</text>
						<text class="bi-base-text">工作状态：<text>{{baseInfo.workStatus || '正常'}}</text></text>
						<text class="bi-base-text">性别：{{baseInfo.sex || '保密'}}</text>
						<text class="bi-base-text">职位：{{baseInfo.title || '-'}}</text>
						<text class="bi-base-text">所属团队：{{baseInfo.deptArr[baseInfo.deptArr.length - 1] || '-'}}</text>
					</view>
				</view>
			</view>
<!-- 			<view class="card">
				<view class="card-title">星委会职位</view>
				<view class="position-way" v-for="position in positionWay">·{{position}}</view>
			</view>
			<view class="card">
				<view class="card-title">星路历程</view>
				<time-line :list="timeLineList"></time-line>
			</view> -->
		</view>
	</view>
</template>

<script>
	import committeeApi from '../../http/apis-committee.js'
	export default {
		data() {
			return {
				containerHeight: `calc(100vh - ${getApp().globalData.statusBarHeight}px - 48px)`,
				id: '',
				title: '',
				baseInfo: {
					name: '',
					starLevel: '',
					mobile: '',
					position: '',
					gender: '',
					jobStatus: '',
					groupName: '',
					deptArr: []
				},
				positionWay: [
					'总委会/互帮互助执委',
					'天津星委会/主委',
					'天津星委会/互帮互助执委',
					'天津星委会/第一星小组组员'
				],
				timeLineList: [
					{
						date: '2/25',
						year: '2021',
						title: '入职绝味',
						desc: '加入绝味大家庭'
					},
					{
						date: '2/25',
						year: '2021',
						title: '三星店员',
						desc: '您参加了星空训练营第三期活动，并获得升星勋章',
						image: '/static/home/level-1-personnel.png'
					},
					{
						date: '2/25',
						year: '2021',
						title: '四星店员',
						desc: '您参加了星空训练营第三期活动，并获得升星勋章',
						image: '/static/home/level-2-leader.png'
					}
				]
			}
		},
		methods: {
			getUserInfo() {
				committeeApi.getUserInfoById(this.id).then(res => {
					console.log(res)
					this.baseInfo = res
					this.baseInfo.deptArr = this.getDeptArr(res.deprecatedList)
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
