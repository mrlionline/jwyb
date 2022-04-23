<template>
	<view>
		<page-header :title="title"></page-header>
		<view class="container">
			<view>全国总委会</view>
			<view>河北星委会</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				committeeList: [
					{}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.container{
		position: fixed;
		bottom: 0;
		display: flex;
		padding: 24px;
		width: 100%;
		height: calc(100vh - var(--status-bar-height) - 44px);
		background: #FFFFFF;
		z-index: 1;
		overflow-y: auto;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}
</style>
