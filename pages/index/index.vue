<template>
	<view class="container">
		<uni-nav-bar :statusBar="true">
		    <view>标题栏</view>
		    <template v-slot:left>
		      <view>left</view>
		    </template>
		    <template v-slot:right>
		      <view>right</view>
		    </template>
		  </uni-nav-bar>
		<view class="function-wrap">
			<index-item
				v-for="(item,index) in functionList"
				:name="item.name"
				:icon="item.icon"
				@click="goto(item.url)" 
			></index-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				functionList: [
					{
						icon: 'red',
						name: '星空胶囊',
						url: '/pages/start-capsule/start-capsule'
					},
					{
						icon: 'blue',
						name: '星委会',
						url: '/pages/start-committee/start-committee'
					}
				]
			}
		},
		methods: {
			goto(url){
				uni.navigateTo({
					url: url,
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		font-size: 14px;
	}
	.function-wrap{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
</style>
