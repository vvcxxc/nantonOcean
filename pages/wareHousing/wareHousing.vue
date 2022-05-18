<template>
	<view class="page-container">
		<titleNView title="入库" titleIcon="/static/nav_warehouse.png"></titleNView>
		<view class="btn-area">
			<view class="btn" v-for="(item, idx) in btnList" :key="idx" @click="item.callback">{{ item.title }}</view>
		</view>

		<messagePop v-show="tipchange" :tipword="tipword" @callBack="warehousing" @close="closeMsg"></messagePop>
	</view>
</template>

<script>
	import {
		PDA_Warehousing
	} from "@/api/api.js";
	export default {
		data() {
			return {
				tipword: "",
				tipchange: false,
				housingType: 0,
				btnList: [{
						title: "空托入库",
						callback: () => this.EmptyConsignmentWarehousing(),
					},
					{
						title: "带钢管托入库",
						callback: () => this.storageSteelPipeBracket(),
					},
					{
						title: "大卷入库",
						callback: () => {
							let data = {
								type: 3,
							};
							PDA_Warehousing(data)
								.then((res) => {
									if (res.responseCode == 0) {
										uni.navigateTo({
											url: "/pages/largeVolumeWarehousing/largeVolumeWarehousing",
										})
									} else {
										this.tipchange = true;
										this.tipword = res.responseMessage;
									}
								})
								.catch((err) => {
									this.tipchange = true;
									this.tipword = err.responseMessage || err.Message;
								});
						},
					},
					{
						title: "小卷入库",
						callback: () => {
							let data = {
								type: 4,
							};
							PDA_Warehousing(data)
								.then((res) => {
									if (res.responseCode == 0) {
										uni.navigateTo({
											url: "/pages/smalVolumeWarehousing/smalVolumeWarehousing",
										})
									} else {
										this.tipchange = true;
										this.tipword = res.responseMessage;
									}
								})
								.catch((err) => {
									this.tipchange = true;
									this.tipword = err.responseMessage || err.Message;
								});
						},
					},
				],
			};
		},
		methods: {
			EmptyConsignmentWarehousing() {
				this.housingType = 1;
				this.tipword = "是否确认为空托入库？";
				this.tipchange = true;
			},
			storageSteelPipeBracket() {
				this.housingType = 2;
				this.tipword = "是否确认为带钢管托入库？";
				this.tipchange = true;
			},
			warehousing() {
				if (this.housingType == 1) {
					let data = {
						type: 1,
					};
					PDA_Warehousing(data)
						.then((res) => {
							if (res.responseCode == 0) {
								this.tipchange = true;
								this.tipword = "条码校验成功！";
							} else {
								this.tipchange = true;
								this.tipword = "条码校验失败！";
							}
						})
						.catch((err) => {
							this.tipchange = true;
							this.tipword = err.responseMessage || err.Message;
						});
				} else if (this.housingType == 2) {
					let data = {
						type: 2,
					};
					PDA_Warehousing(data)
						.then((res) => {
							if (res.responseCode == 0) {
								this.tipchange = true;
								this.tipword = "条码校验成功！";
							} else {
								this.tipchange = true;
								this.tipword = "条码校验失败！";
							}
						})
						.catch((err) => {
							this.tipchange = true;
							this.tipword = err.responseMessage || err.Message;
						});
				}
				this.housingType = 0;
			},
			closeMsg() {
				this.tipchange = false;
				this.tipword = "";
			},
		},
	};
</script>

<style>
	.btn-area {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.btn {
		width: 192px;
		height: 46px;
		background: linear-gradient(180deg, #36b5f3 0%, #2053ec 100%);
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		color: #ffffff;
		margin-bottom: 40px;
	}

	.btn:last-child {
		margin-bottom: 0;
	}
</style>
