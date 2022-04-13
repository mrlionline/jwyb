<template>
	<view>
		<text>{{isNotGlobal}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: ''
			}
		},
		methods: {
			
		},
		computed: {
			isNotGlobal: function(){
				return this.id != '0'
			}
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			this.id = option.id
		}
	}
</script>

<style>

</style>
