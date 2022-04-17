<template>
	<view>
		<text>id{{personId}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				personId: ''
			}
		},
		methods: {
		
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			this.personId = option.personId
			uni.setNavigationBarTitle({
			    title: option.personName
			});
		}
	}
</script>

<style>

</style>
