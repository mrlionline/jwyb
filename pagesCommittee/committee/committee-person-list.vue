<template>
	<view>
		<page-header :title="title"></page-header>
		<view class="container">
			<view class="tabs" v-if="!isGlobal">
				<text class="tab-item" :class="{'tab-item-active': activeTabIndex === 0}" @click="tabChange(0)">成员星系</text>
				<text class="tab-item" :class="{'tab-item-active': activeTabIndex === 1}" @click="tabChange(1)">星小组信息</text>
			</view>
			
			<view class="position-list" v-show="activeTabIndex === 0">
				<view class="position-item" v-for="positionItem in positionList">
					<view class="pi-title">{{positionItem.name}}</view>
					<view v-if="positionItem.userInfos && positionItem.userInfos.length" class="member-box">
						<view class="member-item" v-for="(member,index) in positionItem.userInfos">
							<image v-if="member.avatar" class="memeber-head" :src="member.avatar"></image>
							<image v-if="!member.avatar" class="memeber-head" src="/static/header.jpg"></image>
							<view class="member-info">
								<text style="font-size: 15px;">{{member.name}}</text>
								<text style="font-size: 13px;">{{member.mobile}}</text>
								<view>
									<image style="width: 14px; height: 14px;" v-for="star in 5" src="../../static/my/star@3x.png"></image>
								</view>
							</view>
							<text class="member-start-level">{{member.starLevel || '五星主管'}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="star-group" v-show="activeTabIndex === 1">
				<view
					class="group-item"
					v-for="(groupItem,index) in groupList"
					:class="{'group-item-open': groupItem.open}"
				>
					<view class="group-info" @click="groupItemClick(groupItem)">
						<view class="group-logo">
							<image src="/pagesCommittee/static/group.png"></image>
						</view>
						<view class="group-info-content">
							<view class="gi-name">{{groupItem.name}}</view>
							<view class="gi-leader">组长：{{groupItem.leader.name}}</view>
							<view class="gi-member">组员：{{groupItem.members.slice(0, 3).map(item => item.name).join('、')}}
							{{(groupItem.members && groupItem.members.length > 3) ? ('等' + groupItem.members.length + '人') : ''}}
							</view>
						</view>
						<view class="gi-arrow">
							<u-icon name="arrow-down"></u-icon>
						</view>
					</view>
					<view class="member-list" :class="{'member-list-show': groupItem.open}">
						<view class="member-item" @click="goDetail(groupItem.leader)">
							<text class="member-position">组长</text>
							<text style="color: #444251;">{{groupItem.leader.name}}</text>
							<view class="member-item-arrow">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
						<view class="member-item" v-for="memberItem in groupItem.members" @click="goDetail(memberItem)">
							<text class="member-position">组员</text>
							<text style="color: #444251;">{{memberItem.name}}</text>
							<view class="member-item-arrow">
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import committeeApi from '../../http/apis-committee.js'
	export default {
		data() {
			return {
				id: '',
				title: '',
				activeTabIndex: 0,
				positionList: [],
				groupList: [],
				page: {
					pageSize: 30,
					pageNum: 1,
					totalNumber: 0
				}
			}
		},
		methods: {
			goDetail(item){
				console.log('###', item)
				uni.navigateTo({
					url: `/pagesCommittee/committee/committee-person-detail?id=${item.id}&name=${item.name}`
				})
			},
			groupItemClick(groupItem){
				groupItem.open = !groupItem.open
			},
			getMemberStar(){
				committeeApi.getMemberById(this.id).then(res => {
					this.positionList = res.starCouncilPositions;
					// this.positionList = [
					// 	{
					// 		position: '主委',
					// 		memberList: [
					// 			{
					// 				name: '李霞红',
					// 				mobile: '13112341234',
					// 				starNum: 5,
					// 				starLevel: '五星主管'
					// 			}
					// 		]
					// 	},
					// ]
				})
				
			},
			tabChange(index) {
				if (this.activeTabIndex === index) {
					return; 
				}
				this.activeTabIndex = index
				if (this.activeTabIndex === 0) {
					this.getMemberStar()
				}
				if (this.activeTabIndex === 1) {
					this.getGroupList(true)
				}
			},
			getGroupList(reset){
				if (reset) {
					this.page = {
						pageSize: 10,
						pageNum: 1,
						totalNumber: 0,
					}
				} else {
					this.page.pageNum += 1
				}
				committeeApi.getGroupList(this.id, this.page).then(res => {
					this.groupList = res.dataSet.map(item => ({ ...item, open: false }));
					this.page = {
						pageSize: res.pageSize,
						pageNum: res.pageNum,
						totalNumber: res.totalNumber,
					}
				})
				
			}
		},
		created() {	
			// this.getMemberStar()
			// this.getGroupList()
		},
		onLoad(query) {
			this.id = query.id;
			this.getMemberStar()
		},
		computed: {
			isGlobal: function(){
				return this.id === '' || this.id === '1'
			}
		}
	}
</script>

<style lang="scss">
	.container{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: calc(100vh - var(--status-bar-height) - 44px);
		background: #F5F6F7;
		z-index: 1;
		overflow-y: auto;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}
	.tabs{
		display: flex;
		justify-content: space-between;
		padding: 24px;
		.tab-item{
			width: 304rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
			border-radius: 8px;
			background-color: #DDE2EF;
			color: #444251;
			transition: .3s;
		}
		.tab-item-active{
			background-color: #567DF4;
			color: #FFFFFF;
		}
	}
	.position-item{
		padding: 24px;
		margin-bottom: 16px;
		background-color: #FFFFFF;
		&:last-child{
			margin: 0;
		}
		.pi-title{
			height: 16px;
			line-height: 16px;
			padding-left: 8px;
			color: #444251;
			font-size: 13px;
			border-left: 2px solid #567DF4;
		}
		.member-box{
			padding: 0 16px;
			border: 1px solid #D7D9DB;
			border-radius: 8px;
			margin-top: 8px;
		}
		.member-item{
			position: relative;
			display: flex;
			width: 100%;
			padding: 16px 0;
			border-bottom: 1px dashed #D7D9DB ;
			&:last-child{
				border: 0
			}
			.memeber-head{
				border-radius: 5px;
				width: 128rpx;
				height: 128rpx;
				margin-right: 16px;
			}
			.member-info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 128rpx;
				color: #444251;
			}
			.member-start-level{
				position: absolute;
				top: 16px;
				right: 0;
				height: 40rpx;
				line-height: 40rpx;
				padding: 0 20rpx;
				background: #FDF1E8;
				border-radius: 12px;
				color: #F2731E;
				font-size: 12px;
			}
		}
	}
	.star-group{
		.group-item{
			width: 654rpx;
			margin: 0 auto 32rpx;
			background: #FFFFFF;
			box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
			border-radius: 8px;
			.group-info{
				position: relative;
				display: flex;
				align-items: flex-start;
				padding: 48rpx 32rpx;
				.group-logo{
					display: inline-block;
					width: 80rpx;
					height: 80rpx;
					margin-right: 32rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.group-info-content{
					width: calc(100% - 160rpx);
					.gi-name{
						line-height: 21px;
						font-size: 15px;
						color: #444251;
					}
					.gi-leader{
						line-height: 18px;
						font-size: 13px;
						color: #444251;
						margin: 8px 0 4px;
					}
					.gi-member{
						line-height: 18px;
						font-size: 13px;
						color: #444251;
					}
				}
				.gi-arrow{
					position: absolute;
					right: 32rpx;
					top: 48rpx;
					transition: .3s;
					transform: rotate(0deg);
				}
			}
			&.group-item-open .gi-arrow{
				transform: rotate(180deg);
			}
			.member-list{
				margin: 0 32rpx;
				border: 0;
				padding: 0;
				height: 0;
				overflow: hidden;
				transition: .3s;
				&.member-list-show{
					height: auto;
					padding: 30rpx 0 48rpx;
					border-top: 1px dashed #D7D9DB ;
				}
				.member-item{
					position: relative;
					height: 80rpx;
					line-height: 80rpx;
					padding: 0 32rpx;
					background: #F5F6F7;
					border-radius: 8px;
					font-size: 15px;
					color: #959BA4;
					margin-bottom: 16rpx;
					.member-position{
						display: inline-block;
						width: 140rpx;
					}
					.member-item-arrow{
						position: absolute;
						right: 26rpx;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
	}
</style>
