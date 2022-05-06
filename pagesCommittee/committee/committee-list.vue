<template>
	<view>
		<page-header title="星委会"></page-header>
		<view class="container">
			<view
				class="committee-item-group"
				@click="goto({id:committeeTree.id,name:'全国总委会'})"
			>
				<view class="item-border-left" :style="{'background-color': '#567DF4'}"></view>
				<view class="committee-item">
					<image class="item-icon" src="/pagesCommittee/static/star2.png"></image>
					<text class="item-name">全国总委会</text>
					<view class="item-arrow">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view
				class="committee-item-group"
				:class="{'committee-list-show': marketCommitteeShow}"
				ref=""
				@click="marketClick()"
			>
				<view class="item-border-left" :style="{'background-color': '#F2731E'}"></view>
				<view class="committee-item">
					<image class="item-icon" src="/pagesCommittee/static/star1.png"></image>
					<text class="item-name">市场星委会</text>
					<view class="item-arrow">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="committee-list">
					<view class="committee-list-item" v-for="(item,index) in committeeTree.children" @click.stop="goto(item)">
						<image src="/pagesCommittee/static/star3.png"></image>
						<text>{{item.name}}</text>
						<view class="item-arrow-sm">
							<u-icon name="arrow-right"></u-icon>
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
				marketCommitteeShow: false,
				marketCommitteeList: [],
				committeeTree: {}
			}
		},
		methods: {
			goto(item){
				uni.navigateTo({
					url: `/pagesCommittee/committee/committee-person-list?id=${item.id}&name=${item.name}`
				})
			},
			marketClick(){
				this.marketCommitteeShow = !this.marketCommitteeShow
			}
		},
		created() {
			committeeApi.getCommittee().then(res => {
				this.committeeTree = res;
			})
		}
	}
</script>

<style lang="scss">
	.container{
		position: fixed;
		bottom: 0;
		padding: 24px;
		width: 100%;
		height: calc(100vh - var(--status-bar-height) - 44px);
		background: #F5F6F7;
		z-index: 1;
		overflow-y: auto;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}
	.committee-list{
		display: none;
		width: 590rpx;
		margin: 0 auto;
		transition: .3s;
		overflow: hidden;
		.committee-list-item{
			position: relative;
			display: flex;
			align-items: center;
			width: 590rpx;
			height: 80rpx;
			background-color: #F5F6F7;
			margin-bottom: 16rpx;
			border-radius: 16rpx;
			&:first-child{
				margin-top: 30rpx;
			}
			image{
				width: 32rpx;
				height: 32rpx;
				margin: 0 24rpx 0 32rpx;
			}
			text{
				font-size: 15px;
				color: #444251;
				font-size: 15px;
			}
			.item-arrow-sm{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 13px;
			}
		}
	}
	.committee-list-show{
		.committee-list{
			display: block;
			border-top: 1px dashed #D7D9DB;
		}
		.item-arrow{
			transform: translateY(-50%) rotate(90deg) !important;
		}
	}
	.committee-item-group{
		position: relative;
		padding-left: 4px;
		border-radius: 8rpx;
		overflow: hidden;
		margin-bottom: 16px;
		background-color: #fff;
		.item-border-left{
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			width: 4px;
		}
	}
	.committee-item{
		position: relative;
		display: flex;
		align-items: center;
		width: 654rpx;
		height: 112rpx;
		background: #FFFFFF;
		box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
		.item-icon{
			width: 48rpx;
			height: 48rpx;
			margin-left: 20px;
			margin-right: 20px;
		}
		.item-name{
			font-size: 15px;
			color: #444251;
		}
		.item-arrow{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 23.5px;
			transition: .3s;
		}
	}
</style>
