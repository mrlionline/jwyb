<template>
	<view class="my-web-view">
			<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				link: ''
			}
		},
		onLoad(e) {
			this.url = e.url
		}
	}
</script>

<style lang="scss" scoped>
</style>