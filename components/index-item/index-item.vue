<template>
	<view class="index-item" @click="c()">
		<view class="icon" :style="{background: icon}"></view>
		<text>{{name}}</text>
	</view>
</template>

<script>
	export default {
		name:"index-item",
		props:[
			'icon',
			'name'
		],
		data() {
			return {
				
			};
		},
		methods:{
			c(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
	.index-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 150rpx;
	}
	.icon{
		width: 100rpx;
		height: 100rpx;
	}
</style>
