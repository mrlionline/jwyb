<template>
	<view class="content">
		<page-header title="首页" :showBack="false"></page-header>
		<view class="container">
			<home-item v-for="item in list" :item="item"></home-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '星空胶囊',
						url: '',
						imgSrc: ''
					},
					{
						name: '星委会',
						url: '/pages/committee/committee-list',
						imgSrc: ''
					}
				]
			}
		},
		created() {
		},
		methods: {
			goto(url){
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style>
	.container{
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 34px 24px;
		width: 100%;
		height: 79%;
		background: #FFFFFF;
		z-index: 1;
		overflow-y: auto;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}
</style>
