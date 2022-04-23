<template>
	<view class="content">
		<page-header :title="title" :showBack="false"></page-header>
		<Home v-if="activeTabBar === 'home'"></Home>
		<My v-if="activeTabBar === 'my'"></My>
		<u-tabbar
			:value="activeTabBar"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="false"
			@change=tabBarChange($event)
		>
			<u-tabbar-item text="首页" name="home" icon="home"></u-tabbar-item>
			<u-tabbar-item text="我的" name="my" icon="account"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import My from './my/my.vue'
	import Home from './home/home.vue'
	export default {
		components: {
			My, Home
		},
		data() {
			return {
				activeTabBar: 'home'
			}
		},
		onLoad() {
			const token = uni.getStorageSync('token');
				console.log('token', token)
			if(!token){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		},
		methods: {
			tabBarChange(e){
				this.activeTabBar = e
			}
		},
		computed: {
			title: function(){
				return this.activeTabBar === 'home' ? '首页' : '我的'
			}
		}
	}
</script>

<style>
	
</style>
