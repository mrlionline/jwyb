<template>
	<view class="content">
		<u-button class="btn" type="primary" text="星空胶囊" @click="goto('./capsule/capsule')"></u-button>
		<u-button class="btn" type="primary" :plain="true" text="星委会" @click="goto('./committee/committee-list')"></u-button>
		<u-button class="btn" type="primary" text="登录页" @click="goto('../login/login')"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		methods: {
			goto(url){
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style>
	.btn{
		width: 300px;
		margin-right: 10px;
	}
</style>
