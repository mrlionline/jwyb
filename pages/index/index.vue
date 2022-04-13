<template>
	<view class="container">
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
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.function-wrap{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
</style>
