<template>
	<view>
		<page-header title="星委会"></page-header>
		<view class="container">
			<view
				class="committee-item"
				v-for="(item,index) in committeeList"
				@click="goto(item)"
			>
				<view class="item-border-left" :style="{'background-color': item.id === '0' ? '#567DF4' : '#F2731E'}"></view>
				<image class="item-icon" :src="item.icon"></image>
				<text class="item-name">{{item.name}}</text>
				<view class="item-arrow">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				committeeList: [
					{
						name: '全国总委会',
						id: '0',
						icon: '/static/my/star@3x.png'
					}
				]
			}
		},
		methods: {
			goto(item){
				uni.navigateTo({
					url: `/pages/committee/committee-person-list?id=${item.id}&name=${item.name}`
				})
			}
		},
		created() {
			for (let i = 1; i < 34; i++) {
				this.committeeList.push({
					name: '河北分委会' + i,
					id: i + '',
					icon: '/static/my/star@3x.png'
				})
			}
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
	.committee-item{
		position: relative;
		display: flex;
		align-items: center;
		width: 654rpx;
		height: 112rpx;
		border-radius: 8px;
		background: #FFFFFF;
		box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
		margin-bottom: 16px;
		overflow: hidden;
		.item-icon{
			width: 24px;
			height: 24px;
			margin-left: 20px;
			margin-right: 20px;
		}
		.item-name{
			font-size: 15px;
			color: #444251;
		}
		.item-border-left{
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			width: 4px;
		}
		.item-arrow{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 23.5px;
		}
	}
</style>
