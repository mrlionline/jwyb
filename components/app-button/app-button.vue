<template>
	<text @click="outClick" :class="type" :style="{'width': width}">{{text}}</text>
</template>

<script>
	export default {
		name:"app-button",
		props: {
			'text': String,
			'type': {
				validator: function (value) {
					// 这个值必须匹配下列字符串中的一个
					return ['default', 'primary'].indexOf(value) !== -1
				},
				default: 'primary'
			},
			'width': {
				type: String,
				default: '558rpx'
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			outClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	text{
		display: inline-block;
		height: 108rpx;
		line-height: 108rpx;
		color: #fff;
		text-align: center;
		border-radius: 24px;
		font-size: 18px;
	}
	.default{
		background: rgba(117,151,255,0.40);
		border: 1px solid #567DF4;
		box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
	}
	.primary{
		background: #567DF4;
		border-radius: 24px;
	}
</style>