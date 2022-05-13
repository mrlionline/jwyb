<template>
	<view class="time-line" :class="{'theme-dark': theme === 'dark'}">
		<view class="time-line-item" v-for="(item,index) in list">
			<view class="time">
				<view class="time-date" style="font-weight: bold;">{{item.date}}</view>
				<view class="time-year" style="font-weight: bold;">{{item.year}}</view>
			</view>
			<view class="dot">
				<image src="/static/time-line-dot.png"></image>
			</view>
			<view class="content-wrap">
				<view class="title" style="font-weight: bold;">{{item.title || ''}}</view>
				<view
					class="content"
					:class="{
						'linear-gradient': theme === 'dark' && index === list.length - 1,
						'no-border-left' : index === list.length - 1
					}"
				>
					<view class="desc">{{item.desc || ''}}</view>
					<template v-if="item.scoreInfo && item.scoreInfo.length">
						<view class="desc" v-for="score in item.scoreInfo">{{score.name}}: {{score.value}}</view>
					</template>
					<view class="image" v-if="item.image">
						<image :src="item.image"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"time-line",
		props: {
			theme: {
				type: String,
				validator: function (value) {
					// 这个值必须匹配下列字符串中的一个
					return ['light', 'dark'].indexOf(value) !== -1
				},
				default: 'light'
			},
			list: Array
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.time-line-item{
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		width: 100%;
		.time{
			width: 88rpx;
			color: #567DF4;
		}
		.dot{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 48rpx;
			height: 48rpx;
			padding: 8rpx;
			image{
				max-width: 100%;
				max-height: 100%;
			}
		}
		.content-wrap{
			width: calc(100% - 88rpx - 24px);
			.title{
				padding-left: 10px;
				line-height: 48rpx;
				font-size: 15px;
				color: #444251;
				height: 48rpx;
			}
			.content{
				max-width: calc(100% + 12px);
				min-height: 130rpx;
				padding-left: 20px;
				margin-left: -24rpx;
				border-left: 1px solid #BECEFF;
				overflow: hidden;
				&.no-border-left{
					border-left: 0;
				}
				.desc{
					line-height: 18px;
					font-size: 13px;
					color: #959BA4;
				}
				.image{
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 20px 0;
					width: 216rpx;
					height: 216rpx;
					padding: 30rpx;
					image{
						max-width: 100%;
						max-height: 100%;
					}
				}
			}
		}
	}
	.theme-dark{
		.time-line-item .time,
		.time-line-item .content-wrap .title{
			color: #FFD940;
		}
		.time-line-item .content-wrap .linear-gradient{
			position: relative;
		}
		.time-line-item .content-wrap .linear-gradient::before{
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			width: 1px;
			background-image: linear-gradient(180deg, #BECEFF, transparent);
		}
		.time-line-item .content-wrap .content .desc{
			color: #FFFFFF;
		}
		.time-line-item .content-wrap .content .image{
			background: rgba(118,152,255,0.10);
			box-shadow: 0 2px 10px 0 rgba(17,5,116,0.40);
			border-radius: 8px;
			border: 1px solid #BEE9FF;
		}
	}
</style>
