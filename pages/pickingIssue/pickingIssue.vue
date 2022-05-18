<template>
	<view class="page-container pickingIssue">
		<titleNView title="拣选出库" titleIcon="/static/nav_pick.png"></titleNView>
		<view class="text-area">
			<view class="top-tips">请扫描需要出库的货物条码</view>
			<view class="list-area">
				<view class="pickingIssue-list-item">
					<view class="pickingIssue-list-key">卷条码1</view>
					<view class="pickingIssue-list-value">
						<uni-easyinput v-model="inputList[0]" type="number" :focus="isFocus"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
				</view>
				<view class="pickingIssue-list-item">
					<view class="pickingIssue-list-key">卷条码2</view>
					<view class="pickingIssue-list-value">
						<uni-easyinput v-model="inputList[1]" type="number"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
				</view>
				<view class="pickingIssue-list-item">
					<view class="pickingIssue-list-key">卷条码3</view>
					<view class="pickingIssue-list-value">
						<uni-easyinput v-model="inputList[2]" type="number"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
				</view>
				<view class="pickingIssue-list-item">
					<view class="pickingIssue-list-key">卷条码4</view>
					<view class="pickingIssue-list-value">
						<uni-easyinput v-model="inputList[3]" type="number"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
				</view>
				<view class="pickingIssue-list-item">
					<view class="pickingIssue-list-key">卷条码5</view>
					<view class="pickingIssue-list-value">
						<uni-easyinput v-model="inputList[4]" type="number"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
				</view>
				<view class="pickingIssue-list-item">
					<view class="pickingIssue-list-key">卷条码6</view>
					<view class="pickingIssue-list-value">
						<uni-easyinput v-model="inputList[5]" type="number"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
				</view>
				<view class="pickingIssue-list-item">
					<view class="pickingIssue-list-key">卷条码7</view>
					<view class="pickingIssue-list-value">
						<uni-easyinput v-model="inputList[6]" type="number"
							:styles="{ color: '#fff', borderColor: '#385A91' }">
						</uni-easyinput>
					</view>
				</view>
				<view class="pickingIssue-list-item">
					<view class="pickingIssue-list-key">卷条码8</view>
					<view class="pickingIssue-list-value">
						<uni-easyinput v-model="inputList[7]" type="number"
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
		PDA_PicksExwarehouse
	} from "@/api/api.js";
	export default {
		data() {
			return {
				isFocus: false,
				tipchange: false,
				tipword: "",
				backType: false,
				inputList: ["", "", "", "", "", "", "", ""],
				footerBtn: [{
					title: "确认出库",
					background: " linear-gradient(180deg, #3882F4 0%, #2057EC 100%)",
					color: "#fff",
					callback: () => this.sumbit(),
				}, ],
			};
		},
		methods: {
			closeMsg() {
				this.tipchange = false;
				this.tipword = "";
			},
			nary(a) {
				var nary = a.sort();
				for (var i = 0; i < nary.length - 1; i++) {
					if (nary[i] == nary[i + 1]) {
						return true;
					}
				}
				return false;
			},
			sumbit(query) {
				let arr = this.inputList.filter((_) => _);
				if (!arr.length) {
					this.tipchange = true;
					this.tipword = "请录入条码！";
					setTimeout(() => this.closeMsg(), 3000);
					return;
				}
				if (this.nary(arr)) {
					this.tipchange = true;
					this.tipword = "请勿重复录入！";
					setTimeout(() => this.closeMsg(), 3000);
					return;
				}
				let warehousingBarcodes = arr.map((item) => {
					return {
						Barcode: item,
					};
				});
				let data = {
					type: 4,
					warehousingBarcodes,
				};
				PDA_PicksExwarehouse(data)
					.then((res) => {
						if (res.responseCode == 0) {
							this.tipchange = true;
							this.tipword = "条码校验成功！";
							this.backType = true;
							this.inputList = this.inputList.map((_) => "");
						} else {
							this.tipchange = true;
							this.tipword = "条码校验失败！";
						}
					})
					.catch((err) => {
						this.tipchange = true;
						this.tipword = err.responseMessage || err.Message;
					});
			},
			callBack() {
				if (this.backType) {
					this.backType = false;
					this.tipchange = false;
					this.tipword = "";
					uni.navigateBack();
				}
			},
		},
		onShow: function() {
			this.$nextTick(function() {
				// setTimeout(() => this.isFocus = true)
			})
		}
	};
</script>

<style>
	.pickingIssue {
		padding-top: 65px;
	}

	.pickingIssue /deep/ .uni-easyinput__content {
		min-height: 32px;
	}

	.pickingIssue /deep/ .uniui-clear {
		width: 28px;
		height: 28px;
		color: #446fb4 !important;
		font-size: 28px !important;
		line-height: 28px !important;
		padding: 0;
		margin-right: 5px;
	}

	.text-area {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.top-tips {
		width: 100%;
		height: 32px;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
	}

	.list-area {
		padding: 10px;
		width: 100%;
		flex: 1;
		background: #1c2c4a;
		border-radius: 8px;
		overflow-y: scroll;
	}

	.pickingIssue-list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		line-height: 20px;
	}

	.pickingIssue-list-item:last-child {
		margin-bottom: 0;
	}

	.pickingIssue-list-key {
		width: 67px;
		color: #fff;
		font-size: 14px;
	}

	.pickingIssue-list-value {
		flex: 1;
		height: 34px;
	}
</style>
