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
				pdfProgress: 0
			}
		},
		methods: {
			message(e){
				console.log('!!!!!!!!!!!!', e.detail.data)
				if(e && e.detail && e.detail.data && e.detail.data.length){
					this.pdfProgress = e.detail.data[e.detail.data.length - 1].progress
				}
			}
		},
		onLoad(e) {
			this.link = decodeURIComponent(e.url)
			this.type = e.type
		},
		onUnload(){
			if(this.type === 'study'){
				uni.$emit('study-done', this.pdfProgress)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
