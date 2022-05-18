<template>
	<view class="page-container">
		<titleNView title="拣选详情" titleIcon="/static/nav_pick.png"></titleNView>
		<view class="text-area">
			<noBorderArea>
				<leftList :dataList="leftListData"></leftList>
			</noBorderArea>
			<view class="list-area">
				<view class="list-item" v-for="(item, idx) in sideListData" :key="idx">
					<borderArea>
						<sideList :dataList="item"></sideList>
					</borderArea>
				</view>
			</view>
			<view class="list-tips">
				<image class="tips-icon" src="/static/icon_prompt.png"></image>
				<text class="tips-text">托盘货物详情信息，包括订单号及内容</text>
			</view>
			<footerBtnList :btnList="footerBtn"></footerBtnList>
		</view>
		<messagePop v-show="tipchange" :tipword="tipword" @close="closeMsg" @callBack="callBack"></messagePop>
	</view>
</template>

<script>
	import {
		PDA_Picksdetails,
		PDA_PicksExwarehouse
	} from "@/api/api.js";
	export default {
		data() {
			return {
				_id: "",
				tipchange: false,
				tipword: "",
				ptype: false,
				backType: false,
				footerBtn: [{
						title: "拣选出库",
						background: " linear-gradient(180deg, #3882F4 0%, #2057EC 100%)",
						color: "#fff",
						callback: () => this.editPicking(),
					},
					{
						title: "整托出库",
						background: " linear-gradient(180deg, #3882F4 0%, #2057EC 100%)",
						color: "#fff",
						callback: () => this.openType(),
					},
				],
				leftListData: [],
				sideListData: [],
			};
		},
		methods: {
			closeMsg() {
				this.tipchange = false;
				this.tipword = "";
			},
			editPicking() {
				uni.navigateTo({
					url: "/pages/pickingIssue/pickingIssue",
				});
			},
			openType() {
				this.tipchange = true;
				this.tipword = "是否确认整托出库？";
				this.ptype = true;
			},
			callBack() {
				if (this.ptype) {
					this.ptype = false;
					let data = {
						tasknumber: this._id,
					};
					PDA_PicksExwarehouse(data)
						.then((res) => {
							if (res.responseCode == 0) {
								this.tipchange = true;
								this.tipword = res.responseMessage;
								this.backType = true;
							} else {
								this.tipchange = true;
								this.tipword = "条码校验失败！";
							}
						})
						.catch((err) => {
							this.tipchange = true;
							this.tipword = err.responseMessage || err.Message;
						});
				} else if (this.backType) {
					this.backType = false;
					this.tipchange = false;
					this.tipword = "";
					uni.navigateBack();
				}
			},
			getData(_id) {
				PDA_Picksdetails(_id)
					.then((res) => {
						if (res.responseCode == 0) {
							this._id = _id;
							this.leftListData = [{
									key: "任务号",
									value: res.responseMessage[0].tasknumber,
								},
								{
									key: "盘点地址",
									value: res.responseMessage[0].address,
								},
							];
							this.sideListData = res.responseMessage.map((item) => {
								return [{
										key: "条码",
										value: item.salesOrderNo,
									},
									{
										key: "销售订单号",
										value: item.barcode,
									},
									{
										key: "销售订单行号",
										value: item.salesorderlinenumber,
									},
									{
										key: "工单号",
										value: item.workorder,
									},
									{
										key: "重量",
										value: item.weight,
									},
									{
										key: "长度",
										value: item.length,
									},
									{
										key: "支号",
										value: item.Branchnumber,
									},
								];
							});
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
		onShow: function() {
			this.tipchange = false;
			this.tipword = "";
			if (this._id) {
				this.getData(this._id);
			}
		},
		onLoad: function(option) {
			this.getData(option.id);
		},
	};
</script>

<style>
	.text-area {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.list-area {
		margin-top: 10px;
		padding: 10px 10px 30px;
		width: 100%;
		flex: 1;
		background: #1c2c4a;
		border-radius: 8px;
		overflow-y: scroll;
	}

	.list-tips {
		width: calc(100% - 20px);
		height: auto;
		font-size: 14px;
		color: #d8995b;
		padding: 5px;
		background: #1c2c4a;
		box-sizing: border-box;
		position: fixed;
		left: 10px;
		bottom: 55px;
		display: flex;
		justify-content: flex-start;
		padding-left: 10px;
		word-break: break-all;
	}

	.tips-icon {
		width: 14px;
		height: 14px;
		margin-right: 6px;
		margin-top: 4px;
	}

	.tips-text {
		width: calc(100% - 14px);
	}

	.list-item {
		width: 100%;
		height: auto;
		margin-bottom: 10px;
	}
</style>
