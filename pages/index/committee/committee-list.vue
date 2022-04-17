<template>
	<view class="start-committee">
		<view class="country-committee" @click="goto('0', '总委会')">全国总委会</view>
		<view class="province-committee-wrap">
			<view
				class="province-committee-item"
				v-for="item in provinceCommitteeList"
				@click="goto(item.id, item.name)"
			>{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provinceCommitteeList: [
					{
						name: '山西星委会',
						id: '1'
					},{
						name: '河北星委会',
						id: '2'
					},{
						name: '广东星委会',
						id: '3'
					},{
						name: '北京星委会',
						id: '4'
					},{
						name: '天津星委会',
						id: '5'
					}
				]
			}
		},
		methods: {
			goto(id, name){
				uni.navigateTo({
					url: `./committee-detail?id=${id}&name=${name}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.start-committee{
		padding: 30px 20px;
	}
	.province-committee-wrap{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.country-committee{
		width: 250rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 5px;
		text-align: center;
		background-color: blue;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 16px;
		margin: 0 auto 50rpx;
	}
	.province-committee-item{
		margin-right: 30rpx;
		width: 196rpx;
		height: 50rpx;
		line-height: 50rpx;
		border: 1px solid blue;
		color: blue;
		font-size: 12px;
		border-radius: 3px;
		text-align: center;
		margin-bottom: 30rpx;
		&:nth-child(3){
			margin-right: 0;
		}
	}
</style>
