<template>
	<view style="height: 100vh;">
		<!-- <swiper class="swiper" :indicator-dots="false" :autoplay="false" :vertical="true">
			<swiper-item>
				<view class="swiper-item uni-bg-red">A</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green">B</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-blue">C</view>
			</swiper-item>
		</swiper> -->
		<swiper style="height: 100%;" :indicator-dots="false" :autoplay="false" :vertical="true">
			<swiper-item :style="{background: pageItem.background}" v-for="pageItem in pageList" style="">
				<view class="swiper-item uni-bg-red">{{pageItem.name}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageList: [
					{
						name:'a',
						background: 'red'
					},
					{
						name: 'b',
						background: 'yellow'
					},{
						name: 'c',
						background: 'blue'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
