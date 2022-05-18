<template>
	<view class="page-container homepage">
		<view class="home-page-nav">
			<view class="nav-l">
				<image class="nav-home-icon" src="/static/nav_home.png"></image>
				<text>主页</text>
			</view>
			<image class="nav-close-icon" src="/static/nav_close.png" @click="exit"></image>
		</view>

		<view class="btn-area">

			<image class="btn" src="/static/home_pic_warehouse.png" mode="widthFix"
				@click="navigateToPage('wareHousing')"></image>
			<image class="btn" src="/static/home_pic_pick.png" mode="widthFix" @click="navigateToPage('pickingOut')">
			</image>
			<image class="btn" src="/static/home_pic_stocktaking.png" mode="widthFix"
				@click="navigateToPage('inventory')"></image>

		</view>
	</view>
	</view>
</template>

<script>
	export default {
		methods: {
			exit() {
				plus.runtime.quit();
			},
			navigateToPage(type) {
				switch (type) {
					case 'wareHousing':
						console.log('wareHousing')
						uni.navigateTo({
							url: '/pages/wareHousing/wareHousing'
						});
						break;
					case 'pickingOut':
						uni.navigateTo({
							url: '/pages/pickingOut/pickingOut'
						});
						break;
					case 'inventory':
						uni.navigateTo({
							url: '/pages/inventory/inventory'
						});
						break;
				}


			},
		}
	}
</script>

<style>
	.homepage{
		padding: 65px 36px 0;
	}
	
	.home-page-nav {
		padding-top: 25px;
		width: 100vw;
		height: 65px;
		background: linear-gradient(327deg, #2F60E5 0%, #3984F5 100%);
		font-size: 15px;
		color: #FFFFFF;
		position: fixed;
		left: 0;
		top: 0;
	}

	.nav-l {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translate(0, -50%);
		display: flex;
		align-items: center;
		margin-top: 12.5px;
	}

	.nav-home-icon {
		width: 20px;
		height: 20px;
		margin-right: 8px;
	}

	.nav-close-icon {
		width: 15px;
		height: 15px;
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translate(0, -50%);
		display: flex;
		align-items: center;
		margin-top: 12.5px;
	}

	.btn-area {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.btn {
		width: 100%;
		margin-bottom: 23px;
	}

	.btn:last-child {
		margin-bottom: 0;
	}
</style>
