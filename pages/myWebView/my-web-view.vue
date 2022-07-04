<template>
	<view class="my-web-view">
			<web-view v-if="link" :src="link" @message="message($event)"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				link: '',
				type: '',
			}
		},
		methods: {
			message(e){
				console.log('!!!!!!!!!!!!', e)
			}
		},
		onLoad(e) {
			this.link = decodeURIComponent(e.url)
			this.type = e.type
		},
		onUnload(){
			if(this.type === 'study'){
				uni.$emit('study-done')
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
