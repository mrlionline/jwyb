<script>
	export default {
		globalData: {
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
			wechatUserInfo: null
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	view{
		box-sizing: border-box;
	}
</style>