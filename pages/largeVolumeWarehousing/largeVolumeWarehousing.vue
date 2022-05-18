<template>
	<view class="page-container largeVolumeWarehousing">
		<titleNView title="大卷入库" titleIcon="/static/nav_warehouse.png"></titleNView>
		<view class="text-area">
			<view class="largeVolumeWarehousing-area">
				<view class="input-item">
					<uni-easyinput v-model="value" type="number" :focus="isFocus"
						:styles="{ color: '#fff', borderColor: '#385A91' }">
					</uni-easyinput>
				</view>
			</view>
			<footerBtnList :btnList="footerBtn"></footerBtnList>
			<messagePop v-show="tipchange" :tipword="tipword" @close="closeMsg"></messagePop>
		</view>
	</view>
</template>

<script>
	import {
		PDA_WarehousingRun
	} from "@/api/api.js";
	export default {
		data() {
			return {
				isFocus: false,
				tipchange: false,
				tipword: "",
				value: "",
				footerBtn: [{
					title: "新建入库",
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
			sumbit() {
				if (!this.value) {
					this.tipchange = true;
					this.tipword = "请录入条码！";
					setTimeout(() => this.closeMsg(), 3000);
					return;
				}
				let data = {
					type: 3,
					warehousingBarcodes: [{
						Barcode: this.value,
					}, ],
				};
				PDA_WarehousingRun(data)
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
	.largeVolumeWarehousing {
		padding-top: 65px;
	}

	.largeVolumeWarehousing /deep/ .uni-easyinput__content {
		min-height: 32px;
	}

	.largeVolumeWarehousing /deep/ .uniui-clear {
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

	.largeVolumeWarehousing-area {
		margin-top: 10px;
		padding: 10px;
		width: 100%;
		flex: 1;
		background: #1c2c4a;
		border-radius: 8px;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.input-item {
		width: 100%;
		height: 30px;
	}
</style>
