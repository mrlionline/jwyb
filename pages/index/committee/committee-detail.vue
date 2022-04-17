<template>
	<view>
		<u-tabs
			v-if="!isGlobal"
			:list="[{name: '成员星系'},{name: '星小组信息'}]"
			:scrollable="false"
			@change="tabChange"
		></u-tabs>
		<committeeMember v-if="tabIndex === 0" :committeeId="id"></committeeMember>
		<committeeGroup v-if="tabIndex === 1" :committeeId="id"></committeeGroup>
	</view>
</template>

<script>
	import committeeMember from './committee-member.vue'
	import committeeGroup from './committee-group.vue'
	export default {
		components:{
			committeeMember,
			committeeGroup
		},
		data() {
			return {
				id: '',
				tabIndex: 0
			}
		},
		methods: {
			tabChange(item){
				console.log(item)
				this.tabIndex = item.index
			}
		},
		computed: {
			isGlobal: function(){
				return this.id === '0'
			}
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			this.id = option.id
			uni.setNavigationBarTitle({
			    title: option.name
			});
		}
	}
</script>

<style>

</style>
