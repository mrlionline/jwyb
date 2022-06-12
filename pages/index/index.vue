<template>
	<view class="content">
		<Home v-if="activeTabBar === '首页'" :configList="configList"></Home>
		<My v-if="activeTabBar === '我的'"></My>
		<Information v-if="activeTabBar === '资讯'"></Information>
		<u-tabbar
			v-if="tabbarList && tabbarList.length"
			:value="activeTabBar"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
			activeColor="#000000"
			@change=tabBarChange($event)
		>
			<u-tabbar-item
				v-for="tabbar in tabbarList"
				:text="tabbar.label"
				:name="tabbar.name"
				:icon="tabbar.icon"
			>
				<!-- <image
					class="tab-bar-icon"
					slot="active-icon"
					src="/static/tabBarHomeActive.png"
				></image>
				<image
					class="tab-bar-icon"
					slot="inactive-icon"
					src="/static/tabBarHome.png"
				></image> -->
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import My from './my/my.vue'
	import Home from './home/home.vue'
	import Information from './information/information.vue'
	export default {
		components: {
			My, Home, Information
		},
		data() {
			return {
				activeTabBar: '首页',
				tabbarList: [],
				configList: []
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
			// uni.onAppShow(() => {
			// 	console.log('sdfsdf')
			// })
		},
		methods: {
			tabBarChange(e){
				this.activeTabBar = e
			},
			getConfig(){
				const res = [
					{
						name: 'banner',
						label: 'Banner',
						id: '',
						config: {
							showWeather: true,
							imgs: [{
									url: 'https://img.yzcdn.cn/vant/cat.jpeg',
									link: 'https://www.baidu.com',
									linkType: 'wx'
								},
								{
									url: 'https://img.yzcdn.cn/vant/cat.jpeg',
									link: 'https://www.baidu.com',
									linkType: 'outside'
								}
							]
						}
					},
					{
						name: 'navigation',
						label: '魔方导航',
						id: '',
						config: {
							navs: [
								{
									icon: '/static/home/home-capsule.png',
									link: '/pagesCapsule/capsule/capsule',
									linkType: 'wx',
									label: '星空胶囊'
								},
								{
									icon: '/static/home/home-committee.png',
									link: '/pagesCommittee/committee/committee-list',
									linkType: 'wx',
									label: '星委会'
								},
								{
									icon: '/static/home/home-committee.png',
									link: 'https://www.baidu.com/',
									linkType: 'wx',
									label: '星委会'
								},
								{
									icon: '/static/home/home-committee.png',
									link: '/pagesCommittee/committee/committee-list',
									linkTypea: 'wx',
									label: '星委会'
								},
								{
									icon: '/static/home/home-committee.png',
									link: '/pagesCommittee/committee/committee-list',
									linkTypea: 'wx',
									label: '星委会'
								}
							]
						}
					},
					{
					  name: 'bottomNav',
					  label: '底部导航',
					  id: '',
					  config: {
					    navs: [
					      {
					        name: '首页',
					        icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
					        link: 'https://www.baidu.com',
					        linkType: 'wx',
					        label: '首页'
					      },
					      {
					        name: '资讯',
					        icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
					        link: 'https://www.baidu.com',
					        linkType: 'wx',
					        label: '资讯'
					      },
					      {
					        name: '我的',
					        icon: 'https://img.yzcdn.cn/vant/cat.jpeg',
					        link: 'https://www.baidu.com',
					        linkType: 'wx',
					        label: '我的'
					      }
					    ]
					  }
					},
					{
					  name: 'card',
					  label: '图文卡片',
					  id: '',
					  config: {
					    cols: 2,
					    contents: [
					      {
					        type: 'exchange',
					        id: '',
					        label: '店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺店铺',
					        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
					        description: '描述',
					        descriptionVisible: true
					      },
					      {
					        type: 'lesson',
					        id: '',
					        label: '课程',
					        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
					        description: '描述',
					        descriptionVisible: true
					      },
					      {
					        type: 'signIn',
					        label: '签到',
					        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
					        description: '描述',
					        descriptionVisible: true
					      }
					    ]
					  }
					},
					{
					  name: 'news',
					  label: '资讯',
					  id: '',
					  config: {
					    title: '咨询头条',
					    contents: [
					      {
							  title: '习近平：推动增强历史自觉坚定文化自信',
							  createTime: '2022-05-28 13:03',
							  group: '绝味人资讯',
							  author: '王小利'
						  },
						  {
							  title: '习近平：推动增强历史自觉坚定文化自信',
							  createTime: '2022-05-28 13:03',
							  group: '绝味人资讯',
							  author: '王小利',
							  img: 'https://img.yzcdn.cn/vant/cat.jpeg'
						  }
					    ]
					  }
					}
				]
				const tabObj = res.splice(res.findIndex(item => item.name === 'bottomNav'), 1)[0]
				this.tabbarList = tabObj.config.navs
				this.activeTabBar = this.tabbarList[0].name
				this.configList = res
			}
		},
		created() {
			this.getConfig()
		}
	}
</script>

<style scoped>
	.content{
		background-color: #F3F5F7;
		min-height: 100vh;
	}
	.tab-bar-icon{
		width: 44rpx;
		height: 44rpx;
	}
</style>
