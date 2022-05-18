<template>
	<view class="page-container inventoryModification">
		<titleNView title="盘点修改" titleIcon="/static/nav_stocktaking.png"></titleNView>
		<view class="text-area">
			<view class="search-bar">
				<uni-easyinput v-model="value" type="number" :styles="{ color: '#fff', borderColor: '#385A91' }">
				</uni-easyinput>
				<image class="search-icon" src="/static/icon_search.png" @click="searchTraybarcode"></image>
			</view>
			<view class="inventoryModification-content">
				<view class="inventoryModification-list">
					<view class="inventoryModification-label">原始值</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">销售订单号</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.barcode
            }}</text>
					</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">销售订单行号</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.salesorderlinenumber
            }}</text>
					</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">工单号</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.workorder
            }}</text>
					</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">重量</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.weight
            }}</text>
					</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">长度</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.length
            }}</text>
					</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">支号</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.Branchnumber
            }}</text>
					</view>
				</view>
				<view class="inventoryModification-list">
					<view class="inventoryModification-label">修改值</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">销售订单号</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.barcode
            }}</text>
					</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">销售订单行号</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.salesorderlinenumber
            }}</text>
					</view>
					<view class="inventoryModification-list-item">
						<text class="inventoryModification-list-key">工单号</text>
						<text class="inventoryModification-list-value">{{
              itemInfo.workorder
            }}</text>
					</view>
					<view class="inventoryModification-list-item inputPadding">
						<text class="inventoryModification-list-key">重量</text>
						<uni-easyinput v-model="inputList[0]" type="number" :focus="isFocus" :clearable="false"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
					<view class="inventoryModification-list-item inputPadding">
						<text class="inventoryModification-list-key">长度</text>
						<uni-easyinput v-model="inputList[1]" type="number" :clearable="false" :styles="{
                color: '#fff',
                borderColor: '#385A91',
                textAlign: 'right',
              }">
						</uni-easyinput>
					</view>
					<view class="inventoryModification-list-item inputPadding">
						<text class="inventoryModification-list-key">支号</text>
						<uni-easyinput v-model="inputList[2]" type="number" :clearable="false"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
				</view>
			</view>
			<footerBtnList :btnList="footerBtn"></footerBtnList>
		</view>
		<messagePop v-show="tipchange" :tipword="tipword" @close="closeMsg" @callBack="callBack"></messagePop>
	</view>
</template>

<script>
	import {
		PDA_InventorymodificationSel,
		PDA_Inventorymodification,
	} from "@/api/api.js";
	export default {
		data() {
			return {
				isFocus: false,
				_tasknumber: "",
				_Traybarcode: "",
				tipchange: false,
				tipword: "",
				ptype: false,
				backType: false,
				value: "",
				inputList: ["", "", ""],
				itemInfo: {
					Branchnumber: "",
					Traybarcode: "",
					address: "",
					barcode: "",
					length: "",
					salesOrderNo: "",
					salesorderlinenumber: "",
					tasknumber: "",
					weight: "",
					workorder: "",
				},
				footerBtn: [{
					title: "修改",
					background: "linear-gradient(180deg, #F49638 0%, #EC7220 100%)",
					color: "#fff",
					callback: () => this.openType(),
				}, ],
			};
		},
		methods: {
			closeMsg() {
				this.tipchange = false;
				this.tipword = "";
			},
			openType() {
				this.tipchange = true;
				this.tipword = "是否确认盘点无误？";
				this.ptype = true;
			},
			callBack() {
				if (this.ptype) {
					this.ptype = false;
					let data = {
						...this.itemInfo,
						weight: this.inputList[0],
						length: this.inputList[1],
						Branchnumber: this.inputList[2],
					};
					PDA_Inventorymodification(data)
						.then((res) => {
							if (res.responseCode == 0) {
								this.tipchange = true;
								this.tipword = "修改成功！";
								this.backType = true;
								// this.InventorymodificationSel(data.tasknumber, data.Traybarcode);
								// this.value = "";
							} else {
								this.tipchange = true;
								this.tipword = res.responseMessage;
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
			searchTraybarcode() {
				this.InventorymodificationSel(this._tasknumber, this.value);
			},
			InventorymodificationSel(tasknumber, Traybarcode) {
				this._tasknumber = tasknumber;
				this._Traybarcode = Traybarcode;
				PDA_InventorymodificationSel(tasknumber, Traybarcode)
					.then((res) => {
						if (res.responseCode == 0) {
							this.itemInfo = res.responseMessage;
						} else {
							this.tipchange = true;
							this.tipword = "条码校验失败！";
							this.itemInfo = {
								Branchnumber: "",
								Traybarcode: "",
								address: "",
								barcode: "",
								length: "",
								salesOrderNo: "",
								salesorderlinenumber: "",
								tasknumber: "",
								weight: "",
								workorder: "",
							};
						}
					})
					.catch((err) => {
						this.tipchange = true;
						this.tipword = err.responseMessage || err.Message;
					});
			},
		},
		onLoad: function(option) {
			this.InventorymodificationSel(option.tasknumber, option.Traybarcode);
		},
		onShow: function() {
			this.$nextTick(function() {
				// setTimeout(() => this.isFocus = true)
			})
		}
	};
</script>

<style>
	.inventoryModification {
		padding-top: 70px;
	}

	.inventoryModification /deep/ .uni-easyinput__content {
		min-height: 32px;
	}

	.inventoryModification /deep/ .uniui-clear {
		width: 28px;
		height: 28px;
		color: #446fb4 !important;
		font-size: 28px !important;
		line-height: 28px !important;
		padding: 0;
		margin-right: 5px;
	}

	.inventoryModification .inventoryModification-list-item /deep/ .uni-input-input {
		text-align: right;
	}

	.text-area {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.inventoryModification-content {
		width: 100%;
		flex: 1;
		border-radius: 8px;
		overflow-y: scroll;
	}

	.search-bar {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.search-icon {
		width: 20px;
		height: 20px;
		margin-left: 10px;
	}

	.inventoryModification-list {
		width: 100%;
		height: auto;
		background: #1c2c4a;
		border-radius: 4px;
		overflow: hidden;
		padding: 40px 13px 20px;
		margin-bottom: 10px;
		position: relative;
	}

	.inventoryModification-label {
		width: 82px;
		height: 25px;
		background: linear-gradient(134deg, #7586a5 0%, #243655 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 15px;
		position: absolute;
		left: 0;
		top: 0;
	}

	.inventoryModification-list-item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 12px;
		line-height: 20px;
	}

	.inputPadding {
		align-items: center;
		margin-bottom: 20px;
	}

	.inventoryModification-list-item:last-child {
		margin-bottom: 0;
	}

	.inventoryModification-list-key {
		width: 100px;
		color: #b5c5e5;
	}

	.inventoryModification-list-value {
		flex: 1;
		color: #ffffff;
		text-align: right;
	}

	.inventoryModification-list-input {
		width: 152px;
		height: 32px;
		background: rgba(47, 64, 96, 0.39);
		border: 1px solid #385a91;
		opacity: 1;
		border-radius: 2px;
		text-align: right;
		color: #fff;
	}
</style>
