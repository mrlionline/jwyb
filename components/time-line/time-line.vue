<template>
	<view class="time-line" :class="{'theme-dark': theme === 'dark'}">
		<view class="time-line-item" v-for="(item,index) in list">
			<view class="time">
				<view class="time-date">{{item.date}}</view>
				<view class="time-year">{{item.year}}</view>
			</view>
			<view class="dot">
				<image src="/static/dot.png"></image>
			</view>
			<view class="content-wrap">
				<view class="title">{{item.title}}</view>
				<view class="content" :class="{'no-border-left' : index === list.length - 1}">
					<view class="desc">{{item.desc}}</view>
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
			width: 24px;
			height: 24px;
			padding: 4px;
			image{
				max-width: 100%;
				max-height: 100%;
			}
		}
		.content-wrap{
			width: calc(100% - 88rpx - 24px);
			.title{
				padding-left: 10px;
				line-height: 24px;
				font-size: 15px;
				color: #444251;
			}
			.content{
				max-width: calc(100% + 12px);
				min-height: 130rpx;
				padding-left: 20px;
				margin-left: -12px;
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
		.time-line-item .time{
			color: #FFE164;
		}
		.time-line-item .content-wrap .title,
		.time-line-item .content-wrap .content .desc,{
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
