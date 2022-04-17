<template>
	<view>
		<view>成员星系,id-{{committeeId}}</view>
		<view @click="goto()">主委-李小红</view>
	</view>
</template>

<script>
	export default {
		props:[
			'committeeId'
		],
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
