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
		]
	}
</script>

<style lang="scss" scoped>
	.home-nav{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 34px 24px;
		& > *{
			display: inline-block;
		}
	}
</style>