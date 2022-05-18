import request from '../utils/request.js'

export function PDA_Login(params) {
	return request.globalRequest(`/api/PDA/PDA_Login`, 'POST', params)
}

export function PDA_Inventory(params) {
	return request.globalRequest(`/api/PDA/PDA_Inventory`, 'POST', params)
}

export function PDA_Picks(params) {
	return request.globalRequest(`/api/PDA/PDA_Picks`, 'POST', params)
}

export function PDA_Warehousing(params) {
	return request.globalRequest(`/api/PDA/PDA_Warehousing`, 'POST', params)
}

export function PDA_WarehousingRun(params) {
	return request.globalRequest(`/api/PDA/PDA_WarehousingRun`, 'POST', params)
}

export function PDA_Inventorysel(id) {
	return request.globalRequest(`/api/PDA/PDA_Inventorysel?tasknumber=${id}`, 'POST')
}

export function PDA_Picksdetails(id) {
	return request.globalRequest(`/api/PDA/PDA_Picksdetails?tasknumber=${id}`, 'POST')
}

export function PDA_PicksExwarehouse(params) {
	return request.globalRequest(`/api/PDA/PDA_PicksExwarehouse`, 'POST', params)
}

export function PDA_InventorymodificationSel(tasknumber, Traybarcode) {
	return request.globalRequest(
		`/api/PDA/PDA_InventorymodificationSel?tasknumber=${tasknumber}&Traybarcode=${Traybarcode}`, 'POST')
}

export function PDA_Inventorymodification(params) {
	return request.globalRequest(`/api/PDA/PDA_Inventorymodification`, 'POST', params)
}
