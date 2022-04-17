<template>
	<view>
		<view>成员星系</view>
		<view @click="goto()">主委-李小红</view>
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
					url: `./committee-person-detail?personId=1&personName=李小红`
				});
			}
		}
	}
</script>

<style>

</style>
