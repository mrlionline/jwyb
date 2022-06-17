<template>
	<view class="water_top" style="pointer-events: none;">
	    <view class="water-text">{{watermarkText}}</view>
	    <view class="water-text">{{watermarkText}}</view>
	    <view class="water-text">{{watermarkText}}</view>
	    <view class="water-text">{{watermarkText}}</view>
	    <view class="water-text">{{watermarkText}}</view>
	    <view class="water-text">{{watermarkText}}</view>
	    <view class="water-text">{{watermarkText}}</view>
	    <view class="water-text">{{watermarkText}}</view>
	    <view class="water-text">{{watermarkText}}</view>
	</view>
</template>

<script>
	export default {
		name:"watermark",
		props: {
			userMessage: {
				type: String,
				default: "绝味"
			},
		},
		data() {
			return {
				watermarkText:'绝味鸭脖'
			};
		},
		created() {
			console.info("你好呀………………………………")
		},
		onReady() {
			
		},
		lifetimes:{
		    attached(){
		      this.watermarkText = this.watermarkText + this.userMessage
		    }
		},
		methods: {
			getTotal(scoreInfo) {
				const res = scoreInfo.reduce((pre, cur) => {
					return pre + parseFloat(cur.value)
				},0);
				return res.toFixed(2)
			},
			attached(){
			  this.watermarkText = this.watermarkText + this.userMessage
			}
		}
	}
</script>

<style lang="scss">
	.water_top{
	  position: fixed;
	  top:0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  transform:rotate(-12deg); /** 旋转 可自己调整 **/
	  z-index: 9999;
	}
	.water-text{
	  float: left;
	  width:375rpx;
	  color: rgba(169,169,169,.2);
	  text-align: center;
	  font-size: 95%;
	  margin: 100rpx 0; /** 间距 可自调 **/
	}
</style>
