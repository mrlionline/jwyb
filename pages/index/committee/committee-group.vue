<template>
	<view>
		<view>星小组信息</view>
		<view @click="goto()">王小刚</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goto(){
				uni.navigateTo({
					url: `./committee-person-detail?personId=2&personName=王小刚`
				});
			}
		}
	}
</script>

<style>

</style>
