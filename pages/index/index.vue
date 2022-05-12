<template>
	<view class="content">
		<page-header :title="title" :showBack="false"></page-header>
		<Home v-if="activeTabBar === 'home'"></Home>
		<My v-if="activeTabBar === 'my'"></My>
		<u-tabbar
			:value="activeTabBar"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
			activeColor="#000000"
			@change=tabBarChange($event)
		>
			<u-tabbar-item text="首页" name="home">
				<image
					class="tab-bar-icon"
					slot="active-icon"
					src="/static/tabBarHomeActive.png"
				></image>
				<image
					class="tab-bar-icon"
					slot="inactive-icon"
					src="/static/tabBarHome.png"
				></image>
			</u-tabbar-item>
			<u-tabbar-item text="我的" name="my">
				<image
					class="tab-bar-icon"
					slot="active-icon"
					src="/static/tabBarMyActive.png"
				></image>
				<image
					class="tab-bar-icon"
					slot="inactive-icon"
					src="/static/tabBarMy.png"
				></image>
			</u-tabbar-item>
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
	.tab-bar-icon{
		width: 44rpx;
		height: 44rpx;
	}
</style>
