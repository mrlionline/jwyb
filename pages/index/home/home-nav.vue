<template>
	<view class="home-nav">
		<home-nav-item v-for="item in config" :item="item"></home-nav-item>
	</view>
</template>

<script>
	import HomeNavItem from './home-nav-item.vue'
	export default{
		components: {
			HomeNavItem
		},
		props: [
			'config'
		],
		data(){
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.home-nav{
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 32rpx 0;
		background-color: #ffffff;
	}
</style>